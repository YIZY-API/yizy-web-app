export function setPostLoginPath(path: string) {
  localStorage.setItem("postLoginPath", path);
}

export function getPostLoginPath() {
  const path = localStorage.getItem("postLoginPath");
  if (path != null) {
    return path;
  } else {
    return "/demo";
  }
}
