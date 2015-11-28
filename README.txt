InstaGroups
-----------
Padraic Michael Quinn
pmq2101
pmq2101@columbia.edu

There are no special instructions to run my application, simply open
up index.html and explore. I tested on a Google Chrome browser. The 
application also works on Safari. Those are the two browsers I have 
on my computer.

I went for an elegant minimalist design with my project. The goal was
to have an extremely functional application that was very easy to 
navigate without much instruction. Any data displayed is only done so
on the relevant page so users know exactly where to find whatever they
may be looking for.All of the pages are designed with that in mind. 
There is also a ton of error checking to ensure that the user cannot 
possibly break the user interface. Some of my design decisions are 
commented into my code. I will try to give a more comprehensive list 
below:

-> Start on page with groups listed because the purpose of the app is
   to create group functionality for Instagram.
-> Single button with plus sign to create a new group as part of 
   minimalist design. Success message is displayed afterwards.
-> Groups simply display their title and links connected to the 
   username that directs you to recent uploads on the user page to 
   ensure data is displayed in a minimalist fashion on the correct page.
-> Groups have two buttons, one to view/edit a group that brings the
   user to the single group display page and one to delete the group, 
   which gives a success message on success. Again the view/edit 
   button route the user to another page to stay with the minimalist 
   design and make sure data is displayed in the right place.
-> Delete button returns a success message.
-> Color scheme is similar to Instagram's but very unassuming to 
   ensure actual media stands out.
-> Group page displays the current group being viewed and all of its
   members. It is updated in real time as members are added to ensure
   there is no dissonance between what the user believes to be in the
   group and what is actually in the group.
-> The group title is displayed at the top of the page and is clickable.
   On a click it turns into a textbox that can be used to change the
   group name. It is outlined when the mouse hovers over it. This is 
   all so the user can easily understand how to change a group's name.
   Again this change is reflected on all of the other pages.
-> The users displayed on the group page simply have a link to their
   Instagram page, as well as buttons for their recent uploads and 
   to delete them from the group. The delete button does not give a 
   success message unlinke other buttons because the change can be
   seen right on that page.
-> Links to Instagram all open on a new page to preserve the session.
-> The Instagram user page initially has a button that brings the user 
   to the search page. It automatically selects the people radio button
   for ease of use.
-> When the recent uploads button is clicked the last 20 uploads from
   the user are displayed. Everything that is required in the assignment
   is displayed. The username serves as the label for the caption. If
   there is no caption nothing is displayed directly after the username.
   Then the time and likes are displayed, separatde by a heart icon. 
   Finally, a link to that Instagram post is displayed. There are no 
   labels to go along with the minimalist design but it is clear what
   each part of the cell does.
-> A separate display for up to 5 tags is not displayed. This was a UI
   decision and not a lack of functionality. Oftentimes the tags were
   already in the caption and I did not want to list them twice and go
   against the minimalist design. I also did not want to have to use a 
   separate label to explain that these were tags and not part of the
   caption or anything else.
-> I chose to add the added functionality of handling videos. Videos
   often come up in media and location searches and I did not want that
   to break my application.
-> The navbar sticks to the top so the user always knows where they are.
-> The search page has a centered form where the user can decide what
   they want to search for. Users are displayed in a grid but media
   is displayed in a timeline as on the recent uploads page. The reason
   for this is that users are returned by relevance but media is returned
   by a timestamp. I wanted to give the media portion an Instagram
   timeline feel to make the users feel comfortable with the interface.
-> The users in the results have a link to their Instagram, a button for 
   their recent uploads and a dropdown menu to add them to a group. On 
   success or failure a message is displayed on the top of the page.
-> On search success or failure a message is displayed at the top of the
   page. The search form does a ton of error handling to ensure the 
   application does not crash.
-> On a media search, each result has the same data as is displayed on
   an individual user's recent uploads timeline, as well as a link to
   the recent uploads page. This goes with the minimalist design because 
   whether the Instagram post being displayed is based on a user or 
   based on a tag or location, it is still the exact same type of data
   and thus should be displayed the same.
-> On user searches the page autoscrolls to where the results start, 
   again with simplicity for the user in mind.
-> It is impossible to view the recent media of private users but my
   user interface handles this. It simply displays the API error 
   message that is returned as it does any time an API error is
   returned.
-> The titles in the navbar are icons to go along with the minimalist
   design but each is very clear as to what it represents.