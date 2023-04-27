// Logs the message to the console if the environment is not production or if the logSwitch option is set to true.

interface LogOptions {
  logSwitch: boolean;
  method: string;
  message: string;
}

// The logger function takes an object with three properties:
function log({ logSwitch, method, message }: LogOptions, ...args: any[]): void {
  if (logSwitch || process.env.NODE_ENV === 'development') {
    console.log(`${method}: ${message}`, ...args);
  }
}

export default {
  log,
};