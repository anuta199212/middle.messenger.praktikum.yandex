function queryStringify(data: Record<string, unknown>) {
  let resStr = "";
  if (data && typeof data === "object") {
    resStr = "?";

    let prop;
    for (prop in data) {
      resStr += prop + "=" + data[prop] + "&";
    }

    resStr = resStr.slice(0, -1);
  }
  return resStr;
}

export { queryStringify };
