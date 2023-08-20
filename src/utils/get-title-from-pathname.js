export function getTitleFromPathname(pathname) {
  switch (pathname) {
    case "/":
      return "Home";
    case "/about":
      return "About";
    default:
      return "";
  }
}

export default getTitleFromPathname;
