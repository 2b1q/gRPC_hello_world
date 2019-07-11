const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")

//Load the protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("./hero.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

const REMOTE_SERVER = "localhost:5000";

//Create gRPC client
const client = new proto.hero.HeroService(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
);

client.FindOne({ id: 1 }, (error, notes) => {
  if (!error) {
    console.log("successfully fetch data");
    console.log(notes);
  } else {
    console.error(error);
  }
});
