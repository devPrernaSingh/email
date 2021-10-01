
function getCookiesMap(cookiesString) {
    return cookiesString.split(";")
      .map(function(cookieString) {
          return cookieString.trim().split("=");
      })
      .reduce(function(acc, curr) {
          acc[curr[0]] = curr[1];
          return acc;
      }, {});
  }

  const isLogin = () => {
    var cookies = getCookiesMap(document.cookie);
    var cookieValue = cookies["auth_token"];

    if(cookieValue){
        return true;
    }else{
        return false;
    }
}
export default isLogin;