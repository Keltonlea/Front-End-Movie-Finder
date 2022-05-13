//fetch
var baseURL = "http://www.omdbapi.com/?";
var api = "apikey=9279f439&"
var movie = "t="
// var movieTitle = "John Wick"
function callMovie(userInput) {
    fetch(baseURL + api + movie + userInput)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.Actors)
            document.getElementById("list-group-item-A").innerHTML = "Movie Plot: " + JSON.stringify(data.Plot);
            document.getElementById("list-group-item-B").innerHTML = "Cast: " +JSON.stringify(data.Actors);
            document.getElementById("card-title").innerHTML = JSON.stringify(data.Title);
            document.getElementById("list-group-item-C").innerHTML = "Internet Movie Database Rating: " + JSON.stringify(data.Ratings[0]);
            document.getElementById("list-group-item-D").innerHTML = "Rotten Tomatoes Rating: " + JSON.stringify(data.Ratings[1]);
            document.getElementById("list-group-item-E").innerHTML = JSON.stringify(data.Ratings[2]);
        });
}
document.getElementById('search-button').addEventListener('click', function (event) {
    event.preventDefault();
    console.log('hello')
    var userMovie = document.getElementById('movie-input').value;
    console.log(userMovie);
    callMovie(userMovie)
})