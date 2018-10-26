var db = require("../models");
var bcrypt = require("bcrypt");

module.exports = app => {

    //Retrieves all users in the database
    app.get("/api/users", (req, res) => {
        db.User.findAll({}).then(result => {
            res.json(result);
        });
    });

    //Retrieves the user searching by email and ensures the passwords match
    app.post("/api/users/login", (req, res) => {
        var users = [];
     
        db.User.findAll({
                where: {
                    email: req.body.email
                }
            }).then(result => {
            //users = JSON.parse(JSON.stringify(result));
            console.log(result);

            if (!result||!result.length){
                res.json({error:true});
            }         
            else if (bcrypt.compareSync(req.body.password, result[0].password)) {
                    return res.json(result[0]);
            }
            else
            {
                res.json({error:true});
            }
            
           
        });
    });

    // Creates a user, ensures that passwords match when making a new user. 
    // Hashing is completed using the bcrypt NPM package. 
    // Checks to see if that specific email has been used before in a sign-in.
    app.post("/api/users", (req, res) => {
        var password = "";
        var confirmPassword = "";

        createUser = pass => {
            db.User.findOrCreate({
                where: {
                    email: req.body.email
                },
                defaults: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: pass
                }
            }).then(result => {
                var created = result[1];
                if (created) {
                    res.json(result[0]);
                } else {
                    //Throw new Error
                    res.status(400).send("That email has already been used!");
                }
            });
        };
        
        hashing = () => {
            var saltRounds = 10;
            var salt = bcrypt.genSaltSync(saltRounds);
            var password = bcrypt.hashSync(req.body.password, salt);
            createUser(password);
        };

        if (req.body.password !== req.body.confirmPassword) {
            throw new Error("Passwords must match!");
        } else {
            hashing();
        }
    });

    
};