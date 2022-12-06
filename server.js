const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.json({ status: 200, data: [1, 2, 3, 4, 5, 5, 6] });
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
