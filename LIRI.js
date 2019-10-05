// Initializing Databases and Keys
require("dotenv").config();
const Spotify = require("node-spotify-api");
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
// const omdbKey = "61fab2c7";   ------- make and environment for this variable

// Function declaration
const human = function(searchQuery) {
  // The following URL can be used to search the TV Maze API for a given show
  const URL = "http://api.tvmaze.com/search/people?q=" + searchQuery;
  console.log(URL);
  axios
    .get(URL)
    .then(function(response) {
      // handle success
      humanName = response.data[0].person.name;
      humanGender = response.data[0].person.gender;
      humanBirthday = response.data[0].person.birthday;
      humanNationality = response.data[0].person.country.name;
      humanURL = response.data[0].person.url;
      // console.log(response.data[0]);
      console.log("-------------------");
      console.log(`NAME: ${humanName}`);
      console.log(`NAME: ${humanGender}`);
      console.log(`BIRTHDAY: ${humanBirthday}`);
      console.log(`NATIONALITY: ${humanNationality}`);
      console.log(`URL: ${humanURL}`);
      fs.appendFile(
        "log.txt",
        `ACTOR/ACTRESS
* * * * *
NAME: ${humanName}
GENDER: ${humanGender}
BIRTHDAY: ${humanBirthday}
NATIONALITY: ${humanNationality}
URL: ${humanURL}
-------------------
\n`,
        err => {
          if (err) throw err;
          console.log("Added to log.");
        }
      );
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      console.log("---------------");
      console.log("QUERY COMPLETED");
      console.log("---------------");
    });
};
const TV = function(searchQuery) {
  // The following URL can be used to search the TV Maze API for a given show
  const URL = "http://api.tvmaze.com/singlesearch/shows?q=" + searchQuery;
  console.log(URL);
  axios
    .get(URL)
    .then(function(response) {
      // handle success
      showName = response.data.name;
      showGenre = response.data.genres;
      showRating = response.data.rating.average;
      showNetwork = response.data.network.name;
      showSummary = response.data.summary;

      // console.log(response.data);
      console.log("-------------------");
      console.log(`NAME: ${showName}`);
      console.log(`GENRE: ${showGenre}`);
      console.log(`AVERAGE RATING: ${showRating}`);
      console.log(`NETWORK NAME: ${showNetwork}`);
      console.log(`SUMMARY: ${showSummary}`);
      fs.appendFile(
        "log.txt",
        `TV SHOW
* * * * *
NAME: ${showName}
GENRE: ${showGenre}
AVERAGE RATING: ${showRating}
NETWORK NAME: ${showNetwork}
SUMMARY: ${showSummary}
-------------------
\n`,
        err => {
          if (err) throw err;
          console.log("Added to log.");
        }
      );
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      console.log("---------------");
      console.log("QUERY COMPLETED");
      console.log("---------------");
    });
};
inquirer
  .prompt([
    {
      type: "rawlist",
      name: "queryType",
      message: "Would you like to search a TV Show or an Actor/Actress?",
      choices: ["TV Show", "Actor/Actress"]
    },
    {
      type: "input",
      name: "searchQuery",
      message: "What are you looking for?",
      default: "Chuck"
    }
  ])
  .then(answers => {
    queryType = answers.queryType;
    searchQuery = answers.searchQuery;
    console.log(`${queryType}: ${searchQuery}`);
    if (queryType === "TV Show") {
      TV(searchQuery);
    } else {
      human(searchQuery);
    }
  });
