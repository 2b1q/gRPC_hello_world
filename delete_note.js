const client = require("./client");
client.delete({ id: "1" }, (error, note) => {
  if (!error) {
    console.log("Note Has been successfully deleted");
    console.log(note);
  } else {
    console.error(error);
  }
});
