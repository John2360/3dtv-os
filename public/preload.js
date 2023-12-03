const { exec } = require("child_process");

// All of the Node.js APIs are available in the preload process.
window.addEventListener("DOMContentLoaded", () => {
console.log("preload.js");
  exec(`node sockert-server.js`);
});