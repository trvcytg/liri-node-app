# liri-node-app

"LIRI is like iPhone's SIRI. However, [...]LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data."

Provides a user interface to direct a search for concerts of a certain artist, information on movies, information on songs, or a special bonus action.

I use a log file to log results, a key file to pull sensitive keys from my .env file for use in the code.

## How To Run:

    - clone this repository to your local machine
    - Get your own keys for spotify, seatgeek, omdb apis
    - run "npm i"
    - place them into your .env file located at the top level of the project directory
    - run "node LIRI.js"
    - follow prompts

## Video of Functioning App:

![LIRI Homework](working.mov)

## Sole developer: trvcytg

## NPM Resources Used:

    - dotenv
    - node-spotify-api
    - axios
    - inquirer
    - fs
