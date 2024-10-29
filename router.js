const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
require("dayjs/locale/fr");
// on demande à dayjs de les utiliser
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("fr");
const capitalCities = require("./my_modules/capitalCities");

// on récupère l'année courante
const year = new Date().getFullYear();


router.get("/", (req, res) => {
  res.render("home");
});

router.get("/city/:cityName", (req, res) => {
  const citySelected = req.params.cityName;
  let cityInfo = capitalCities.find((city) => {
    return city.name.toUpperCase() === citySelected.toUpperCase();
  });
  if (cityInfo) {
    // je récupère l'heure et la date dans le fuseau horaire de la ville demandée
    let currentTime = dayjs().tz(cityInfo.tz).format("dddd D MMMM YYYY HH:mm ");
    res.render("city", {
      cityInfo: cityInfo,
      currentTime: currentTime,
    });
  } else {
    res.status(404);
    res.render("404");
  }
});

module.exports = router;
