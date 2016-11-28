#RESTful Routing

Name        Path                HTTP Verb       Purpose
==============================================================================================================================
Index       /index              GET             List all elements
New         /index/new          GET             Show a for to create a new element
Create      /index              POST            Create a new element, based in the form, then redirect to the index page
Show        /index/:id          GET             Show info about the one especific element, based on it's id
Edit        /index/:id/edit     GET             Show edit form for the especific elements
Update      /index/:id          PUT             Update a particular element, based on the edit form, then redirect to the index
Destroy     /index/:id          DELETE          Delete a particular element, then redirect to the index