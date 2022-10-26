export function debounce(f: (...args: any[]) => void, delay: number) {
  return function (this: any, ...args: any[]) {
    const previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && this.lastCall - previousCall <= delay) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(args), delay);
  };
}
