import { ObjectId } from "mongodb";
import { client } from "../index.js";

//✔️

export async function getAllMovies() {
  return await client.db("imdb").collection("movie").find({});
}

export async function CreateMovie(data) {
  return await client.db("imdb").collection("movie").insertOne(data);
}

export async function getMovieById(id) {
  return await client
    .db("imdb")
    .collection("movie")
    .findOne({ _id: ObjectId(id) });
}

export async function EditMovie(edit, id) {
  return await client
    .db("imdb")
    .collection("movie")
    .updateOne(
      { _id: ObjectId(id) },
      { $currentDate: { lastModified: { $type: "date" } } },
      { $set: {
            name: edit.name,
            actors: edit.actors,
            producer: edit.producer,
            yor: edit.yor,
            poster: edit.poster
      } }
    );
  // lastModified:"$$NOW"
}

export async function delMovieById(id) {
    return await client.db("imdb").collection("movie").deleteOne({_id: ObjectId(id)});
  }
