$(document).ready(function () {
  $('#search').on('click', searchMovies);
  $('#clear').on('click', clearMovies);
  $('#posters').on('click', '.movie_ID', findMovieDetails);	
});

var search_results = [];
var movie_results = [];
var omdbUrl = 'http://www.omdbapi.com/?';

var clearMovies = function() {
	$('#posters').empty();
	search_results.empty();
	movie_results.empty();
};

var searchMovies = function(event) {
	// if (search_results) { search_results.empty(); }
	// if (movie_results) {movie_results.empty(); }

	$('<h1>').text("Mew-vie Search").appendTo('#posters');
	var query = $('#query').val();
	query = encodeURI(query);

	// Search for the array of movie names
	console.log('about to AJAX');
	$.ajax([omdbUrl, 's=', query].join(''), {dataType: 'json'} ).done(function(result){
		console.log('returned from AJAX');
		search_results = result.Search;
		// console.log(search_results);

		// Pull out the movies array 
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
	});
};

var findMovieDetails = function() {
	$('<h1>').text("Your Mew-vie").appendTo("#movie");
	var movie_imdbID = $(this).data("imdbID");

	$.ajax([omdbUrl, 'i=', movie_imdbID].join(''), {dataType: 'json'}).done( function(result3) {
				
				var poster_url = result3.Poster;
				if (poster_url === "N/A") {
					poster_url = 'http://data2.whicdn.com/images/63702297/large.jpg';
				}
				var poster_title = result3.Title;
				var poster_year = result3.Year;
				var poster_actors = result3.Actors; 
				var poster_plot = result3.Plots;
				var poster_genre = result3.Genre;
				var poster_director = result3.Director;
				var poster_writer = result3.Writer;
				var poster_language = result3.Language;
				var poster_country = result3.Country;
				var poster_awards = result3.Awards;
				var poster_imdbRating = result3.imdbRating;

				$contain = $('<div class="movie_details">'); // put data into here
				$('<img>', {src: poster_url}).appendTo($contain);
				$('<h3>').text(poster_title).appendTo($contain);
				$('<h4>').text(poster_year).appendTo($contain);
				$('<h4>').text(poster_plot).appendTo($contain);
				$('<h4>').text(poster_director).appendTo($contain);
				$('<h4>').text(poster_actors).appendTo($contain);
				$('<h4>').text(poster_genre).appendTo($contain);
				$contain.appendTo('#movie');
			});
};
