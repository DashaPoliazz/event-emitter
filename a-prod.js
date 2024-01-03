class EventEmitter {
  constructor() {
    // <eventName, Set<event>
    // <string, Set<fn>>
    this.handlers = new Map();
    // <event, wrapper>
    // <fn, fn>
    this.wrappers = new Map();
  }

  on(eventName, event) {
    const events = this.handlers.get(eventName);

    if (events) events.add(event);
    else this.handlers.set(eventName, new Set([event]));
  }

  emit(eventName, ...args) {
    const events = this.handlers.get(eventName);
    if (!events) return;
    for (const event of events) {
      event(...args);
    }
  }

  once(eventName, event) {
    const wrapper = (...args) => {
      this.remove(eventName, wrapper);
      event(...args);
    };

    this.wrappers.set(event, wrapper);
    this.on(eventName, wrapper);
  }

  remove(eventName, event) {
    const events = this.handlers.get(eventName);
    if (!events) return;

    if (events.has(event)) {
      events.delete(event);
      return;
    }

    const wrapper = this.wrappers.get(event);
    if (wrapper) {
      events.delete(wrapper);
      if (events.size === 0) this.handlers.delete(eventName);
    }
  }

  clear(eventName) {
    if (eventName) this.handlers.delete(eventName);
    else this.handlers.clear();
  }

  count(name) {
    const events = this.handlers.get(name);
    return events ? events.size : 0;
  }

  listeners(eventName) {
    const events = this.handlers.get(eventName);
    return new Set(events);
  }

  names() {
    return [...this.handlers.keys()];
  }
}

// Usage

const ee = new EventEmitter();

// on and emit

ee.on("e1", (data) => {
  console.dir(data);
});

ee.emit("e1", { msg: "e1 ok" });

// once

ee.once("e2", (data) => {
  console.dir(data);
});

ee.emit("e2", { msg: "e2 ok" });
ee.emit("e2", { msg: "e2 not ok" });

// remove

const f3 = (data) => {
  console.dir(data);
};

ee.on("e3", f3);
ee.remove("e3", f3);
ee.emit("e3", { msg: "e3 not ok" });

// count

ee.on("e4", () => {});
ee.on("e4", () => {});
console.log("e4 count", ee.count("e4"));

// clear

ee.clear("e4");
ee.emit("e4", { msg: "e4 not ok" });
ee.emit("e1", { msg: "e1 ok" });

ee.clear();
ee.emit("e1", { msg: "e1 not ok" });

// listeners and names

ee.on("e5", () => {});
ee.on("e5", () => {});
ee.on("e6", () => {});
ee.on("e7", () => {});

console.log("listeners", ee.listeners("e5"));
console.log("names", ee.names());
