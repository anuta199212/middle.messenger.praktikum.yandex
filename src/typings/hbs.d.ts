declare module "*.hbs" {
    import { TemplateDelegate } from 'handlebars'

    declare const temlate: TemplateDelegate;

    export default TemplateDelegate;
}
