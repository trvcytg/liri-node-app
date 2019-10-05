// Initializing Databases and Keys
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
// Hidden keys
const spotify = new Spotify(keys.spotify);
const seatgeekClientID = keys.seatgeekClientID;
const omdbKey = keys.omdbKey;

// Function declaration
const music = function(searchQuery) {
  spotify
    .search({ type: "track", query: searchQuery })
    .then(function(response) {
      // handle success
      fs.appendFile(
        "log.txt",
        `
  * * * * * * * * * * * * * * * * * * * * *
  Music Search: ${searchQuery}
  * * * * * * * * * * * * * * * * * * * * * `,
        err => {
          if (err) throw err;
          console.log("Added to log.");
        }
      );
      songArtist = response.tracks.items[0].artists[0].name;
      songName = response.tracks.items[0].name;
      songPreviewLink = response.tracks.items[0].preview_url;
      songAlbum = response.tracks.items[0].album.name;
      console.log(``);
      console.log(`
TITLE:        ${songName}
ARTIST:       ${songArtist}
ALBUM:        ${songAlbum}
SPOTIFY LINK: ${songPreviewLink}`);

      console.log(``);
      console.log(". . . . .");

      fs.appendFile(
        "log.txt",
        `
    TITLE:        ${songName}
    ARTIST:       ${songArtist}
    ALBUM:        ${songAlbum}
    SPOTIFY LINK: ${songPreviewLink}`,
        err => {
          if (err) throw err;
        }
      );
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      console.log("Added to log.");
      console.log("---------------");
      console.log("QUERY COMPLETED");
      console.log("---------------");
    });
  // });
};

const concerts = function(searchQuery) {
  const URL = `https://api.seatgeek.com/2/events?performers.slug=${searchQuery.replace(
    " ",
    "-"
  )}&client_id=${seatgeekClientID}`;
  axios
    .get(URL)
    .then(function(response) {
      // handle success
      fs.appendFile(
        "log.txt",
        `
* * * * * * * * * * * * * * * * * * * * *
Concert Search: ${searchQuery}
* * * * * * * * * * * * * * * * * * * * * `,
        err => {
          if (err) throw err;
        }
      );
      for (let index = 0; index < response.data.events.length; index++) {
        const element = response.data.events[index];

        venueName = element.venue.name;
        venueAddress = element.venue.address;
        venueLocation = element.venue.extended_address;
        eventDate = element.datetime_local;

        console.log(``);
        console.log(`        RESULT #${index + 1}`);
        console.log(``);
        console.log(`NAME OF VENUE: ${venueName}`);
        console.log(``);
        console.log(`VENUE ADDRESS: ${venueAddress}`);
        console.log(`               ${venueLocation}`);
        console.log(``);
        console.log(`EVENT DATE:    ${eventDate}`);
        console.log(``);
        console.log(". . . . .");
        fs.appendFile(
          "log.txt",
          `
    NAME OF VENUE: ${venueName}
    LOCATION OF VENUE: ${venueLocation}
    EVENT DATE: ${eventDate}
              \n`,
          err => {
            if (err) throw err;
          }
        );
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      console.log(`\n`);
      console.log("---------------");
      console.log("Added to log.");
      console.log("QUERY COMPLETED");
      console.log("---------------");
      console.log(`\n`);
    });
};

const movies = function(searchQuery) {
  const URL = `http://www.omdbapi.com/?t=${searchQuery}&apikey=${omdbKey}`;
  axios
    .get(URL)
    .then(function(response) {
      // handle success
      fs.appendFile(
        "log.txt",
        `
* * * * * * * * * * * * * * * * * * * * *
Movie Search: ${searchQuery}
* * * * * * * * * * * * * * * * * * * * * `,
        err => {
          if (err) throw err;
        }
      );
      movieTitle = response.data.Title;
      movieReleaseYear = response.data.Year;
      movieIMDBrating = response.data.imdbRating;
      movieRottenTomatoes = response.data.Ratings[2][2];
      movieCountry = response.data.Country;
      movieLanguage = response.data.Language;
      moviePlot = response.data.Plot;
      movieCast = response.data.Actors;

      console.log(``);
      console.log(`
MOVIE TITLE:     ${movieTitle} 
RELEASE YEAR:    ${movieReleaseYear} 
IMDB RATING:     ${movieIMDBrating} 
ROTTEN TOMATOES: ${movieRottenTomatoes} 
COUNTRY:         ${movieCountry} 
LANGUAGE:        ${movieLanguage} 
PLOT:            ${moviePlot} 
CAST:            ${movieCast}`);
      console.log(``);
      console.log(". . . . .");
      fs.appendFile(
        "log.txt",
        `
                 ${movieTitle} 
    RELEASE YEAR:    ${movieReleaseYear} 
    IMDB RATING:     ${movieIMDBrating} 
    ROTTEN TOMATOES: ${movieRottenTomatoes} 
    COUNTRY:         ${movieCountry} 
    LANGUAGE:        ${movieLanguage} 
    PLOT:            ${moviePlot} 
    CAST:            ${movieCast}`,
        err => {
          if (err) throw err;
        }
      );
      //   }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      console.log(`\n`);
      console.log("---------------");
      console.log("Added to log.");
      console.log("QUERY COMPLETED");
      console.log("---------------");
      console.log(`\n`);
    });
};
// Run scripts
inquirer
  .prompt([
    {
      type: "rawlist",
      name: "queryType",
      message: "What would you like to search??",
      choices: ["Concerts", "Music", "Movies", "Do What It Says (DWIS)"]
    },
    {
      type: "input",
      name: "searchQuery",
      message: "What would you like to search for?",
      default: "Nothing..."
    }
  ])
  .then(answers => {
    queryType = answers.queryType;
    searchQuery = answers.searchQuery;
    console.log(`${queryType}: ${searchQuery}`);
    if (queryType === "Concerts") {
      concerts(searchQuery);
    } else if (queryType === "Music") {
      music(searchQuery);
    } else if (queryType === "Movies") {
      movies(searchQuery);
    } else if (queryType === "Do What It Says (DWIS)") {
      fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        const dwis = data.split(",").slice(1);
        music(dwis);
      });
    }
  });
