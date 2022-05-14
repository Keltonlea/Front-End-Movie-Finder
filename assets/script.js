var clearButton = document.querySelector("#clear-button");
var userMovie = document.getElementById('movie-input');
var pastSearchButtons = document.querySelector("#past-search-buttons");
var modalContainer = document.getElementById('#myModal');
var movies = [];
var pURL = "http://img.omdbapi.com/?"
var pMovie = "i="
var poster = "&h=600&"
var pApi = "apikey=9279f439"
var trailerModal = document.querySelector('.trailer');
var closeTrailer = document.querySelector('.close-trailer');

//get movie, save to local storage, make buttons, otherwise show modal popup to enter movie title//
var formSubmitHandler = function () {
    var movie = userMovie.value.trim();
    if (movie) {
        callMovie(movie);
        movies.unshift({ movie });
        movie.value = "";
        pastSearch(movie);

    } else {
        $('#myModal').modal('show');
        $('ul li').remove();
        $('#moviePoster').remove();
        callMovie()

        // console.log("yay")
    }
    saveSearch();

}


var saveSearch = function () {
    localStorage.setItem("movies", JSON.stringify(movies));
    console.log("check");

};

var pastSearch = function (pastSearch) {

    console.log(pastSearch)

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-primary border p-2";
    pastSearchEl.setAttribute("data-movie", pastSearch)
    pastSearchEl.setAttribute("type", "submit", "text-center");

    pastSearchButtons.prepend(pastSearchEl);
}

var pastSearchHandler = function (event) {
    var movie = event.target.getAttribute("data-movie")
    if (movie) {
        callMovie(movie);
    }
}



//fetch
var baseURL = "http://www.omdbapi.com/?";
var api = "apikey=9279f439&"
var movie = "t="
// var movieTitle = "John Wick"
function callMovie(userInput) {
    fetch(baseURL + api + movie + userInput)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            // console.log(data.Actors)
            document.getElementById("list-group-item-A").innerHTML = "Movie Plot: " + JSON.stringify(data.Plot);
            document.getElementById("list-group-item-B").innerHTML = "Cast: " + JSON.stringify(data.Actors);
            document.getElementById("card-title").innerHTML = JSON.stringify(data.Title);
            document.getElementById("list-group-item-C").innerHTML = "Internet Movie Database Rating: " + JSON.stringify(data.Ratings[0]);
            document.getElementById("list-group-item-D").innerHTML = "Rotten Tomatoes Rating: " + JSON.stringify(data.Ratings[1]);
            document.getElementById("list-group-item-E").innerHTML = JSON.stringify(data.Ratings[2]);
            moviePoster(data.imdbID);
            imdbTrailer(IbaseURL + data.imdbID);
        });
}
async function moviePoster(imdb) {

    var response = await fetch(pURL + pMovie + imdb + poster + pApi)
    const imageBlob = await response.blob()
    var objectUrl = URL.createObjectURL(imageBlob);
    document.querySelector("#moviePoster").src = objectUrl;

}

var IbaseURL = 'https://imdb-api.com/en/API/Trailer/k_b1yraolg/';

function imdbTrailer(URL) {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.link)
        })
}



document.getElementById('search-button').addEventListener('click', function (event) {
    event.preventDefault();
    console.log('hello')
    var userMovieChoice = document.getElementById('movie-input').value;
    // console.log(userMovie);
    callMovie(userMovieChoice)
    formSubmitHandler();
    saveSearch();
})


clearButton.addEventListener("click", function () {
    localStorage.clear();
    document.querySelector(".past-search").innerHTML = ""
})

pastSearchButtons.addEventListener("click", pastSearchHandler);
trailerModal.addEventListener("click", function () {
    $('#myTrailerModal').modal('show');
})
closeTrailer.addEventListener("click", function () {
    $('#myTrailerModal').modal('hide')
})