import axios from "axios";

const get = url => {
  const request = axios({
    withCredentials: true,
    method: "get",
    url: url,
    responseType: "json"
  });
  request.catch(error => console.log("ajax error: " + error));
  return request;
};

const post = (url, formData) => {
  const request = axios({
    withCredentials: true,
    url: url,
    method: "post",
    data: formData,
    responseType: "json"
  });
  request.catch(error => console.log("ajax error: " + error));
  return request;
};

export default { get, post };
