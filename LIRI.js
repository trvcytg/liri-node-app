// Initializing Databases and Keys
// require("dotenv").config();
const Spotify = require("node-spotify-api");
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const seatgeekSecret =
  "10859d71f403a90a04ace48fe187e9941b196a6e6838a67078de01f7d9cd058e"; //------- make and environment for this variable
const seatgeekClientID = "MTg3NTM3OTd8MTU3MDI0MDgxMC4wNQ"; //------- make and environment for this variable
const omdbKey = "61fab2c7"; //------- make and environment for this variable

// Function declaration
const lyricSearch = function(searchQuery) {};

const music = function(searchQuery) {
  const URL = `http://www.omdbapi.com/?t=${searchQuery}&apikey=${omdbKey}`;
  console.log(URL);
  axios
    .get(URL)
    .then(function(response) {
      // handle success
      console.log(response.data);
      console.log("-------------------");
      console.log(response.data.Title);
      console.log("*******************");
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
      movieTitle = response.data.Title;
      movieReleaseYear = response.data.Year;
      movieIMDBrating = response.data.imdbRating;
      movieRottenTomatoes = response.data.Ratings[2][2];

      console.log(``);
      console.log(`
                   ${movieTitle} 
  \n 
  RELEASE YEAR:    ${movieReleaseYear} 
  \n 
  IMDB RATING:     ${movieIMDBrating} 
  \n 
  ROTTEN TOMATOES: ${movieRottenTomatoes} 
  \n
  COUNTRY:         ${movieCountry} 
  \n 
  LANGUAGE:        ${movieLanguage} 
  \n 
  PLOT:            ${moviePlot} 
  \n 
  CAST:            ${movieCast}`);
      console.log(``);
      console.log(". . . . .");
      fs.appendFile(
        "log.txt",
        `
                   ${movieTitle} 
  \n 
      RELEASE YEAR:    ${movieReleaseYear} 
  \n 
      IMDB RATING:     ${movieIMDBrating} 
  \n 
      ROTTEN TOMATOES: ${movieRottenTomatoes} 
  \n
      COUNTRY:         ${movieCountry} 
  \n 
      LANGUAGE:        ${movieLanguage} 
  \n 
      PLOT:            ${moviePlot} 
  \n 
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
      console.log("Added to log.");
      console.log("---------------");
      console.log("QUERY COMPLETED");
      console.log("---------------");
    });
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
          //   console.log("Added to log.");
        }
      );
      for (let index = 0; index < response.data.events.length; index++) {
        const element = response.data.events[index];

        venueName = element.venue.name;
        venueAddress = element.venue.address;
        venueLocation = element.venue.extended_address;
        eventDate = element.datetime_local;

        // console.log(response.data);
        // console.log("-------------------");
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
      //   for (let index = 0; index < response.data.length; index++) {
      //     const element = response.data[index];
      //   * Title of the movie.
      movieTitle = response.data.Title;
      //   * Year the movie came out.
      movieReleaseYear = response.data.Year;
      //   * IMDB Rating of the movie.
      movieIMDBrating = response.data.imdbRating;
      //   * Rotten Tomatoes Rating of the movie.
      movieRottenTomatoes = response.data.Ratings[2][2];
      //   * Country where the movie was produced.
      movieCountry = response.data.Country;
      //   * Language of the movie.
      movieLanguage = response.data.Language;
      //   * Plot of the movie.
      moviePlot = response.data.Plot;
      //   * Actors in the movie.
      movieCast = response.data.Actors;

      // console.log(response.data);
      // console.log("-------------------");
      console.log(``);
      console.log(`
MOVIE TITLE:     ${movieTitle} 
\n 
RELEASE YEAR:    ${movieReleaseYear} 
\n 
IMDB RATING:     ${movieIMDBrating} 
\n 
ROTTEN TOMATOES: ${movieRottenTomatoes} 
\n
COUNTRY:         ${movieCountry} 
\n 
LANGUAGE:        ${movieLanguage} 
\n 
PLOT:            ${moviePlot} 
\n 
CAST:            ${movieCast}`);
      console.log(``);
      console.log(". . . . .");
      fs.appendFile(
        "log.txt",
        `
                 ${movieTitle} 
\n 
    RELEASE YEAR:    ${movieReleaseYear} 
\n 
    IMDB RATING:     ${movieIMDBrating} 
\n 
    ROTTEN TOMATOES: ${movieRottenTomatoes} 
\n
    COUNTRY:         ${movieCountry} 
\n 
    LANGUAGE:        ${movieLanguage} 
\n 
    PLOT:            ${moviePlot} 
\n 
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
    } else if (queryType === "Wo What It Says (DWIS)") {
      lyricSearch(searchQuery);
    }
  });
