import Ajax from "./Ajax";
import SetUrl from "./SetUrl";

const checkLoginState = () => {
  return new Promise((resolve, reject) => {
    Ajax.get(SetUrl() + "/checkLoginState")
      .catch(e => {
        reject("error checking login state: ", e);
      })
      .then(res => {
        if (res.headers["authorized"] === "true") {
          resolve({
            isLoggedIn: true
          });
        } else {
          console.log("not authorized");
          resolve({
            isLoggedIn: false
          });
        }
      });
  });
};

export default checkLoginState;
