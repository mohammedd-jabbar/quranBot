const express = require("express");
const PORT = 4040;

const app = express();
app.use(express.json());

app.post("*", async (req: any, res: any) => {
  res.send("Hello get");
});

app.get("*", async (req: any, res: any) => {
  res.send("Hello get");
});

app.listen(PORT, function (err: any) {
  if (err) console.log(err);
  console.log("Server listening on PORT:", PORT);
});
