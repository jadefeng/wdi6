$(document).ready(function () {
  $('#search').on('click', searchMovies);
  $('#posters').on('click', '.movie_ID', findMovieDetails);	
});

var search_results = [];
var movie_results = [];
var omdbUrl = 'http://www.omdbapi.com/?';


var searchMovies = function(event) {
	$('#posters').empty();
	$('#movie').empty();
	search_results = [];
	movie_results = [];

	$('<h1>').text("Mew-vie Search").appendTo('#posters');
	var query = $('#query').val();
	query = encodeURI(query);

	// Search for the array of movie names
	console.log('about to AJAX');
	$.ajax([omdbUrl, 's=', query].join(''), {dataType: 'json'} ).done(function(result){
		console.log('returned from AJAX');

		// IF ERROR STATEMENT
		if (result.Error) {
			$('<h2>').text("What a cat-astrophe!").appendTo('#posters');
			$('<h2>').text("Your mew-vie does not exist in our claw-lection!").appendTo('#posters');


		} else {
			search_results = result.Search;
			console.log(search_results);

			// pull out an array of imdbIDs
			$.each(search_results, function(index, movie_object){
				movie_results.push(movie_object.imdbID);
			});
			// console.log(movie_results);

			// Could do another .done(function... ) here, but it makes more sense to attach it inside
			console.log('about to iterate');
			// Search for each of the movies in the movie_results array
			$.each(movie_results, function(index, movie_imdbID) {
				// console.log([omdbUrl, 'i=', movie_imdbID].join(''));

				console.log("Finding the poster URL");
				$.ajax([omdbUrl, 'i=', movie_imdbID].join(''), {dataType: 'json'}).done( function(result2) {
					
					var poster_url = result2.Poster;
					if (poster_url === "N/A") {
						poster_url = 'http://data2.whicdn.com/images/63702297/large.jpg';
					}
					var poster_title = result2.Title;
					console.log(poster_url);

					$contain = $('<div class="movie_ID list_output_boxes">'); // put data into here
					$('<img>', {src: poster_url}).appendTo($contain);
					$textdiv = $('<div class="text_name">').appendTo($contain);
					$('<h4>').text(poster_title).appendTo($textdiv);
					$contain.appendTo('#posters');
					$contain.data('imdbID', result2.imdbID);
				});
			});
		}
	});
};

var findMovieDetails = function() {
	$('#movie').empty();

	$('<h1>').text("Your Mew-vie").appendTo("#movie");
	var movie_imdbID = $(this).data("imdbID");

	$.ajax([omdbUrl, 'i=', movie_imdbID].join(''), {dataType: 'json'}).done( function(result3) {
				
				var poster_url = result3.Poster;
				if (poster_url === "N/A") {
					poster_url = 'http://data2.whicdn.com/images/63702297/large.jpg';
				}

				$contain = $('<article class="post"><div class="movie_box">'); // put data into here
				$('<img>', {src: poster_url}).appendTo($contain);
				$('<h2>').text(result3.Title + " (" + result3.Year + ")").appendTo($contain);
				$('<h3>').text('Genre: ' + result3.Genre).appendTo($contain);
				$('<h3>').text(result3.imdbRating + '/10 stars').appendTo($contain);
				$('<h3>').text(result3.Plot).appendTo($contain);
				$contain.appendTo('#movie');
				// $contain.fadeIn();
			});
	movie_imdbID.empty();
};
