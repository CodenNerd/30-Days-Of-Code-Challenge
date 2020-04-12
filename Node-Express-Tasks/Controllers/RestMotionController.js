const Helper = require('../Helper');    
require('../db/_db');  // just call the db connection file 
const User = require('./../Model/user');

const RestMotion = {
    createUser(req, res){
        const data = req.body;
    
        if (!data || Object.keys(data).length === 0 || data.constructor != Object) return res.status(400).send({'error': 'JSON input cannot be empty '})        
        // validating that input is JSON and is not empty
        
        if (!data.email || !data.username || !data.password) return res.status(400).send({'error': 'you must provide email, username and password'}) 
        // ensure email, username and password are provided   
        if(!Helper.isValidEmail(data.email)) return res.status(400).send({'error': 'invalid email provided'}) 
        // validate email
    
    
        User.findOne({email: data.email}).exec().then((existsEmail)=>{  // Mongo DB leaves no choice than to use a promise. Ion like promises! :(
            if(existsEmail) return res.status(400).send({'error': 'email already exists in DB'})
            User.findOne({username: data.username}).exec().then(existsUsername=>{   
                if(existsUsername) return res.status(400).send({'error': 'username already exists in DB'})
    
                // use bcrypt here
                data.password = Helper.hashPassword(data.password);
                const d = new Date()
                data.date = d.toLocaleDateString();
                data.time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                
                const user = new User(data);
            
                user.save().then((new_user)=>{     
                    // double-checking       
                    if (new_user) return res.status(201).send({'message': 'Sign up completed!'})                    // success
                })
                .catch(error=>{
                    return res.status(500).send({'error': 'Could not sign you up'});      // in case of a server error
                })      
            })  
        })
            
    },
    loginUser(req, res){
        // destructures email and password from data object
        let {email, username, password} = req.body;        
        
        // validate user requests
        if (email)  {       // validate email if it's provided... this is bulkier but it handles set headers after sent error
            if(!Helper.isValidEmail(email)) return res.status(400).send({'error': 'invalid email provided'}) // validate email
        }                       
        const login_obj = email ? {email} : {username} // chooses one depending on what the user logs in with
        // done this way to avoid to much hardcoding

        User.findOne(login_obj).exec().then(async (userDetails)=>{
            const isCorrectCredentials = userDetails && await Helper.comparePassword(userDetails.password, password);
            if (!isCorrectCredentials) return res.status(401).send({'error': 'invalid login details'})  // use bcrypt here instead to compare
            
            // sign the email here - jwt
            const token = Helper.generateToken(userDetails.email);

            return res.status(200).send({
                "message": `Logged in as ${userDetails.email}`,
                 token
            });
        }).catch(err=>{
            return res.status(500).send({'error': 'Could not log you in'});      // to avoid cyclic dependency
        })
    },
    getUser(req, res){ // authentication of user done with an Auth middleware
        const {email} = req.body;
    
                                            // I only needed to tweak the previous implementation to fit it to Mongo's
        User.findOne({email}).exec().then(requestedUser=>{
            if(!requestedUser) return res.status(404).send({ "message": "user not found"})
    
            return res.status(200).send({
                _id: requestedUser.id,
                email: requestedUser.email,
                username: requestedUser.username,
                date: requestedUser.date,
                time: requestedUser.time
            })
        }).catch(err=>{
            return res.status(500).send({'error': 'Could not get user. It\'s our fault, not yours'});      // to avoid cyclic dependency
        })
    },
    getUsers(req, res){
                // I only needed to tweak the previous implementation to fit it to Mongo's
        User.find().exec().then(requestedUsers=>{
        if(!requestedUsers) return res.status(404).send({ "message": "no user found"})

            const allUsers = [];
        requestedUsers.forEach(requestedUser=>{
            allUsers.push({
            _id: requestedUser.id,
            email: requestedUser.email,
            username: requestedUser.username,
            date: requestedUser.date,
            time: requestedUser.time
            })
        })
            return res.status(200).send(allUsers)
        }).catch(err=>{
            return res.status(500).send({'error': 'Could not get users. It\'s our fault, not yours'});      // to avoid cyclic dependency
        })
    },

    updateUser(req, res){
        const {email, username} = req.body;
    
        User.findOne({email}).exec().then(userWithEmail=>{      // ensure that we're update won't lead to redundancy
            if (userWithEmail) return res.status(400).send({"error": "you can't update to an email an existing user uses"})
            User.findOne({username}).exec().then(userWithUsername=>{
                if (userWithUsername) return res.status(400).send({"error": "you can't update to a username an existing user uses"})
            
                User.findOne({_id: req.params.userId}).exec().then(requestedUser=>{
                if(!requestedUser) return res.status(404).send({ "message": "user not found"})
                    if(email) requestedUser.email = email;
                    if(username) requestedUser.username = username;
                                            // only email and username can be update
                    return res.status(200).send({
                        _id: requestedUser.id,
                        email: requestedUser.email,
                        username: requestedUser.username,
                        date: requestedUser.date,
                        time: requestedUser.time
                    })
                }).catch(err=>{
                    return res.status(500).send({'error': 'Could not get user. It\'s our fault, not yours', err});      // to avoid cyclic dependency
                })
            })
        })
    },

    deleteUser(req, res){
        User.findByIdAndRemove({_id: req.params.userId}).exec().then(()=>{
            return res.status(200).send({message: "user deleted succesfully"})
        }).catch(err=>{
            return res.status(500).send({error: "error deleting user", err})
        });
    }

}

module.exports = RestMotion;