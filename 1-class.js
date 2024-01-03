class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, cb) {
    const handlers = this.events.get(eventName) ?? [];
    this.events.set(eventName, [...handlers, cb]);
  }

  emit(eventName, ...data) {
    const handlers = this.events.get(eventName);
    if (!handlers) return;

    handlers.forEach((subscriber) => subscriber(...data));
  }
}

const ee = new EventEmitter();

ee.on("log1", (message) => console.log("event #1", message));
ee.on("log1", (message) => console.log("event #2", message));
ee.emit("log1", "1-simle-.js");
