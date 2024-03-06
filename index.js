require("dotenv").config();
let express = require("express");
const port = 3000;
let app = express()
app.use(express.json());
app.use(express.static("./public/index.html"));
app.use(require("./routes/recipeRoutes"));
app.listen(port, () => {
  console.log('App is listening on:', port)
});