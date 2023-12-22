import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRouter from "./Routes/user.route.js";
import movieRouter from "./Routes/user.route.js";
import producerRouter from "./Routes/user.route.js";
import actorRouter from "./Routes/user.route.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); // phone dial
// top-level await

await client.connect(); // call button
console.log("Mongo is connected ✌️😊");

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/users", userRouter);
app.use("/movies", movieRouter);
app.use("/actors", actorRouter);
app.use("/producers", producerRouter);

app.listen(PORT, () => console.log("server started on port : ", PORT));

export { client };