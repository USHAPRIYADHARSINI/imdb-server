import { client } from '../index.js';

export async function addNewActor(data) {                //✔️
    return await client.db('imdb').collection('actor').insertOne(data);
}

export async function getAllActors() {                //✔️
    return await client.db('imdb').collection('actor').find({});
}

export async function getActorById(id) {
    return await client
      .db("imdb")
      .collection("movie")
      .findOne({ _id: ObjectId(id) });
  }
  
  export async function EditActor(edit, id) {
    return await client
      .db("imdb")
      .collection("movie")
      .updateOne(
        { _id: ObjectId(id) },
        { $currentDate: { lastModified: { $type: "date" } } },
        { $set: {
            name: edit.name,
            picture: edit.picture,
            dob: edit.dob,
            bio: edit.bio
        } }
      );
    // lastModified:"$$NOW"
  }