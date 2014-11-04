// TODO - output the showVisitedPlaces and showWishListPlaces to output each object onto the page
// 		- save movements in objects from visited to wishlist and vice versa when a checkbox is clicked
// 		- understand what the hell is going on with the window.localStorage

var bucket = {
	// countries: ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"],

	visited: {},
	wishlist: {},

	init: function () {
		bucket.reload();
		bucket.showWishListPlaces();
		bucket.showVisitedPlaces();
	},

	save: function () {
		var bucketString = JSON.stringify(bucket);
		localStorage.setItem('bucket', bucketString);
		console.log("Saved bucketlist");
	},

	reload: function () {
		var bucketString = localStorage.getItem('bucket');
		if (! bucketString) {
			return;
		}
		var bucketCopy = JSON.parse(bucketString);
		bucket = _.extend(bucket, bucketCopy);

	},

	reset: function () {
		localStorage.removeItem('bucket');
		window.location.reload();
	},

	showVisitedPlaces: function () { // also need to move it around in the array to wishlist places
		var visitedPlaces = $('.visited').empty();
		_.each ( bucket.visited, function (entry) {
			console.log(entry);
			var entryHtml = '<div class="entry_box">';
			var text = '<h3>' + entry.place + '</h3>';
			var img = '<img class="image" src="' + entry.image + '" />';
			var score = '<h4>' + entry.score + '</h4>';
			var date = '<h4>' + entry.date + '</h4>';
			var checkbox = '<input type="checkbox" class="visited_now">';
			var deletebox = '<button class="delete"> Delete </button>';
			var closing = '</div>';
			var $entryHTML = entryHtml + text +img +score + date + checkbox + deletebox + closing;
			$('.visited').append($entryHTML);

		});

	},

	showWishListPlaces: function() {
		var wishlistPlaces = $('.places').empty();
		_.each ( bucket.wishlist, function (entry) {
			console.log(entry);
			var entryHtml = '<div class="entry_box">';
			var text = '<h3>' + entry.place + '</h3>';
			var img = '<img class="image" src="' + entry.image + '" />';
			var score = '<h4>' + entry.score + '</h4>';
			var date = '<h4>' + entry.date + '</h4>';
			var checkbox = '<input type="checkbox" class="visited_now">';
			var deletebox = '<button class="delete"> Delete </button>';
			var closing = '</div>';
			var $entryHTML = entryHtml + text +img +score + date + checkbox + deletebox + closing;
			$('.places').append($entryHTML);
		});
		

	},

	enterCountry: function(place, score, date, image, completed) {
		if (completed) {
			entry = { // give this an ID
				place: place,
				score: score,
				date: date,
				image: image,
			};
			entry.data('entry', place);
			bucket.visited.push(entry);

			bucket.showVisitedPlaces();

		} else {
			entry = { // give this an ID
				place: place,
				score: score,
				date: date,
				image: image,
			};
			entry.data('entry', place);
			bucket.wishlist.push(entry);

			bucket.showWishListPlaces();

		}

	},

	addCountries: function() {
		var $this = $(this);
		var place = $.trim($('#place').val());
		var score = $.trim($('#score').val());
		var date = $.trim($('#date').val());
		var image = $.trim($('#image').val());
		var completed = $('#checkbox').prop('checked');

		$('#place').val('').focus();

		if (! place) {
			return;
		}

		if ($this.is('#enter')) {
			console.log("enter pressed");
			bucket.enterCountry(place, score, date, image, completed);
		}

		bucket.save();

	},

	moveCountry: function() {
		// Find the parent div called .entry_box
		// $this = $(this);
		// $parent_div = $this.closest('.entry_box');
		// console.log($parent_div);
		$this = $(this);
		if ($parent_div.find('.visited_now').prop('checked')) {
			$parent_div.appendTo('.visited');
			bucket.visited.append({ // need to find the entry in the bucket wishlist and move to bucket visited

				// each loop to find the indx
				//compact
			});
		} else {
			$parent_div.appendTo('.places');
			bucket.wishlist.append({

			});

		}
		bucket.save();
	},

	deleteCountry: function() {
		$this = $(this);
		$parent_div = $this.closest('.entry_box');
		$parent_div.remove();
		// Find the bucket in the list and remove it from that array
		bucket.save();
	}

};

$(document).ready(function() {
	bucket.init();

	$('#enter').on('click', bucket.addCountries);

	$('.container').on('click', '.visited_now', bucket.moveCountry);
	$('.container').on('click', '.delete', bucket.deleteCountry);

});