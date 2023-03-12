import { MongoClient } from "mongodb";

let db;

async function connectToDb(cb) {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  //make new db 'react-blog-db'
  db = client.db("react-blog-DB");
  cb();
}

export { db, connectToDb };
