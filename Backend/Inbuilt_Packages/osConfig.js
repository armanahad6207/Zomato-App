const os = require("os");
console.log("free memory mb", os.freemem() / 1024 / 1024);
console.log("totla memory gb", os.totalmem() / 1024 / 1024 / 1024);
console.log("user", os.userInfo());
console.log("plateform", os.platform());
console.log("version", os.version());
console.log("processor", `${os.cpus().length} core`);
