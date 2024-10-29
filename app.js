const express = require("express");
const router = require("./router");
const capitalCities = require("./my_modules/capitalCities");

const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "ejs");
// on récupère l'année courante
const year = new Date().getFullYear();
// on envoie la variable currentYear à toutes les vues
app.locals.currentYear = year;
app.locals.capitalCities = capitalCities;

app.use(express.static("public"));
app.use(router);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
