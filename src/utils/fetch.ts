import { queryStringify } from "./queryStringify";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

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
    if (options.data) {
      url = url + queryStringify(options.data as Record<string, unknown>);
    }
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post = (
    url: string,
    options: optionsType = {
      method: "",
      data: {},
    },
  ) => {
    console.log(url, options);
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put = (
    url: string,
    options: optionsType = {
      method: "",
      data: {},
    },
  ) => {
    console.log(url, options);
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete = (
    url: string,
    options: optionsType = {
      method: "",
      data: {},
    },
  ) => {
    console.log(url, options);
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: optionsType) => {
    if (!options.method) {
      options.method = METHODS.GET;
    }
    if (!options.timeout) {
      options.timeout = 5000;
    }

    const { method, data, timeout } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

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
        xhr.send(data as Document | XMLHttpRequestBodyInit | null | undefined);
      }
    });
  };
}
