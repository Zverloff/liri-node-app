require("dotenv").config();
var keys = require('./key.js')
var Spotify = require('node-spotify-api')
var request = require("request")
var fs = require("fs")
var moment = require("moment")





switch(process.argv[2]) {
    case "spotify-this-song":
    //console.log(process.argv[3])
    getSong(process.argv[3])
    break;

    case "movie-this":
    getMovie(process.argv[3])
    break;

    case "concert-this":
    getBand(process.argv[3])
    break;

    case "do-what-it-says":
    doIt()
    break;
}

//spotify request

function getSong(song){
    var spotify = new Spotify(keys.spotify);
    //console.log(song)
    if (!song) {
        song = "The Sign"
    }    
    spotify.search({ type: "track", query: song }, function(err, data) {
        if (!err) {
            var songData = data.tracks.items[0]
            console.log("Artist: " + songData.artists[0].name)
            console.log("Song: " + songData.name)
            console.log("Listen to a Preview: " + songData.preview_url)
            console.log("Album: " + songData.album.name)
        }


        else {
            return console.log("Error occurred: " + err);
        }
        
    })
}


//omdb

function getMovie(movie) {
    if (movie === "") {
        movie = "Mr Nothing"
    }
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy";

        

    request(queryURL, function(error, response, body) {
       
        
        if (!error) {
            var movieData = JSON.parse(body)
     
            console.log("Movie Title: " + movieData.Title)
            console.log("Release Date: " + movieData.Released)
            console.log("IMDB Rating: " + movieData.imdbRating)
            console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value)
            console.log("Country of Origin: " + movieData.Country)
            console.log("Language: " + movieData.Language)
            console.log("Plot Summary: " + movieData.Plot)
            console.log("Actors: " + movieData.Actors)
        }
        else {
            console.log("An error has occurred")
        }
    })    
}

function getBand(artist) {
    var queryURL2 = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

  

    request(queryURL2, function(error, response, body) {
        if (!artist) {
            artist = "Mastodon"
        }
        if (!error && response.statusCode === 200) {
            var bandData = JSON.parse(body)
            //console.log(bandData[0].venue.name)
            var venue = bandData[0].venue
            console.log("Venue: " + venue.name)
            console.log("Location: " + venue.city + " " + venue.region)
            console.log("Date of Event: " + bandData[0].datetime)
        }
    })
}

function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            console.log(error)
        }
        var dataSplit = data.split(",") 
        getSong(dataSplit[1])
    })
    
}