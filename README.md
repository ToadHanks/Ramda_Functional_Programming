Project Proposal
-----------------
Dr. William Oropallo (Former Instructor I at the University of South Florida)

Author
-------
Mihir Patel   

Description
-------------   
This program is made for practicing pure functional programming. My functions will be operating on  JSON files, retrieved from the Flickr public API for images containing the tags dogs (dogs.json) and landscapes (landscapes.json). These are some functions that uses flickr data:

1) **imageCount(flickrData)**   
   - This function will return the number of images contained in the Flickr JSON data. The "items" property of the JSON holds a collection of objects that have the images data.   

2) **alphaNumericTagsUniq(flickrData)**    
    - This function will return an array of all the unique alphanumeric tags for all the images contained in the Flickr JSON data after transforming the tags to lower case. The tags returned by this method should first be checked to see if they are alphanumeric (A - Z upper/lowercase and 0 - 9), then made lowercase, then only the unique tags should be returned in the final array, sorted. The "items" property of the JSON holds a collection of objects that have the images data.     

3) **nonAlphaNumericTags(flickrData)**    
     - This function will return all non-alphanumeric tags (all letters other than A - Z upper/lowercase and 0 - 9) for all the images contained in the Flickr JSON data. This method does not sort, change case, or check for uniqueness. The "items" property of the JSON holds a collection of objects that have the images data. 

4) **avgTitleLength(flickrData)**    
     - This function will return a float with the average title length (in characters, including whitespace) of all the images contained in the Flickr JSON data. The "items" property of the JSON holds a collection of objects that have the images data.   

5) **commonTagByRank(n)(flickrData)**    
     - Turn the most common (frequently occurring) tag of rank n for all the images contained in the Flickr JSON data. Calling this functions with an n of 0 returns the most common tag, and calling it with an n of 2 returns the 3rd most common tag. The "items" property of the JSON holds a collection of objects that have the images data. 

6) **oldestPhotoTitle(flickrData)**    
   - This function will return the title of the oldest photo taken for all of the images contained in the Flickr JSON data. The “date_taken” property determines the age of the photo. The "items" property of the JSON holds a collection of objects that have the images data.    

I have used Ramda-> [here](https://ramdajs.com) and Javascript to implement the functions above. Each of these functions are  made up of smaller more module functions. 

npm and Node.js
---------------
To work on this program, Node.js can be used. Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. You can install Node.js by downloading the package [at](https://nodejs.org/). After installing, you will have both Node and the Node Package Manager (npm). npm is a package manager for the JavaScript programming language and can be used to manage workspaces, install dependencies, and many other features.    
After downloading the project files for this project, you will need to run the command ‘npm install’ from the directory with an active internet connection. The install command will install all dependencies of the project (like Ramda and others) so that you can start writing code. To run this project, you will type ‘node app.js’, which will run the file app.js that contains all of your code and the test code for this project.     
Node.js and npm are powerful and useful tools that I highly suggest you read up on for your careers in and out of USF. Here is a playlist on YouTube with some videos about npm if you are interested. It is a little dated, but the messages are still useful: [YouTube Playlist](https://www.youtube.com/watch?v=6fj0cpmMiVg&list=PLC3y8-rFHvwhgWwm5J3KqzX47n7dwWNrq)
    
Examples   
--------   
The testing section of the app.js file shows examples of the functions in use. The makePromiseTest function is purely used to test your code. 
