/* eslint-disable @typescript-eslint/ban-types */
export class EventBus {
  //private readonly listeners: Record<string, Array<Function>> = {};

  private readonly listeners: Record<string, Array<Function>>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) {
      throw new Error(`Event does not exist: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      throw new Error(`Event does not exist: ${event}`);
    }
    this.listeners[event].forEach((listener: Function) => {
      listener(...args);
    });
  }
}
