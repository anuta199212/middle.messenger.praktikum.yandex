import { EventBus } from './event-bus';

type metaType = {
  tagName: string;
  props: Object;
}

type BlockPropsType = {
  [key: string]: any;
  onClick?: (
    //setProps: SetPropsType,
    props: { [key: string]: any }
  ) => (e?: Event) => void;
  onBlur?: (e?: Event) => void;
};

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement = new HTMLElement;
  _meta: metaType = { tagName: "", props: {} };
  props: BlockPropsType;
  eventBus: EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", props = {}) {
    const eventBus: EventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() { }

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: BlockPropsType, newProps: BlockPropsType) {
    //    const response = this.componentDidUpdate(oldProps, newProps);
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate() {
    return true;
  }

  setProps: (nextProps: BlockPropsType) => void = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    //this._element.innerHTML = block;
    //this._element.append(block);
  }

  render() { }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: BlockPropsType) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target: BlockPropsType, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: BlockPropsType, prop: string, value) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
