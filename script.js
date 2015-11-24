var access_token = "20203233.9e4190f.72c45bfbc5d14f24aecf3d2d85af78e3";

var goHome = function() {
	$("#message")[0].innerHTML = "";
	$("#grouppage")[0].hidden = true;
	$("#userpage")[0].hidden = true;
	$("#searchpage")[0].hidden = true;
	$("#homepage")[0].hidden = false;
};

var group = function() {
	$("#message")[0].innerHTML = "";
	$("#homepage")[0].hidden = true;
	$("#userpage")[0].hidden = true;
	$("#searchpage")[0].hidden = true;
	$("#grouppage")[0].hidden = false; //HANDLE CASE WHERE USER ADDS SOMEONE TO GROUP THEN PRESSES GROUP BUTTON
};

var user = function() {
	$("#message")[0].innerHTML = "";
	$("#homepage")[0].hidden = true;
	$("#grouppage")[0].hidden = true;
	$("#searchpage")[0].hidden = true;
	$("#userpage")[0].hidden = false;
};

var search = function() {
	$("#message")[0].innerHTML = "";
	$("#homepage")[0].hidden = true;
	$("#grouppage")[0].hidden = true;
	$("#userpage")[0].hidden = true;
	$("#searchpage")[0].hidden = false;
};

var createGroup = function() {
	var table = $("#groups")[0];
	var rows = table.rows;
	var rowIndex = rows.length - 1;
	var row = rows[rowIndex];
	var cellIndex = row.cells.length - 1;
	var cell;
	var id;
	var groupName;
	if (cellIndex == 4) { // add a new row after 5 cells 
		row = table.insertRow(++rowIndex);
		cellIndex = 0;
		cell = row.insertCell(cellIndex);
		cell.innerHTML = row.previousElementSibling.cells[4].innerHTML;
		id = (rowIndex - 1) * 5 + 4;
		groupName = checkGroupName(id);
		row.previousElementSibling.cells[4].innerHTML = "<div id=\"" + 
														groupName + 
														"\" class=\"groupName\">" + 
														groupName + 
														"<ul></ul></div><button onclick=\"viewGroup(this)\">View Group</button><button onclick=\"deleteGroup(this)\">Delete Group</button>";
		addToMenus(groupName);
	} else {
		cell = row.insertCell(++cellIndex);
		cell.innerHTML = cell.previousElementSibling.innerHTML;
		id = rowIndex * 5 + cellIndex - 1;
		groupName = checkGroupName(id);
		cell.previousElementSibling.innerHTML = "<div id=\"" + 
												groupName + 
												"\" class=\"groupName\">" + 
												groupName + 
												"<ul></ul></div><button onclick=\"viewGroup(this)\">View Group</button><button onclick=\"deleteGroup(this)\">Delete Group</button>";
		addToMenus(groupName);
	}
	console.log($("html")[0]);
};

var checkGroupName = function(groupName) {
	//groupName = groupName.replace(/ /g, "+"); ENFORCE UNIQUE GROUP NAMES
	if ($("#" + groupName).length > 0) {
		return checkGroupName(groupName + "-1");
	} else {
		return groupName;
	}
};

var viewGroup = function(button) {
	var div = button.parentElement.children[0];
	var groupName = div.id;
	$("#group")[0].innerHTML = groupName;
	var list = div.children[0].children;
	var table = $("#groupContents")[0];
	table.innerHTML = "";
	var row;
	var cell;
	var content;
	var rowIndex = 0;
	var cellIndex;
	var i = 0;
	while (i < list.length) {
		if (i % 3 == 0) {
			content = "<img src=\"" + 
					  list[i++].innerHTML + 
					  "\"><br><a href=\"https://www.instagram.com/" + 
					  list[i].innerHTML +
					  "\">" + 
					  list[i++].innerHTML + 
					  "</a><button onclick=\"getRecent(" + 
					  list[i++] + 
					  ")\">Recent Uploads</button>";
			if ((i - 3) % 15 == 0) {
				console.log(i);
				row = table.insertRow(rowIndex++);
				cellIndex = 0;
				cell = row.insertCell(cellIndex++);
			} else {
				cell = row.insertCell(cellIndex++);
			}
		}
		cell.innerHTML = content;
	}
	group();
};

var deleteGroup = function(button) {
	var cell = button.parentElement;
	var cellIndex = cell.cellIndex;
	var rowIndex = cell.parentElement.rowIndex;
	var table = $("#groups")[0];
	var groupName = table.rows[rowIndex].cells[cellIndex].children[0].id;
	$("." + groupName).remove();
	var rows = table.rows;
	var row;
	var nextRow;
	var cells;
	var cell;
	var nextCell;
	var children;
	var button;
	while (rowIndex < rows.length) { // loop through all rows
		row = rows[rowIndex++]
		cells = row.cells;
		while (cellIndex < cells.length) { // loop through all cells in a given row
			cell = cells[cellIndex];
			nextCell = cell.nextElementSibling;
			if (nextCell != null) { // overwrite cell with next cell if it is not the last of its row
				cell.innerHTML = nextCell.innerHTML;
				children = cell.children;
				button = children[children.length - 1];
				if (button.id != "") { // avoid unwanted side effect of assigning id to new group button
					button.id--;
				}
			} else { // handle cells that are the last of its row
				if (cellIndex < 4) { // delete cells that do not have a next row
					row.deleteCell(cellIndex);
				} else {
					nextRow = row.nextElementSibling;
					if (nextRow != null) { // overwrite cell with next cell if it has a next row
						cell.innerHTML = nextRow.cells[0].innerHTML;
						children = cell.children;
						button = children[children.length - 1];
						if (button.id != "") { // avoid unwanted side effect of assigning id to new group button
							button.id--;

						}
					} else { // otherwise just delete cell
						row.deleteCell(cellIndex);
					}
				}
			}
			cellIndex++;
		}
		cellIndex = 0;
	}
	var lastRowIndex = rows.length - 1;
	if (rows[lastRowIndex].cells.length == 0) {
		table.deleteRow(lastRowIndex);
	}
	console.log($("html")[0]);
};

var addToMenus = function(groupName) {
	var menus = $("select");
	var menu;
	for (var i = 0; i < menus.length; i++) {
		menu = menus[i];
		menu.innerHTML = menu.innerHTML + "<option class=\"" + groupName + "\">" + groupName + "</option>";
	}
};

var submitForm = function() {
	event.preventDefault();
	var choice = $("input:radio[name=type]:checked");
	var table = $("#searchResults")[0];
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
		table.innerHTML = data.meta.error_message;
	} else {
		var users = data.data;
		// handle case when no data is returned
		if (users.length < 1) {
			table.innerHTML = "No results."
		} else {
			var index = 0;
			var rowCount = 0;
			var cellCount;
			var user;
			var content = "";
			var options = getGroups();
			while (index < 20 && index < users.length) { // UI DESIGN DECISION TO HANDLE 20!!!
				user = users[index];
				content = "<img src=\"" + 
						  user.profile_picture + 
						  "\"><br><a href=\"https://www.instagram.com/" 
						  + user.username +
						  "\">" + 
						  user.username + 
						  "</a><button onclick=\"getRecent(" + 
						  user.id + 
						  ")\">Recent Uploads</button><select onchange=\"addToGroup(this, '" + 
						  user.profile_picture + 
						  "', '" +
						  user.username +
						  "', " + 
						  user.id +
						  ")\"><option selected disabled>Choose A Group!</option>" + // MUST BE ABLE TO ADD TO NEW GROUP
						  options +
						  "</select>"
				if (index % 5 == 0) { // add a new row after 5 cells
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
				index++;
			}
		}
	}
};

var getGroups = function() {
	var groups = $(".groupName");
	var ret = "";
	if (groups.length > 0) {
		var groupName;
		for (var i = 0; i < groups.length; i++) {
			groupName = groups[i].id;
			ret += "<option class=\"" + groupName + "\">" + groupName + "</option>";
		}
	}
	return ret;
};

var getRecent = function(id) {
	$.ajax({url: "https://api.instagram.com/v1/users/" + id + "/media/recent/?access_token=" + access_token,
			dataType: "jsonp",
			success: handleMedia				
	});
	//ON READY STATE??
	user();
};

var addToGroup = function(select, pic, username, id) {
	var groupName = select.value;
	if ($("#" + groupName + " ." + username).length < 1) { // check if user is already in group
		$("#" + groupName)[0].children[0].innerHTML += "<li class=\"" + 
													   username + 
													   "\" hidden>" +
													   pic +
													   "</li><li class=\"" +
													   username + 
													   "\">" + 
													   username + 
													   "</li><li class=\"" + 
													   username + 
													   "\" hidden>" + 
													   id +
													   "</li>";
		$("#message")[0].innerHTML = username + " was successfully added to " + groupName;
		var header = $("#group")[0];
		if (header.innerHTML == groupName) {
			var content = "<img src=\"" + 
					  	  pic + 
					  	  "\"><br><a href=\"https://www.instagram.com/" + 
					  	  username +
					  	  "\">" + 
					  	  username + 
					  	  "</a><button onclick=\"getRecent(" + 
					  	  id + 
					  	  ")\">Recent Uploads</button>";
			var table = header.nextElementSibling;
			var rows = table.rows;
			var rowIndex = rows.length - 1;
			var row;
			var cell;
			if (rowIndex >= 0) {
				row = rows[rowIndex];
				var cellIndex = row.cells.length;
				if (cellIndex == 5) {
					row = table.insertRow(++rowIndex);
					cell = row.insertCell(0);
					cell.innerHTML = content;
				} else {
					cell = row.insertCell(cellIndex);
					cell.innerHTML = content;
				}
			} else {
				row = table.insertRow(0);
				cell = row.insertCell(0);
				cell.innerHTML = content;
			}
		}
	} else {
		$("#message")[0].innerHTML = username + " already belongs to " + groupName;
	}
	select[0].selected = true;
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
		table.innerHTML = data.meta.error_message;
	} else {
		var media = data.data;
		var content = "";
		// handle case when no data is returned
		if (media.length < 1) {
			table.innerHTML = "No results."
		} else {
			var index = 0;
			var pv;
			while (index < media.length) {
				pv = media[index];
				if (pv.type == "image") {
					content += "<img src=\"" +
				    pv.images.standard_resolution.url +
			  	    "\">";
				} else if (pv.type == "video") { // handles videos
					content += "<video controls><source src=\"" +
			   	    pv.videos.standard_resolution.url +
				    "\" type=\"video/mp4\">Your browser does not support the video tag</video>";
				}
				//ADD POSTING USER -> SO THEY CAN BE ADDED TO GROUP (REQUIRED)
				if (pv.caption != null) {
					content += "<br>Caption: " + pv.caption.text;
				} //UI DECISION NOT TO DISPLAY ANYTHING WHEN THERE IS NO CAPTION
				content += "<br>NumLikes: " +
				   		   pv.likes.count +
						   "<br>Time: " +
						   convert(pv.created_time) +
						   "<br><a href=\"" +
						   pv.link +
						   "\">Instagram</a>";
				//UI DECISION TO NOT HAVE A SEPARATE THING FOR TAGS!!!!COMMENTS CAN RESULT IN A PIC BEING TAGGED - RETHINK DECISION???
				row = table.insertRow(index++);
				cell = row.insertCell(0);
				cell.innerHTML = content;
				content = "";
			}
		}
	}
};

var convert = function(millis) { //TODO!!!
	return millis;
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
		var table = $("#searchResults")[0];
		table.innerHTML = "No results.";
	}
};