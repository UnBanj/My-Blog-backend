import express from "express";

let articlesInfo = [
  {
    name: "learn-react",
    upvotes: 0,
  },
  {
    name: "learn-javascript",
    upvotes: 0,
  },
  {
    name: "learn-node",
    upvotes: 0,
  },
];

const app = express();
app.use(express.json()); //ukoliko imamo nesto u jsonu parsiraj ga u req.body

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

//tell our server to listen
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
