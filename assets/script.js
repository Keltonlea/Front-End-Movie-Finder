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
var iFrame = document.getElementById("myFrame");
var commentContainer = document.getElementById("allComments");
var searchModalBtn = document.getElementById("pleaseClose");
var closeTrailer = document.querySelector(".closeTrailer")














//get movie, save to local storage, make buttons, otherwise show modal popup to enter movie title//
var formSubmitHandler = function () {
    var movie = userMovie.value.trim();

    if (movie) {
        // callMovie(movie);
        movies.unshift({ movie });
        movie.value = "";
        pastSearch(movie);

    } else {
        $('#myModal').modal('show');
        $('ul li').remove();
        $('#moviePoster').remove();
    }
    saveSearch();
}



//Function for saving search in local storage//
var saveSearch = function () {

    localStorage.setItem("movies", JSON.stringify(movies));
};




//generate movie search buttons//
var pastSearch = function (pastSearch) {
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-primary border p-2";
    pastSearchEl.setAttribute("data-movie", pastSearch)
    pastSearchEl.setAttribute("type", "submit");
    pastSearchButtons.prepend(pastSearchEl);

    localStorage.setItem("search", JSON.stringify(pastSearch))
    // console.log(pastSearch)


}





var pastSearchHandler = function (event) {
    var movie = event.target.getAttribute("data-movie")
    if (movie) {
        callMovie(movie)
    }
}






//fetch

function callMovie(userInput) {
    var baseURL = "https://www.omdbapi.com/?";
    var api = "apikey=9279f439&"
    var movie = "t="
    var movieRatings = document.getElementById("sourceRatings");

    fetch(baseURL + api + movie + userInput)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            // console.log(data.Actors)
            document.getElementById("list-group-item-A").innerHTML = "Movie Plot: " + JSON.stringify(data.Plot);
            document.getElementById("list-group-item-B").innerHTML = "Cast: " + JSON.stringify(data.Actors);
            document.getElementById("card-title").innerHTML = JSON.stringify(data.Title);
            var ratings = data.Ratings
            for (let i = 0; i < ratings.length; i++) {
                // console.log(ratings[i]);
                var liElement = document.createElement("li");
                liElement.setAttribute("class", 'ratings');
                var liInnerDiv = document.createElement("div");
                liInnerDiv.setAttribute("class", 'liDiv');
                var liSpanSource = document.createElement("span");
                liSpanSource.setAttribute("class", 'span');
                var liSpanValue = document.createElement("span");
                liSpanValue.setAttribute("class", 'span');
                liSpanSource.innerHTML = ratings[i].Source + ": ";
                liSpanValue.innerHTML = ratings[i].Value;

                liElement.append(liSpanSource, liSpanValue);
                liInnerDiv.appendChild(liElement);
                movieRatings.appendChild(liInnerDiv);
            }
            moviePoster(data.imdbID, data.Poster);
            // console.log(IbaseURL + data.imdbID);
            imdbTrailer(data.imdbID)
            imdbTrailer(IbaseURL + data.imdbID);

        });
}

//Movie Poster Function//
async function moviePoster(imdb, thumbnailURL) {

    var response = await fetch(pURL + pMovie + imdb + poster + pApi)
    const imageBlob = await response.blob()
    var objectUrl = URL.createObjectURL(imageBlob);
    document.querySelector("#moviePoster").src = objectUrl;
    if (response.status === 404) {

        document.querySelector("#moviePoster").src = thumbnailURL;
    } else {

        document.querySelector("#moviePoster").src = objectUrl;
    }
    // console.log(response);
    // console.log(response.status);
}




//Movie Trailer Function//
var IbaseURL = 'https://imdb-api.com/en/API/Trailer/k_32g8rj3r/';

function imdbTrailer(id) {
    var imdbURL = IbaseURL + id
    fetch(imdbURL)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            // console.log(data.linkEmbed)
            // console.log(document.getElementById("myFrame").src)
            iFrame.setAttribute('src', data.linkEmbed)
        })
}





//save movies to watch to local storage // 
$(".saveBtn").on("click", function () {
    let movieList = $(this).data("film");
    let value = $(this).siblings("textarea").val();
    // console.log(movieList);
    // console.log(value);
    localStorage.setItem(movieList, value);
});
let textContent = $(".movie-list-form textarea");
$(textContent).each(function () {
    var film = $(this).data("film");
    var description = localStorage.getItem(film);
    $(this).val(description);
})

$(".clearSavedBtn").on("click", function () {

    let movieList = $(this).data("film");
    let value = $(this).siblings("textarea").val();

    localStorage.removeItem(movieList);
    localStorage.removeItem(value);
})

function addComment(ev) {
    let commentText;
    var textBox = document.createElement('div');
    textBox.className = "commentText";
    var replyButton = document.createElement('button');
    replyButton.className = 'reply'
    replyButton.innerHTML = "Reply";
    var likeButton = document.createElement("button");
    likeButton.innterHTML = "Like";
    likeButton.className = 'likecomment';
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "deleteComment";
    if (hasClass(ev.target.parentElement, 'container')) {
        const wrapDiv = document.createElement('div');
        wrapDiv.className = 'wrapper';
        wrapDiv.style.marginLeft = 0;
        commentText = document.getElementById('newComment').value;
        document.getElementById('newComment').value = '';
        textBox.innerHTML = commentText;
        wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
        commentContainer.appendChild(wrapDiv);
    } else {
        wrapDiv = ev.target.parentElement;
        commentText = ev.target.parentElement.firstElementChild.value;
        textBox.innerHTML = commentText;
        wrapDiv.innerHTML = '';
        wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
    }


    // const wrapDiv = document.createElement("div");
    // wrapDiv.className = "wrapper";
    // wrapDiv.style.marginLeft = 0;
    // commentText = document.getElementById("newComment").value;
    // document.getElementById("newComment").value = '';
    // textBox.innerHTML = commentText;
    // wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
    // commentContainer.appendChild(wrapDiv);
    setOnLocalStorage();
}
function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
document.getElementById('allComments').addEventListener('click', function (e) {
    if (hasClass(e.target, 'reply')) {
        const parentDiv = e.target.parentElement;
        const wrapDiv = document.createElement('div');
        wrapDiv.style.marginLeft = (Number.parseInt(parentDiv.style.marginLeft) + 15).toString() + 'px';
        wrapDiv.className = 'wrapper';
        const textArea = document.createElement('textarea');
        textArea.style.marginRight = '20px';
        const addButton = document.createElement('button');
        addButton.className = 'addReply';
        addButton.innerHTML = 'Add';
        const cancelButton = document.createElement('button');
        cancelButton.innerHTML = 'Cancel';
        cancelButton.className = 'cancelReply';
        wrapDiv.append(textArea, addButton, cancelButton);
        parentDiv.appendChild(wrapDiv);
    } else if (hasClass(e.target, 'addReply')) {
        addComment(e);
    } else if (hasClass(e.target, 'likeComment')) {
        const likeBtnValue = e.target.innerHTML;
        e.target.innerHTML = likeBtnValue !== 'Like' ? Number.parseInt(likeBtnValue) + 1 : 1;
    } else if (hasClass(e.target, 'cancelReply')) {
        e.target.parentElement.innerHTML = '';
    } else if (hasClass(e.target, 'deleteComment')) {
        e.target.parentElement.remove();
    }
    setOnLocalStorage();
});
function setOnLocalStorage() {
    localStorage.setItem('template', document.getElementById('allComments').innerHTML);
}
//save movies to watch to local storage // 



//EVENT LISTENERS//

document.getElementById('search-button').addEventListener('click', function (event) {
    event.preventDefault();

    var userMovieChoice = document.getElementById('movie-input').value;
    document.getElementById('sourceRatings').innerHTML = "";

    // console.log(userMovie);
    callMovie(userMovieChoice)
    formSubmitHandler();

})

$(".modalBtn").click(function () {
    $('#myModal').modal('hide');
    location.reload()
})



clearButton.addEventListener("click", function () {
    localStorage.clear();
    document.querySelector(".past-search").innerHTML = ""
    $("#moviePoster").remove()
    $('ul li').remove();
    $("#card-title").remove();
    location.reload()

})

pastSearchButtons.addEventListener("click", pastSearchHandler)

trailerModal.addEventListener("click", function () {
    $('#myTrailerModal').modal('show');
})

$("#btnOK").click(function () {
    $('#myTrailerModal').modal('hide')
    iFrame.setAttribute('src', '#')
});


document.getElementById('addComments').addEventListener("click", function (ev) {
    addComment(ev);
});
    