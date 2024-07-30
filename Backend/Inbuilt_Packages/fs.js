const fs = require("fs");
// create a file
// fs.writeFile("./files/arman.txt", "this is arman", (err) => {
//   if (err) {
//     console.log("error");
//   } else {
//     console.log("creted");
//   }
// });

// read file

// fs.readFile("./files/arman.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

//append the file

// fs.appendFile("./files/arman.txt", " i am web developer", () => {
//   console.log("update successfully");
// });

//delete the file
fs.unlink("./files/arman.txt", (err) => {
  console.log("file deleted");
});
