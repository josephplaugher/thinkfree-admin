import React from 'react'

class EB extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
      if(process.env.NODE_ENV === 'development') {
      console.log('rendering error: ', error, info);
      }
      // You can also log the error to an error reporting service
      //logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <p>Something went wrong in the {this.props.comp} component</p>;
      }
      return this.props.children;
    }
}

export default EB;
  
  