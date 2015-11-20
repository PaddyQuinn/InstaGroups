var handleUsers = function(data) {
	var table = $("#results")[0];
	table.innerHTML = "";
	var display = 0;
	var row;
	var cell;
	if (data.meta.code != 200) {
		row = table.insertRow(display / 2);
		cell = row.insertCell(0);
		cell.innerHTML = data.meta.error_message;
	} else {
		var user;
		var users = data.data;
		if (users.length < 1) {
			row = table.insertRow(display / 2);
			cell = row.insertCell(0);
			cell.innerHTML = "No results."
		}
		while (display < 10 && display < users.length) {
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

var handleTags = function(data) {
	var table = $("#results")[0];
	table.innerHTML = "";
	var display = 0;
	var row;
	var cell;
	if (data.meta.code != 200) {
		row = table.insertRow(display / 2);
		cell = row.insertCell(0);
		cell.innerHTML = data.meta.error_message;
	} else {
		var media = data.data;
		console.log(media);
		var pv;
		var content = "";
		if (media.length < 1) {
			row = table.insertRow(display / 2);
			cell = row.insertCell(0);
			cell.innerHTML = "No results."
		}
		while (display < 10 && display < media.length) {
			pv = media[display];
			if (pv.type == "image") {
				content += "<img src=\"" +
					   	   pv.images.standard_resolution.url +
					   	   "\"><br>Caption: " +
					   	   pv.caption.text +
					   	   "<br>NumLikes: " +
					   	   pv.likes.count +
					   	   "<br>Time: " +
					   	   pv.created_time +
					   	   "<br><a href=\"" +
					   	   pv.link +
					   	   "\">Instagram</a>";
			} else if (pv.type == "video") {
				content += "<video controls><source src=\"" +
					   	   pv.videos.standard_resolution.url +
					   	   "\" type=\"video/mp4\">Your browser does not support the video tag</video><br>Caption: " +
					   	   pv.caption.text +
					   	   "<br>NumLikes: " +
					   	   pv.likes.count +
					   	   "<br>Time: " +
					   	   pv.created_time +
					   	   "<br><a href=\"" +
					   	   pv.link +
					   	   "\">Instagram</a>";
			}
			//UI DECISION TO NOT HAVE A SEPARATE THING FOR TAGS!!!!
			if (display % 2 == 0) {
				row = table.insertRow(display / 2);
				cell = row.insertCell(0);
				cell.innerHTML = content;
			} else {
				cell = row.insertCell(1);
				cell.innerHTML = content;
			}
			content = "";
			display++;
		}
	}
};

var access_token = "20203233.9e4190f.72c45bfbc5d14f24aecf3d2d85af78e3";

$(document).ready(function() {
	$("#new")[0].addEventListener("click", function(event) {
		console.log("new");
	});
	$("form")[0].addEventListener("submit", function(event) {
		event.preventDefault();
		var choice = $("input:radio[name=type]:checked");
		if (choice.length > 0) {
			var query = $("#search")[0].value;
			if (query.length > 0) {
				if (choice[0].value == "people") {
					$.ajax({url: "https://api.instagram.com/v1/users/search?q=" + query + "&access_token=" + access_token, 
							dataType: "jsonp",
							success: handleUsers
					});
				} else if (choice[0].value == "tags") {
					$.ajax({url: "https://api.instagram.com/v1/tags/" + query + "/media/recent?access_token=" + access_token, 
							dataType: "jsonp",
							success: handleTags
					});
				} else if (choice[0].value == "places") {
					console.log("places");
				}
			}
		}
	});

});