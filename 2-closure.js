const eventEmitter = () => {
  const events = new Map();

  return {
    on: (event, handler) => {
      const handlers = events.get(event) ?? [];
      handlers.push(handler);
      events.set(event, handlers);
    },
    emit: (event, ...data) => {
      const handlers = events.get(event) ?? [];
      handlers.forEach((handler) => handler(...data));
    },
  };
};

const ee = eventEmitter();

ee.on("log1", (message) => console.log("event #11", message));
ee.on("log1", (message) => console.log("event #12", message));
ee.emit("log1", "1-simle-.js");

ee.on("log2", (message) => console.log("event #21", message));
ee.on("log2", (message) => console.log("event #22", message));
ee.emit("log2", "1-simle-.js");
