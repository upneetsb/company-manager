# company-manager

This project is my take on a company HR system. This system allows a master user (currently working on the ranking system) to perform administrative tasks on the 
employee records at the company. 

## Install Instructions

1. Clone the directory
2. Run the command 'node app.js'
3. Open the web browser and navigate to http://localhost:8000/
4. Play around with the features!

## Technical Description

Tech Stack
**Frontend**
1. HTML/CSS
2. Bootstrap
3. ejs
4. ReactJS

**Backend**
1. NodeJs
2. MongoDB


For the front end I used a basic Bootstrap template and wrote expressJS code to allow me to include dynamic and changing data (for example employee records) which
are consistently changing

For the backend, I wanted to implement a NoSQL database and therefore chose MongoDB. I chose it because in the future I can see this being used for companies with
many emplopyees. This means my backend solution needs to be scalable. MongoDB provides that as an advantage. Also the easy JSON like structure of store documents 
allows for easy debugging and viewing of document records.

I used NodeJs to help connect to the mongoDB cluster and perform CRUD operations on the documents in the collection. I chose it because I have good expirience with 
it and it allowed for effortless event handling and server start.
