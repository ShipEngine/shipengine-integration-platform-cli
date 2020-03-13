import { shipengine } from "./shipengine-cli";

export { Options } from "./settings";
export { shipengine };

// Export `shipengine` as the default export
// tslint:disable: no-default-export
export default shipengine;

// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
