import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import SetUrl from "Util/SetUrl";
import Ajax from "Util/Ajax";

import "css/main.css";
import "css/form.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      blogList: [],
      activePost: {},
      userNotify: "",
      formData: { content: "", title: "", description: "", postid: "" }
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.selectPost = this.selectPost.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescChange = this.onDescChange.bind(this);
    this.publishPost = this.publishPost.bind(this);
    this.unpublishPost = this.unpublishPost.bind(this);
  }

  componentDidMount = () => {
    Ajax.get(SetUrl() + "/getBlogList").then(resp => {
      if (typeof resp.data.blogList !== undefined) {
        this.setState({ blogList: resp.data.blogList });
      } else {
        this.setState({ blogList: [] });
      }
    });
  };

  selectPost = id => {
    Ajax.get(SetUrl() + "/selectPost/" + id).then(resp => {
      let post = resp.data.activePost;
      this.setState({
        activePost: resp.data.activePost,
        formData: {
          postid: post.postid,
          content: post.body,
          title: post.title,
          description: post.description
        }
      });
    });
  };

  handleEditorChange(content) {
    this.setState({ content: content });
  }

  onTitleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    var edits = Object.assign({}, this.state.formData);
    edits["title"] = value;
    this.setState({
      formData: edits
    });
  };

  onDescChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    var edits = Object.assign({}, this.state.formData);
    edits["description"] = value;

    this.setState({
      formData: edits
    });
  };

  saveEdits = e => {
    e.preventDefault();
    const data = this.state.formData;
    data.body = this.state.content;
    Ajax.post(SetUrl() + "/saveEdits", data).then(resp => {
      this.setState({ userNotify: resp.data.status });
      setTimeout(() => {
        this.setState({ userNotify: "" });
      }, 8000);
    });
  };

  publishPost = () => {
    Ajax.get(SetUrl() + "/publishPost/" + this.state.activePost.postid).then(
      resp => {
        this.setState({ userNotify: resp.data.status });
      }
    );
  };

  unpublishPost = () => {
    Ajax.get(SetUrl() + "/unpublishPost/" + this.state.activePost.postid).then(
      resp => {
        this.setState({ userNotify: resp.data.status });
      }
    );
  };

  render() {
    const posts = this.state.blogList.map(row => (
      <div
        key={row.postid + "div"}
        className="blog-row"
        onClick={this.selectPost.bind(this, row.postid)}
      >
        <p key={row.title} className="title-row">
          {row.title}
        </p>
        <p key={row.description} className="desc-row">
          {row.description}
        </p>
      </div>
    ));

    return (
      <div>
        <div id="edit-pane">
          <form onSubmit={this.saveEdits}>
            <label>Post ID: </label>
            <input
              id="active-id"
              className="active"
              type="text"
              value={this.state.formData.postid}
            />
            <label>Published: </label>
            <input
              id="active-published"
              className="active"
              type="text"
              value={this.state.formData.published}
            />
            <label>Title: </label>
            <input
              id="active-title"
              className="active"
              type="text"
              value={this.state.formData.title}
              onChange={this.onTitleChange}
            />
            <label>Description: </label>
            <input
              id="active-desc"
              className="active"
              type="text"
              value={this.state.formData.description}
              onChange={this.onDescChange}
            />
            <Editor
              apiKey="i3m0p9lupcg57foxtr3ducahdloo7b6vb23ptw0zaz7klwcn"
              value={this.state.formData.content}
              onEditorChange={this.handleEditorChange}
            />
            <p>{this.state.userNotify}</p>
            <input type="submit" value="Save Changes" />
          </form>
          <br />
          <br />
          {this.state.formData.published ? (
            <input
              type="button"
              value="Unpublish"
              onClick={this.unpublishPost}
            />
          ) : (
            <input type="button" value="Publish" onClick={this.publishPost} />
          )}
          <input type="button" value="Sign Out" onClick={this.props.logout} />
        </div>
        <div id="blog-list">{posts}</div>
      </div>
    );
  }
}

export default Home;
