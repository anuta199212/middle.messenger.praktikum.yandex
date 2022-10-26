import { JSDOM } from "jsdom";
import { compile } from "handlebars";
import { readFileSync } from "fs";

const { window } = new JSDOM('<div id="app"></div>', {
  url: "http://localhost:3000",
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions[".hbs"] = function (module, filename) {
  const contents = readFileSync(filename, "utf-8");

  module.exports = compile(contents);
};
require.extensions[".scss"] = function () {
  module.exports = () => ({});
};
