let Handlebars = require("handlebars");

Handlebars.registerPartial("meta", require("./src/partials/meta/meta.hbs"));

Handlebars.registerPartial(
  "button",
  require("./src/partials/button/button.hbs")
);

Handlebars.registerPartial(
  "inputField",
  require("./src/partials/inputField/inputField.hbs")
);

Handlebars.registerPartial(
  "inputFieldDisabled",
  require("./src/partials/inputField/inputFieldDisabled.hbs")
);

module.exports = {
  ...Handlebars,
  layouts: "src/layouts",
  data: "src/data",
};
