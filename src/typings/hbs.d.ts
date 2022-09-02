declare module "*.hbs" {
  import { TemplateDelegate } from "handlebars";

  declare const template: TemplateDelegate;

  export default template;
}

/*declare module "*.hbs" {
    import { TemplateDelegate } from 'handlebars'

    declare const temlate: TemplateDelegate;

    export default TemplateDelegate;
}*/
