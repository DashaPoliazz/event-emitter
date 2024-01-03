import { EventEmitter } from "node:events";

const ee = new EventEmitter();

ee.on("1", console.log);
ee.emit("1", "foo");
