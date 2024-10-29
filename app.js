const express = require("express");
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
require("dayjs/locale/fr");
// on demande à dayjs de les utiliser
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("fr");
const path = require("path");
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

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/city/:cityName", (req, res) => {
  const citySelected = req.params.cityName;
  let cityInfo = capitalCities.find((city) => {
    return city.name.toUpperCase() === citySelected.toUpperCase();
  });
  // je récupère l'heure et la date dans le fuseau horaire de la ville demandée
  let currentTime = dayjs().tz(cityInfo.tz).format("dddd D MMMM YYYY HH:mm ");
  res.render("city", {
    cityInfo: cityInfo,
    currentTime: currentTime,
  });
});

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
