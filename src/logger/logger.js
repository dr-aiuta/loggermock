"use strict";
// Logs the message to the console if the environment is not production or if the logSwitch option is set to true.
Object.defineProperty(exports, "__esModule", { value: true });
// The logger function takes an object with three properties:
function log({ logSwitch, method, message }, ...args) {
    if (logSwitch || process.env.NODE_ENV === 'development') {
        console.log(`${method}: ${message}`, ...args);
    }
}
exports.default = {
    log,
};
