
const express = require('express')
const app = express();
const port = 8000;
const http = require('http')
const fs = require('fs')
const mongoose = require('mongoose')
const Employee = require('./models/employee')
const bodyParser = require('body-parser')
// Our Employees are going to be kept in a collection in the EmployeeRoster table
// in a Mongodb cluster
app.use(bodyParser.urlencoded({ extended: true }));
const uri = "mongodb+srv://user:pass@cluster0.cdcof.mongodb.net/EmployeeRoster?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((res) => {
        console.log('Connected to the Employee database on port ' + port);
        // we don't want anything to start listening until we have connected 
        // to the database (to prevent errors) so we call listen 
        // once we have a successful connection
        app.listen(port)
    }).catch((err) => console.log("There is an error with connection"))

app.use("/bootstrap.min.css", express.static('./static/bootstrap.min.css'));
app.use("/dashboard.css", express.static('./static/dashboard.css'));
app.use("/bootstrap.min.js", express.static('./static/bootstrap.min.js'));
app.use("/popper.min.js", express.static('./static/popper.min.js'));
app.use("/signin.css", express.static('./static/signin.css'));
// our home page. Here we are getting the 
// Employee listings from the mongodb database and then listing them 
// through out index.ejs file
app.get('/', function (req, res, next) {
    Employee.find()
        .then(result => {
            return res.render('index.ejs', { employees: result })
        })
        .catch(err => console.log(err))

})

app.get('/login', function (req, res, next) {
    return res.render('login.ejs')
})

// This is an upvote function which will increase the upvotes on the Employee by 1
app.post("/index/upvote/:id", function (req, res) {
    Employee.findById(req.params.id, function (err, theUser) {
        if (err) {
            console.log(err);
        } else {
            theUser.upvotes += 1;
            theUser.save();
            res.send({ likeCount: theUser.upvotes }); //something like this...
        }
    });
});

// This function will increase the downvotes on an Employee by 1
app.post("/index/downvote/:id", function (req, res) {
    console.log(req.params)
    Employee.findById(req.params.id, function (err, theUser) {
        if (err) {
            console.log(err);
        } else {
            theUser.downvotes += 1;
            theUser.save();
            res.send({ likeCount: theUser.downvotes }); //something like this...
        }
    });
});

// add charts

app.post("/index/delete/:id", function (req, res) {
    Employee.findByIdAndRemove(req.params.id, (err, todo) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (todo == null) {
            alert("This user has already been deleted. Please reload this page")
        }
        else {
            const response = {
                message: "Employee successfully deleted",
                id: todo._id,
                status: 200
            };
            return res.status(200).send(response);
        }
    });
});

app.get('/create', function (request, response) {
    response.render('./create.ejs');
});

app.post('/create', (req, res) => {
    const full_name = req.body.first_name + " " + req.body.last_name
    console.log(full_name)
    const emp = new Employee({
        full_name: full_name,
        title: req.body.position,
        bio: "",
        image: "",
        upvotes: 0,
        downvotes: 0,
        address: req.body.inputAddress + " " + req.body.inputAddress2 + " " + req.body.inputCity + " " + req.body.inputState + " " + req.body.inputZip,
        email: req.body.email
    });

    var employee = new Employee(emp);
    employee.save(function (err, example) {
        if (err) {
            console.log(err)
        }
        else {

            console.log("New employee created " + emp.full_name);
            res.redirect('/')
        }
    });
});

app.post('/login', (req, res) => {
    console.log(req.body)
    Employee.find({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(err);
        }
    }).then(result => {
        if (result.length == 1) {
            res.redirect('/')
        }
        else {
            res.redirect('/login')
        }
    })
});

app.get('/edit/:id', function (request, response) {
    response.render('./edit.ejs');
});

app.post('/:id', function (request, response) {
    console.log(request.params.id + '\n');
    Employee.findById(request.params.id, function (err, theUser) {
        if (err) {
            console.log(err);
        } else {
            response.employee_get = theUser;
            response.status(200).send({ employee_get: theUser }); //something like this...
            console.log(response.employee_get);
            return response;
        }

    });
});