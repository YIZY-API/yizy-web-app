export function setPostLoginPath(path: string) {
  localStorage.setItem("postLoginPath", path);
}

export function getPostLoginPath() {
  const path = localStorage.getItem("postLoginPath");
  if (path != null && path !== "") {
    return path;
  } else {
    return "/demo";
  }
}

export function setClientSideLoginState() {
  localStorage.setItem("isLoggedIn", "true");
}

export function setClientSideLogoutState() {
  localStorage.setItem("isLoggedIn", "false");
}

export function getIsLoggedIn() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === null && isLoggedIn !== "") return false;
  return isLoggedIn === "true";
}
