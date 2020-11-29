const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { context } = require("./context");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect("mongodb://localhost/libraryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to db!"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Server ready at ${subscriptionsUrl}`);
});
