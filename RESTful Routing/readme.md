#RESTful Routing
    
Name        Path                HTTP Verb       Purpose                                                                                 Mongoose Method
================================================================================================================================================================
Index       /index              GET             List all elements                                                                       Dog.find()
New         /index/new          GET             Show a for to create a new element                                                      N/A
Create      /index              POST            Create a new element, based in the form, then redirect to the index page                Dog.create()
Show        /index/:id          GET             Show info about the one especific element, based on it's id                             Dog.findById()
Edit        /index/:id/edit     GET             Show edit form for the especific elements                                               Dog.findById()    
Update      /index/:id          PUT             Update a particular element, based on the edit form, then redirect to the index         Dog.findByIdAndUpdate()
Destroy     /index/:id          DELETE          Delete a particular element, then redirect to the index                                 Dog.findByIdAndRemove()