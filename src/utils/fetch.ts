const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

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

interface optionsType {
  method: string;
  data:
    | Record<string, unknown>
    | Document
    | XMLHttpRequestBodyInit
    | null
    | undefined;
  timeout?: number;
  headers?: Record<string, string>;
}

export class HTTPTransport {
  get = (
    url: string,
    options: optionsType = {
      method: "",
      data: {},
    },
  ) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  post = (
    url: string,
    options: optionsType = {
      method: "",
      data: {},
    },
  ) => {
    console.log(url, options);
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  put = (
    url: string,
    options: optionsType = {
      method: "",
      data: {},
    },
  ) => {
    console.log(url, options);
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  delete = (
    url: string,
    options: optionsType = {
      method: "",
      data: {},
    },
  ) => {
    console.log(url, options);
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = (url: string, options: optionsType, timeout = 5000) => {
    if (!options.method) {
      options.method = METHODS.GET;
    }

    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === "GET") {
        if (options.data) {
          url = url + queryStringify(options.data as Record<string, unknown>);
        }
      }
      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      if (options.headers) {
        for (const [key, value] of Object.entries(options.headers)) {
          xhr.setRequestHeader(key, value);
        }
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = function () {
        reject(new Error("Timeout"));
      };

      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        //console.log(data, queryStringify(data));
        xhr.send(data as Document | XMLHttpRequestBodyInit | null | undefined);
      }
    });
  };
}
