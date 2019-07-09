const grpc = require("grpc");
const notesProto = grpc.load("notes.proto");
const uuidv1 = require("uuid/v1");

// response payload
const notes = [
  { id: "1", title: "Note 1", content: "Content 1" },
  { id: "2", title: "Note 2", content: "Content 2" }
];

const server = new grpc.Server();

// add NoteService to gRPC Service handler
server.addService(notesProto.NoteService.service, {
  // list method handler
  list: (call, callback) => {
    // call -> client request
    // callback(err, data)
    callback(null, notes);
  },
  // insert Note method
  insert: (call, callback) => {
    let note = call.request;
    note.id = uuidv1();
    notes.push(note);
    callback(null, notes);
  },
  // delete note from notes
  delete: (call, callback) => {
    console.log("call.request.id", call.request.id);
    let note = notes.filter(
      ({ id }, index) => id == call.request.id && notes.splice(index, 1)
    );
    console.log(note);
    if (note.length > 0) {
      callback(null, ...note);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found"
      });
    }
  }
});

server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:50051");
server.start();
