import express from "express";
import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json()); //ukoliko imamo nesto u jsonu parsiraj ga u req.body
//loading article info from MongoDb
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  //query -> load the article by its name
  const article = await db.collection("articles").findOne({ name });
  //send it back to the client if exist
  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

//upvotes
app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  await db.collection("articles").updateOne(
    { name },
    {
      $inc: {
        //increment the upvotes field by 1
        upvotes: 1,
      },
    }
  );
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    //if article exists
    res.send(`The ${name} article now has ${article.upvotes} upvotes`);
  } else {
    res.send(`That article doesn\'t exist`);
  }
});

//adding comments
app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  await db.collection("articles").updateOne(
    { name },
    {
      $push: { comments: { postedBy, text } },
    }
  );
  //load the updated article with new comments
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    //ako postoji,ubaci komentar i ko ga je napisao u niz
    res.send(article.comments);
  } else {
    res.send(`That article doesn\t exist`);
  }
});
//tell our server to listen(it wont start if its not connected to the db)
connectToDb(() => {
  console.log("Successfully connected to the database!");
  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
});
