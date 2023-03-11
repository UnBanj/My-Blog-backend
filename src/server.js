import express from "express";

let articlesInfo = [
  {
    name: "learn-react",
    upvotes: 0,
    comments: [],
  },
  {
    name: "learn-javascript",
    upvotes: 0,
    comments: [],
  },
  {
    name: "learn-node",
    upvotes: 0,
    comments: [],
  },
];

const app = express();
app.use(express.json()); //ukoliko imamo nesto u jsonu parsiraj ga u req.body

//upvotes
app.put("/api/articles/:name/upvote", (req, res) => {
  const { name } = req.params;
  const article = articlesInfo.find((a) => a.name === name);
  if (article) {
    //if article exists
    article.upvotes += 1;
    res.send(`The ${name} article now has ${article.upvotes} upvotes`);
  } else {
    res.send(`That article doesn\'t exist`);
  }
});
//adding comments to articles
app.post("/api/articles/:name/comments", (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  const article = articlesInfo.find((a) => a.name === name);

  if (article) {
    //ako postoji,ubaci komentar i ko ga je napisao u niz
    article.comments.push({ postedBy, text });
    res.send(article.comments);
  } else {
    res.send(`That article doesn\t exist`);
  }
});

//tell our server to listen
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
