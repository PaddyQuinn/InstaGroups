var access_token = "20203233.9e4190f.72c45bfbc5d14f24aecf3d2d85af78e3";

var submitForm = function() {
	event.preventDefault();
	var choice = $("input:radio[name=type]:checked");
	var table = $("#results")[0];
	if (choice.length > 0) {
		var query = $("#search")[0].value;
		var invalid; //UI DECISION TO MAKE SURE VALID INPUT
		if (query.length > 0) {
			if (choice[0].value == "people") {
				// query instagram api for users
				invalid = /\?/; // check for question marks
				if (!invalid.test(query)) {
					$.ajax({url: "https://api.instagram.com/v1/users/search?q=" + query + "&access_token=" + access_token, 
							dataType: "jsonp",
							success: handleUsers
					});
				} else {
					table.innerHTML = "Invalid input!";
				}
			} else if (choice[0].value == "tags") {
				// query instagram api for media based on tag
				invalid = /[\[\]\\\/~`!@#$%^&*()-=+{}|;':"<>,.? ]/; // regular expression for invalid input
				if (!invalid.test(query)) {
					$.ajax({url: "https://api.instagram.com/v1/tags/" + query + "/media/recent?access_token=" + access_token, 
							dataType: "jsonp",
							success: handleMedia
					});
				} else {
					table.innerHTML = "Invalid input!";
				}
			} else if (choice[0].value == "places") {
				// query google maps api for latitude and longitude of search query
				invalid = /\?/; // check for question marks
				if (!invalid.test(query)) {
					$.ajax({url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + query + "&key=AIzaSyAEl6rZYUeweCN-LTlruBSiWFOPHlC59P8", 
							dataType: "json",
							success: searchOnCoordinates
					});
				} else {
					table.innerHTML = "Invalid input!";
				}
			}
		}
	} else {
		table.innerHTML = "Please select a filter!";
	}
};

var handleUsers = function(data) {
	var table = $("#results")[0];
	table.innerHTML = "";
	var display = 0;
	var row;
	var cell;
	// make sure correct data is returned
	if (data.meta.code != 200) {
		row = table.insertRow(display / 2);
		cell = row.insertCell(0);
		cell.innerHTML = data.meta.error_message;
	} else {
		var user;
		var users = data.data;
		// handle case when no data is returned
		if (users.length < 1) {
			row = table.insertRow(display / 2);
			cell = row.insertCell(0);
			cell.innerHTML = "No results."
		}
		while (display < 10 && display < users.length) { // handle 20? because thats how much media
			user = users[display];
			if (display % 2 == 0) {
				row = table.insertRow(display / 2);
				cell = row.insertCell(0);
				cell.innerHTML = "<img src=\"" + 
							 	 user.profile_picture + 
							 	 "\"><br><a href=\"https://www.instagram.com/" 
							 	 + user.username +
							 	 "\">Instagram</a><a href=/Users/padraic/Documents/Columbia/Seventh%20Semester/UI%20Design/pmq2101_hw3/index.html>Recent Uploads</a>";
		} else {
				cell = row.insertCell(1);
				cell.innerHTML = "<img src=\"" + 
							 	 user.profile_picture + 
							 	 "\"><br><a href=\"https://www.instagram.com/" 
							 	 + user.username +
							 	 "\">Instagram</a><a href=/Users/padraic/Documents/Columbia/Seventh%20Semester/UI%20Design/pmq2101_hw3/index.html>Recent Uploads</a>";
			}
			display++;
		}
	}
};

var handleMedia = function(data) {
	var table = $("#results")[0];
	table.innerHTML = "";
	var display = 0;
	var row;
	var cell;
	// make sure correct data is returned
	if (data.meta.code != 200) {
		row = table.insertRow(0);
		cell = row.insertCell(0);
		cell.innerHTML = data.meta.error_message;
	} else {
		var media = data.data;
		var pv;
		var content = "";
		// handle case when no data is returned
		if (media.length < 1) {
			row = table.insertRow(0);
			cell = row.insertCell(0);
			cell.innerHTML = "No results."
		}
		var rowCount = 0;
		var cellCount;
		while (display < 20 && display < media.length) { // 20 is maximum media returned from api
			pv = media[display];
			if (pv.type == "image") {
				content += "<img src=\"" +
					   	   pv.images.standard_resolution.url +
					   	   "\">";
			} else if (pv.type == "video") { // handles videos
				content += "<video controls><source src=\"" +
					   	   pv.videos.standard_resolution.url +
					   	   "\" type=\"video/mp4\">Your browser does not support the video tag</video>";
			}
			if (pv.caption != null) {
				content += "<br>Caption: " + pv.caption.text;
			} //UI DECISION NOT TO DISPLAY ANYTHING WHEN THERE IS NO CAPTION
			content += "<br>NumLikes: " +
					   pv.likes.count +
					   "<br>Time: " +
					   pv.created_time +
					   "<br><a href=\"" +
					   pv.link +
					   "\">Instagram</a>";
			//UI DECISION TO NOT HAVE A SEPARATE THING FOR TAGS!!!!COMMENTS CAN RESULT IN A PIC BEING TAGGED - RETHINK DECISION???
			if (display % 5 == 0) {
				row = table.insertRow(rowCount);
				cellCount = 0;
				cell = row.insertCell(cellCount);
				cell.innerHTML = content;
				rowCount++;
			} else {
				cell = row.insertCell(cellCount);
				cell.innerHTML = content;
				cellCount++;
			}
			content = "";
			display++;
		}
	}
};

var searchOnCoordinates = function(data) {
	if (data.status == "OK") {
		var coordinates = data.results[0].geometry.location;
		var lat = coordinates.lat;
		var lng = coordinates.lng;
		$.ajax({url: "https://api.instagram.com/v1/media/search?lat=" + lat + "&lng=" + lng + "&access_token=" + access_token,
				dataType: "jsonp",
				success: handleMedia				
		});
	} else {
		var table = $("#results")[0];
		table.innerHTML = "";
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "No results.";
	}
};

var newGroup = function() {
	$("#homepage")[0].hidden = true;
	$("#groupspage")[0].hidden = false;
};

var home = function() {
	$("#groupspage")[0].hidden = true;
	$("#homepage")[0].hidden = false;
};