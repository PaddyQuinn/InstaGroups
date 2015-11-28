var access_token = "20203233.9e4190f.72c45bfbc5d14f24aecf3d2d85af78e3";

var goHome = function(li) {
	li.className = "active";
	var next = li.nextElementSibling;
	for (var i = 0; i < 3; i++) {
		next.className = "";
		next = next.nextElementSibling;
	}
	$("#homeMessage")[0].innerHTML = "";
	$("#groupMessage")[0].innerHTML = "";
	$("#userMessage")[0].innerHTML = "";
	$("#searchMessage")[0].innerHTML = "";
	$("#grouppage")[0].hidden = true;
	$("#userpage")[0].hidden = true;
	$("#searchpage")[0].hidden = true;
	$("#homepage")[0].hidden = false;

};

var group = function(li) {
	li.className = "active";
	li.previousElementSibling.className = "";
	var next = li.nextElementSibling;
	for (var i = 0; i < 2; i++) {
		next.className = "";
		next = next.nextElementSibling;
	}
	$("#homeMessage")[0].innerHTML = "";
	$("#userMessage")[0].innerHTML = "";
	$("#searchMessage")[0].innerHTML = "";
	$("#homepage")[0].hidden = true;
	$("#userpage")[0].hidden = true;
	$("#searchpage")[0].hidden = true;
	$("#grouppage")[0].hidden = false;
};

var user = function(li) {
	li.className = "active";
	li.nextElementSibling.className = "";
	var prev = li.previousElementSibling;
	for (var i = 0; i < 2; i++) {
		prev.className = "";
		prev = prev.previousElementSibling;
	}
	$("#homeMessage")[0].innerHTML = "";
	$("#groupMessage")[0].innerHTML = "";
	$("#searchMessage")[0].innerHTML = "";
	$("#homepage")[0].hidden = true;
	$("#grouppage")[0].hidden = true;
	$("#searchpage")[0].hidden = true;
	$("#userpage")[0].hidden = false;
};

var toSearch = function(li) {
	li.className = "active";
	var prev = li.previousElementSibling;
	for (var i = 0; i < 3; i++) {
		prev.className = "";
		prev = prev.previousElementSibling;
	}
	$("#homeMessage")[0].innerHTML = "";
	$("#groupMessage")[0].innerHTML = "";
	$("#userMessage")[0].innerHTML = "";
	$("#homepage")[0].hidden = true;
	$("#grouppage")[0].hidden = true;
	$("#userpage")[0].hidden = true;
	$("#searchpage")[0].hidden = false;
};

// UI Decision: Have links to Instagram open on a new page to preserve the session

var createGroup = function(pic, username, id) { 
	$("#homeMessage")[0].innerHTML = "";
	$("#groupMessage")[0].innerHTML = "";
	$("#grouppage")[0].children[1].children[1].innerHTML = "";
	$("#groupContents")[0].innerHTML = "";
	var textbox = "<form onsubmit=\"editGroup()\"><input type=\"text\" id=\"group\" value=\"\" onfocus=\"this.value = this.value;\"></input>" +
				  "<input type=\"text\" id=\"p\" value=\"" +
				  pic +
				  "\" hidden></input><input type=\"text\" id=\"u\" value=\"" +
				  username +
				  "\" hidden></input><input type=\"text\" id=\"i\" value=\"" +
				  id +
				  "\" hidden></input><input type=\"text\" id=\"previous\" value=\"\" hidden></input>" +
				  "<br><br><input type=\"submit\" class=\"btn btn-md\" value=\"Submit\"></input></form>";
	if (id != -1) {
		var row = $("#groupContents")[0].insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = "<img src=\"" + 
					  	 pic + 
						 "\" class=\"img-circle\"><br><a href=\"https://www.instagram.com/" + 
						 username +
				  	  	 "\" target=\"_blank\">" + 
					  	 username + 
						 "</a><br><button class=\"btn btn-xs\" onclick=\"getRecent(" + 
						 id + 
						 ")\">Recent Uploads</button> <button class=\"btn btn-xs\" onclick=\"removeFromGroup(this)\">Remove</button>";
	}
	$("#grouppage")[0].children[1].children[0].outerHTML = textbox;
	group($("li")[1]);
	$("#group")[0].focus();
};

var editGroup = function() {
	event.preventDefault();
	$("#groupMessage")[0].innerHTML = "";
	var groupName = $("#group")[0].value;
	var pic = $("#p")[0].value;
	var username = $("#u")[0].value;
	var id = $("#i")[0].value;
	var previous = $("#previous")[0].value;
	var content = "";
	if (id != -1) {
		content += "<li class=\"" + 
				  username + 
				  "\" hidden>" +
				  pic +
				  "</li><li class=\"" +
				  username + 
				  "\"><button class=\"btn btn-link\" onclick=\"getRecent(" + 
				  id + 
				  ")\">" + 
				  username +
				  "</button></li><li class=\"" + 
				  username + 
				  "\" hidden>" + 
				  id +
				  "</li>";
	}
	var message;
	if (previous == "") {
		message = checkGroupName(groupName);
		if (message == groupName) {
			$("#grouppage")[0].children[1].children[0].outerHTML = "<h1 id=\"currentGroup\" onclick=\"toTextbox(this)\">" + 
																   groupName + 
																   "</h1>";
			var table = $("#groups")[0];
			var rows = table.rows;
			var rowIndex = rows.length - 1;
			var row = rows[rowIndex];
			var cellIndex = row.cells.length - 1;
			var cell;
			if (cellIndex == 4) { // add a new row after 5 cells 
				row = table.insertRow(++rowIndex);
				cellIndex = 0;
				cell = row.insertCell(cellIndex);
				cell.innerHTML = row.previousElementSibling.cells[4].innerHTML;
				row.previousElementSibling.cells[4].className = "groupCell";
				row.previousElementSibling.cells[4].innerHTML = "<div class=\"groupCellMedia\"><div id=\"" + 
																encode(groupName) +
																"\" class=\"groupName\"><h4>" + 
																groupName + 
																"</h4><ul class=\"list-unstyled\">" +
																content +
																"</ul></div>" +
																"<button class=\"btn btn-xs\" onclick=\"viewGroup(this)\">View/Edit</button>" +
																" <button class=\"btn btn-xs\" onclick=\"deleteGroup(this)\">Delete Group</button></div>";
				addToMenus(groupName);
			} else {
				cell = row.insertCell(++cellIndex);
				cell.innerHTML = cell.previousElementSibling.innerHTML;
				cell.previousElementSibling.className = "groupCell";
				cell.previousElementSibling.innerHTML = "<div class=\"groupCellMedia\"><div id=\"" + 
														encode(groupName) + 
														"\" class=\"groupName\"><h4>" + 
														groupName + 
														"</h4><ul class=\"list-unstyled\">" +
														content + 
														"</ul></div>" +
														"<button class=\"btn btn-xs\" onclick=\"viewGroup(this)\">View/Edit</button>" +
														" <button class=\"btn btn-xs\" onclick=\"deleteGroup(this)\">Delete Group</button></div>";
				addToMenus(groupName);
			}
		} else {
			$("#groupMessage")[0].className = "bg-danger";
			$("#groupMessage")[0].innerHTML = message;
			window.scrollTo(0,0);
		}
	} else {
		if (groupName == previous) {
			$("#grouppage")[0].children[1].children[0].outerHTML = "<h1 id=\"currentGroup\" onclick=\"toTextbox(this)\">" + 
																   groupName + 
																   "</h1>";
		} else {
			message = checkGroupName(groupName);
			if (message == groupName) {
				$("#grouppage")[0].children[1].children[0].outerHTML = "<h1 id=\"currentGroup\" onclick=\"toTextbox(this)\">" + 
																	   groupName + 
																	   "</h1>";
				previous = encode(previous);
				$("#" + previous)[0].firstChild.innerHTML = groupName;
				$("#" + previous)[0].id = encode(groupName);
				var options = $("." + previous);
				for (var i = 0; i < options.length; i++) {
					options[i].innerHTML = groupName;
					options[i].className = encode(groupName);
				}
			} else {
				$("#groupMessage")[0].className = "bg-danger";
				$("#groupMessage")[0].innerHTML = message;
				window.scrollTo(0,0);
			}
		}
	}
};

var checkGroupName = function(groupName) {
	var invalid = /[\[\]\\\/~`!@#$%\^&*()\-=+{}\|;':"<>,.?_]/;
	if (groupName == "") {
		return "Please enter a group name.";
	} else if (groupName.length > 20) {
		return "Group name too long."
	} else if (invalid.test(groupName)) {
		return "Invalid group name.";
	} else if (groupName == "homepage" || 
			groupName == "homeMessage" ||
			groupName == "groups" ||
			groupName == "grouppage" ||
			groupName == "groupMessage" ||
			groupName == "groupHeader" ||
			groupName == "group" ||
			groupName == "p" ||
			groupName == "u" ||
			groupName == "i" ||
			groupName == "previous" ||
			groupName == "groupContents" ||
			groupName == "userpage" ||
			groupName == "userMessage" ||
			groupName == "user" ||
			groupName == "userFunction" ||
			groupName == "userResults" ||
			groupName == "searchpage" ||
			groupName == "searchMessage" ||
			groupName == "searchForm" ||
			groupName == "search" ||
			groupName == "searchResults" ||
			groupName == "currentGroup" ||
			groupName == "groupContents" ||
			groupName == "people" ||
			groupName == "New Group") {
		return "Illegal group name.";
	} else if ($("#" + encode(groupName)).length > 0) {
		return groupName + " already used.";
	} else {
		return groupName;
	}
};

var encode = function(groupName) {
	return groupName.replace(/ /g, "_");
};

var toTextbox = function(header) {
	var previous = header.innerHTML;
	var textbox = "<form onsubmit=\"editGroup()\">" +
				  "<input type=\"text\" id=\"group\" value=\"" +
				  previous +
				  "\" onfocus=\"this.value = this.value;\"></input>" +
				  "<input type=\"text\" id=\"p\" value=\"\" hidden></input>" +
				  "<input type=\"text\" id=\"u\" value=\"\" hidden></input>" +
				  "<input type=\"text\" id=\"i\" value=\"-1\" hidden></input>" +
				  "<input type=\"text\" id=\"previous\" value=\"" +
				  previous +
				  "\" hidden></input>" +
				  "<br><br><input type=\"submit\" class=\"btn btn-md\" value=\"Submit\"></input></form>";
	header.outerHTML = textbox;
	$("#group")[0].focus();
};

var viewGroup = function(button) {
	$("#homeMessage")[0].innerHTML = "";
	var div = button.parentElement.children[0];
	var groupName = div.id;
	$("#grouppage")[0].children[1].children[0].outerHTML = "<h1 id=\"currentGroup\" onclick=\"toTextbox(this)\">" + 
														   groupName + 
														   "</h1>";
	var list = div.children[1].children;
	var table = $("#groupContents")[0];
	table.innerHTML = "";
	var row;
	var cell;
	var content;
	var rowIndex = 0;
	var cellIndex;
	var i = 0;
	var pic;
	var id;
	var username;
	while (i < list.length) {
		if (i % 3 == 0) {
			pic = list[i++].innerHTML;
			username = list[i++].children[0].innerHTML;
			id = list[i++].innerHTML;
			content = "<img src=\"" + 
					  pic + 
					  "\" class=\"img-circle\"><br><a href=\"https://www.instagram.com/" + 
					  username +
					  "\" target=\"_blank\">" + 
					  username + 
					  "</a><br><button class=\"btn btn-xs\" onclick=\"getRecent(" + 
					  id +
					  ")\">Recent Uploads</button> <button class=\"btn btn-xs\" onclick=\"removeFromGroup(this)\">Remove</button>";
			if ((i - 3) % 15 == 0) {
				row = table.insertRow(rowIndex++);
				cellIndex = 0;
				cell = row.insertCell(cellIndex++);
			} else {
				cell = row.insertCell(cellIndex++);
			}
		}
		cell.innerHTML = content;
	}
	group($("li")[1]);
};

var getRecent = function(id) { 
	$("#groupMessage")[0].innerHTML = "";
	$("#searchMessage")[0].innerHTML = "";
	$.ajax({url: "https://api.instagram.com/v1/users/" + id + "/media/recent/?access_token=" + access_token,
			dataType: "jsonp",
			success: handleMedia				
	});
	$(document).ready(user($("li")[2]));
};

var handleMedia = function(data) {
	// make sure correct data is returned
	if (data.meta.code != 200) {
		if (this.url.indexOf("https://api.instagram.com/v1/users/") < 0) {
			$("#searchMessage")[0].className = "bg-danger";
			$("#searchMessage")[0].innerHTML = data.meta.error_message;
		} else {
			$("#userMessage")[0].className = "bg-danger";
			$("#userMessage")[0].innerHTML = data.meta.error_message;
		}
		window.scrollTo(0,0);
	} else {	
		var table;
		var media = data.data;
		if (this.url.indexOf("https://api.instagram.com/v1/users/") < 0) {
			table = $("#searchResults")[0];
			window.scrollTo(0, 245);
		} else {
			table = $("#userResults")[0];
			$("#user")[0].innerHTML = data.data[0].user.username;
			var options = getGroups();
			$("#userFunction")[0].innerHTML = "<select onchange=\"addToGroup(this, '" +
						  			  		  media[0].user.profile_picture +
						   					  "', '" +
											  media[0].user.username +
											  "', " +
											  media[0].user.id +
						  					  ")\"><option selected disabled>Add to Group!</option><option>New Group</option>" +
						  					  options +
						  			 		  "</select>";
		}
		table.innerHTML = "";
		var row;
		var cell;
		var content = "";
		// handle case when no data is returned
		var index = 0;
		var pv;
		while (index < media.length) {
			pv = media[index];
			if (pv.type == "image") {
				content += "<div class=\"mediaCellContents\"><img src=\"" +
			    pv.images.standard_resolution.url +
			    "\" class=\"img-thumbnail\">";
			} else if (pv.type == "video") { // UI Decision: Handles videos
				content += "<div class=\"mediaCellContents\"><video controls><source src=\"" +
		   	    pv.videos.standard_resolution.url +
			    "\" type=\"video/mp4\">Your browser does not support the video tag</video>";
			}
			content += "<br><button class=\"btn btn-link\" onclick=\"getRecent(" + 
					   pv.user.id + 
					   ")\">" + 
					   pv.user.username + 
					   "</button>"; 
			if (pv.caption != null) {
				content += pv.caption.text;
			} // UI Decision: Display nothing when there is no caption
			content += "<br>" +
					   convert(pv.created_time) +
					   " " +
					   "<span class=\"glyphicon glyphicon-heart\"></span> " +
					   pv.likes.count +
					   "<br><a href=\"" +
					   pv.link +
					   "\" target=\"_blank\">Instagram</a></div>";
			// UI Decision: Do not have a separate display for tags
			row = table.insertRow(index++);
			row.className = "mediaRow";
			cell = row.insertCell(0);
			cell.innerHTML = content;
			cell.className = "mediaCell";
			content = "";
		}
	}
};

var convert = function(millis) {
	var date = new Date(parseInt(millis) * 1000);
	var hour = date.getHours();
	var ampm = "AM";
	if (hour > 12) {
		ampm = "PM";
		hour = hour - 12;
	} else {
		if (hour == 12) {
			ampm = "PM";
		}
		if (hour == 0) {
			hour = 12;
		}
	}
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	var ret = hour +
			  ":" +
			  minutes + 
			  ampm +
			  " " +
			  (date.getMonth() + 1) +
			  "/" +
			  date.getDate() +
			  "/" +
			  date.getFullYear();
	return ret;
};

var removeFromGroup = function(button) {
	$("#groupMessage")[0].innerHTML = "";
	var cell = button.parentElement;
	var username = cell.children[2].innerHTML;
	$("." + username).remove();
	var nextCell = cell.nextElementSibling;
	nextCell = checkNextRow(cell, nextCell);
	while (nextCell != null) {
		cell.innerHTML = nextCell.innerHTML;
		cell = nextCell;
		nextCell = cell.nextElementSibling;
		nextCell = checkNextRow(cell, nextCell);
	}
	var row = cell.parentElement;
	cell.remove();
	if (row.cells.length < 1) {
		row.remove();
	}
};

var checkNextRow = function(cell, nextCell) {
	if (nextCell == null) {
		var nextRow = cell.parentElement.nextElementSibling;
		if (nextRow != null) {
			return nextRow.cells[0];
		}
	}
	return nextCell;
};

var deleteGroup = function(button) {
	$("#homeMessage")[0].innerHTML = "";
	$("#grouppage")[0].children[1].children[0].outerHTML = "<form onsubmit=\"editGroup()\">" +
				  							   			  "<input type=\"text\" id=\"group\" value=\"\" onfocus=\"this.value = this.value;\"></input>" +
				  							   			  "<input type=\"text\" id=\"p\" value=\"\" hidden></input>" +
				  							   			  "<input type=\"text\" id=\"u\" value=\"\" hidden></input>" +
				  							   			  "<input type=\"text\" id=\"i\" value=\"-1\" hidden></input>" +
				  							   			  "<input type=\"text\" id=\"previous\" value=\"\" hidden></input>" +
				  							   			  "<br><br><input type=\"submit\" class=\"btn btn-md\" value=\"Submit\"></input></form>";
	var cell = button.parentElement.parentElement;
	var groupName = cell.children[0].children[0].id;
	$("#groupMessage")[0].innerHTML = decode(groupName) + " has been deleted.";
	$("#groupMessage")[0].className = "bg-warning";
	$("." + groupName).remove();
	var nextCell = cell.nextElementSibling;
	nextCell = checkNextRow(cell, nextCell);
	while (nextCell != null) {
		cell.innerHTML = nextCell.innerHTML;
		cell = nextCell;
		nextCell = cell.nextElementSibling;
		nextCell = checkNextRow(cell, nextCell);
	}
	var row = cell.parentElement;
	cell.remove();
	if (row.cells.length < 1) {
		row.remove();
	}
	$("#homeMessage")[0].className = "bg-success";
	$("#homeMessage")[0].innerHTML = decode(groupName) + " successfully deleted.";
	window.scrollTo(0, 0);
};

var decode = function(groupName) {
	return groupName.replace(/_/g, " ");
};

var addToMenus = function(groupName) {
	var menus = $("select");
	var menu;
	for (var i = 0; i < menus.length; i++) {
		menu = menus[i];
		menu.innerHTML = menu.innerHTML + "<option class=\"" + encode(groupName) + "\">" + groupName + "</option>";
	}
};

var submitForm = function() {
	event.preventDefault();
	$("#searchMessage")[0].innerHTML = "";
	var choice = $("input:radio[name=type]:checked");
	var table = $("#searchResults")[0];
	if (choice.length > 0) {
		var query = $("#search")[0].value;
		var invalid; // UI Decision: Ensure valid input is given otherwise throw an error
		if (query.length > 0) {
			if (choice[0].value == "people") {
				// query instagram api for users
				invalid = /\?/; // check for question marks
				if (!invalid.test(query)) {
					table.className = "table";
					$.ajax({url: "https://api.instagram.com/v1/users/search?q=" + query + "&access_token=" + access_token, 
							dataType: "jsonp",
							success: handleUsers
					});
				} else {
					$("#searchMessage")[0].className = "bg-danger";
					$("#searchMessage")[0].innerHTML = "Invalid input!";
					window.scrollTo(0,0);
				}
			} else if (choice[0].value == "tags") {
				// query instagram api for media based on tag
				invalid = /[\[\]\\\/~`!@#$%\^&*()\-=+{}\|;':"<>,.? ]/; // regular expression for invalid input
				if (!invalid.test(query)) {
					table.className = "";
					$.ajax({url: "https://api.instagram.com/v1/tags/" + query + "/media/recent?access_token=" + access_token, 
							dataType: "jsonp",
							success: handleMedia
					});
				} else {
					$("#searchMessage")[0].className = "bg-danger";
					$("#searchMessage")[0].innerHTML = "Invalid input!";
					window.scrollTo(0,0);
				}
			} else if (choice[0].value == "places") {
				// query google maps api for latitude and longitude of search query
				invalid = /\?/; // check for question marks
				if (!invalid.test(query)) {
					table.className = "";
					$.ajax({url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + query + "&key=AIzaSyAEl6rZYUeweCN-LTlruBSiWFOPHlC59P8", 
							dataType: "json",
							success: searchOnCoordinates
					});
				} else {
					$("#searchMessage")[0].className = "bg-danger";
					$("#searchMessage")[0].innerHTML = "Invalid input!";
					window.scrollTo(0,0);
				}
			}
		}
	} else {
		$("#searchMessage")[0].className = "bg-warning";
		$("#searchMessage")[0].innerHTML = "Please select a filter.";
		window.scrollTo(0,0);
	}
};

var handleUsers = function(data) {
	var table = $("#searchResults")[0];
	table.innerHTML = "";
	var row;
	var cell;
	// make sure correct data is returned
	if (data.meta.code != 200) {
		$("#searchMessage")[0].className = "bg-danger";
		$("#searchMessage")[0].innerHTML = data.meta.error_message;
		window.scrollTo(0,0);
	} else {
		var users = data.data;
		if (users.length < 1) {
			$("#searchMessage")[0].className = "bg-danger";
			$("#searchMessage")[0].innerHTML = "No results.";
			window.scrollTo(0,0);
		} else {
			var index = 0;
			var rowCount = 0;
			var cellCount;
			var user;
			var content = "";
			var options = getGroups();
			while (index < 20 && index < users.length) { // UI Decision: Handle at most 20 users
				user = users[index];
				content = "<img src=\"" + 
						  user.profile_picture + 
						  "\" class=\"img-circle\"><br><a href=\"https://www.instagram.com/" 
						  + user.username +
						  "\" target=\"_blank\">" + 
						  user.username + 
						  "</a><br><button class=\"btn btn-xs\" onclick=\"getRecent(" + 
						  user.id + 
						  ")\">Recent Uploads</button><br><select onchange=\"addToGroup(this, '" + 
						  user.profile_picture + 
						  "', '" +
						  user.username +
						  "', " + 
						  user.id +
						  ")\"><option selected disabled>Add to Group!</option><option>New Group</option>" +
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
			window.scrollTo(0, 227);
		}
	}
};

var getGroups = function() {
	var groups = $(".groupName");
	var ret = "";
	if (groups.length > 0) {
		var groupName;
		for (var i = 0; i < groups.length; i++) {
			groupName = groups[i].children[0].innerHTML;
			ret += "<option class=\"" + encode(groupName) + "\">" + groupName + "</option>";
		}
	}
	return ret;
};

var addToGroup = function(select, pic, username, id) {
	$("#searchMessage")[0].innerHTML = "";
	$("#userMessage")[0].innerHTML = "";
	var element = "<li class=\"" + 
				  username + 
				  "\" hidden>" +
				  pic +
				  "</li><li class=\"" +
				  username + 
				  "\"><button class=\"btn btn-link\" onclick=\"getRecent(" + 
				  id + 
				  ")\">" + 
				  username +
				  "</button></li><li class=\"" + 
				  username + 
				  "\" hidden>" + 
				  id +
				  "</li>";
	var groupName = select.value;
	if (groupName != "New Group") {
		var messageBox;
		groupName = encode(groupName);
		if (select.parentElement.nodeName == "DIV") {
			messageBox = $("#userMessage")[0];
		} else {
			messageBox = $("#searchMessage")[0];
		}
		if ($("#" + groupName + " ." + username).length < 1) { // if user is not in group
			$("#" + groupName)[0].children[1].innerHTML += element;
			var header = $("#currentGroup");
			if (header.length > 0) {
				if (encode(header[0].innerHTML) == groupName) {
					var content = "<img src=\"" + 
						  		  pic + 
							  	  "\" class=\"img-circle\"><br><a href=\"https://www.instagram.com/" + 
							  	  username +
							  	  "\" target=\"_blank\">" + 
							  	  username + 
							  	  "</a><br><button class=\"btn btn-xs\" onclick=\"getRecent(" + 
							  	  id + 
							  	  ")\">Recent Uploads</button> <button class=\"btn btn-xs\"onclick=\"removeFromGroup(this)\">Remove</button>";
					var table = $("#groupContents")[0];
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
			}
			messageBox.className = "bg-success";
			messageBox.innerHTML = username + " was successfully added to " + decode(groupName) + ".";
		} else {
			messageBox.className = "bg-warning";
			messageBox.innerHTML = username + " already belongs to " + decode(groupName) + ".";
		}
		window.scrollTo(0, 0);
	} else {
		createGroup(pic, username, id);
	}
	select[0].selected = true;
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
		$("#searchMessage")[0].className = "bg-danger";
		$("#searchMessage")[0].innerHTML = "An error occurred with the Google Maps API.";
	}
};

var searchUsers = function() {
	$("#people")[0].checked = true;
	$("#searchResults")[0].innerHTML = "";
	toSearch($("li")[3]);
};