import { client } from '../index.js';

export async function addNewProducer(data) {                //✔️
    return await client.db('imdb').collection('producer').insertOne(data);
}

export async function getAllProducer() {                //✔️
    return await client.db('imdb').collection('producer').find({});
}

export async function getProducerById(id) {
    return await client
      .db("imdb")
      .collection("movie")
      .findOne({ _id: ObjectId(id) });
  }
  
  export async function EditProducer(edit, id) {
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