var clearButton = document.querySelector("#clear-button");
var userMovie = document.getElementById('movie-input');
var pastSearchButtons = document.querySelector("#past-search-buttons");
var modalContainer = document.getElementById('#myModal');
var trailerModal = document.querySelector('.trailer');
var closeTrailer = document.querySelector('.close-trailer');
var movies = [];
var pURL = "https://img.omdbapi.com/?"
var pMovie = "i="
var poster = "&h=600&"
var pApi = "apikey=9279f439"
var trailerModal = document.querySelector('.trailer');
var closeTrailer = document.querySelector('.close-trailer');
let searchHistory = JSON.parse(localStorage.getItem("movies")) || [];
var iFrame = document.getElementById("myFrame");











//get movie, save to local storage, make buttons, otherwise show modal popup to enter movie title//
var formSubmitHandler = function () {
    var movie = userMovie.value.trim();

    if (movie) {
        callMovie(movie);
        movies.unshift({ movie });
        movie.value = "";

       
    } else {
        $('#myModal').modal('show');
        $('ul li').remove();
        $('#moviePoster').remove();
        } 
    saveSearch();
    pastSearch(movie);
}

//Function for saving search in local storage//
var saveSearch = function () {
    
    localStorage.setItem("movies", JSON.stringify(movies));
    console.log("save search")
};



//generate movie search buttons//
var pastSearch = function (pastSearch) {
    for (let i=0; i<searchHistory.length; i++) {

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-primary border p-2";
    pastSearchEl.setAttribute("data-movie", pastSearch)
    pastSearchEl.setAttribute("type", "submit", "text-center");
    pastSearchButtons.prepend(pastSearchEl);
    }}








//fetch

function callMovie(userInput) {
var baseURL = "https://www.omdbapi.com/?";
var api = "apikey=9279f439&"
var movie = "t="
    fetch(baseURL + api + movie + userInput)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            // console.log(data.Actors)
            document.getElementById("list-group-item-A").innerHTML = "Movie Plot: " + JSON.stringify(data.Plot);
            document.getElementById("list-group-item-B").innerHTML = "Cast: " + JSON.stringify(data.Actors);
            document.getElementById("card-title").innerHTML = JSON.stringify(data.Title);
            document.getElementById("list-group-item-C").innerHTML = "Internet Movie Database Rating: " + JSON.stringify(data.Ratings[0]).split('"')[7];
            document.getElementById("list-group-item-D").innerHTML = "Rotten Tomatoes Rating: " + JSON.stringify(data.Ratings[1]).split('"')[7];
            document.getElementById("list-group-item-E").innerHTML = "MetaCritic Rating: " + JSON.stringify(data.Ratings[2]).split('"')[7];
            moviePoster(data.imdbID);
            console.log(IbaseURL + data.imdbID);
            imdbTrailer(data.imdbID)
            imdbTrailer(IbaseURL + data.imdbID);

        });
}

//Movie Poster Function//
async function moviePoster(imdb) {

    var response = await fetch(pURL + pMovie + imdb + poster + pApi)
    const imageBlob = await response.blob()
    var objectUrl = URL.createObjectURL(imageBlob);
    document.querySelector("#moviePoster").src = objectUrl;

}


//Movie Trailer Function//
var IbaseURL = 'https://imdb-api.com/en/API/Trailer/k_32g8rj3r/';

function imdbTrailer(id) {
    var imdbURL = IbaseURL + id
    fetch(imdbURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.linkEmbed)
            console.log(document.getElementById("myFrame").src)
            iFrame.setAttribute('src', data.linkEmbed)
        })
}




var pastSearchHandler = function (event) {
    var movie = event.target.getAttribute("data-movie")
    if (movie) {
        callMovie(movie);
    }
}


//save movies to watch to local storage // 

$(".saveBtn").on("click", function (){

  
    let movieList = $(this).data("film");
    let value = $(this).siblings("textarea").val();
    
  
   

    console.log(movieList);
    console.log(value);
    localStorage.setItem(movieList, value);

});
let textContent = $(".movie-list-form textarea");

$(textContent).each(function(){


  
    var film = $(this).data("film");
    
    var description = localStorage.getItem(film);
    $(this).val(description);
  

})
//EVENT LISTENERS//

document.getElementById('search-button').addEventListener('click', function (event) {
    event.preventDefault();
   
    var userMovieChoice = document.getElementById('movie-input').value;
   
    // console.log(userMovie);
    callMovie(userMovieChoice)
    formSubmitHandler();

})

clearButton.addEventListener("click", function () {
    localStorage.clear();
    document.querySelector(".past-search").innerHTML = ""
    $("#moviePoster").remove()
    $('ul li').remove();
    $("#card-title").remove();
    location.reload()

})


pastSearchButtons.addEventListener("click", pastSearchHandler);

trailerModal.addEventListener("click", function () {
    $('#myTrailerModal').modal('show');
})


$(".close-trailer").click(function(){
    $('#myTrailerModal').modal('hide')
});
