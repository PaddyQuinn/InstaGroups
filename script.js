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
	var table = $("#searchResults")[0];
	table.innerHTML = "";
	var row;
	var cell;
	// make sure correct data is returned
	if (data.meta.code != 200) {
		row = table.insertRow(0);
		cell = row.insertCell(0);
		cell.innerHTML = data.meta.error_message;
	} else {
		var user;
		var users = data.data;
		// handle case when no data is returned
		if (users.length < 1) {
			row = table.insertRow(0);
			cell = row.insertCell(0);
			cell.innerHTML = "No results."
		}
	}
	display(table, users, "users");
};

var handleMedia = function(data) {
	var table;
	if (this.url.indexOf("https://api.instagram.com/v1/users/") < 0) {
		table = $("#searchResults")[0];
	} else {
		table = $("#userResults")[0];
		$("#user")[0].innerHTML = data.data[0].user.username; //"User" SHOWS UP AT FIRST ON USERPAGE
	}
	table.innerHTML = "";
	var row;
	var cell;
	// make sure correct data is returned
	if (data.meta.code != 200) {
		row = table.insertRow(0);
		cell = row.insertCell(0);
		cell.innerHTML = data.meta.error_message;
	} else {
		var media = data.data;
		var content = "";
		// handle case when no data is returned
		if (media.length < 1) {
			row = table.insertRow(0);
			cell = row.insertCell(0);
			cell.innerHTML = "No results."
		}
		display(table, media, "media");
	}
};

var display = function(table, arr, type) {
	var disp = 0;
	var row;
	var cell;
	var rowCount = 0;
	var cellCount;
	var index;
	var content = ""
	while (disp < 20 && disp < arr.length) { // UI DESIGN DECISION TO HANDLE 20!!!
		index = arr[disp];
		if (type == "users") {
			content = "<img src=\"" + 
					  index.profile_picture + 
					  "\"><br><a href=\"https://www.instagram.com/" 
					  + index.username +
					  "\">Instagram</a><button onclick=\"getRecent(" + index.id + ")\">Recent Uploads</button>";
		} else if (type == "media") {
			if (index.type == "image") {
				content += "<img src=\"" +
					   	   index.images.standard_resolution.url +
					   	   "\">";
			} else if (index.type == "video") { // handles videos
				content += "<video controls><source src=\"" +
					   	   index.videos.standard_resolution.url +
					   	   "\" type=\"video/mp4\">Your browser does not support the video tag</video>";
			}
			if (index.caption != null) {
				content += "<br>Caption: " + index.caption.text;
			} //UI DECISION NOT TO DISPLAY ANYTHING WHEN THERE IS NO CAPTION
			content += "<br>NumLikes: " +
					   index.likes.count +
					   "<br>Time: " +
					   index.created_time +
					   "<br><a href=\"" +
					   index.link +
					   "\">Instagram</a>";
			//UI DECISION TO NOT HAVE A SEPARATE THING FOR TAGS!!!!COMMENTS CAN RESULT IN A PIC BEING TAGGED - RETHINK DECISION???
		}
		if (disp % 5 == 0) {
			row = table.insertRow(rowCount);
			cellCount = 0;
			cell = row.insertCell(cellCount);
			rowCount++;
		} else {
			cell = row.insertCell(cellCount);
		}
		cellCount++;
		cell.innerHTML = content;
		content = "";
		disp++;
	}
};

var getRecent = function(id) {
	$.ajax({url: "https://api.instagram.com/v1/users/" + id + "/media/recent/?access_token=" + access_token,
			dataType: "jsonp",
			success: handleMedia				
	});
	user();
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
var createTable = function() {

};

var search = function() {
	$("#groupspage")[0].hidden = true;
	$("#userpage")[0].hidden = true;
	$("#searchpage")[0].hidden = false;
};

var groups = function() {
	$("#searchpage")[0].hidden = true;
	$("#userpage")[0].hidden = true;
	$("#groupspage")[0].hidden = false;
};

var user = function() {
	$("#searchpage")[0].hidden = true;
	$("#groupspage")[0].hidden = true;
	$("#userpage")[0].hidden = false;
};