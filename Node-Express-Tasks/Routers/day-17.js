const { Router, json } = require('express');
const Helper = require('../Helper');     // I chose to use a filesystem because using a db would have been too farfetched for a minimal implementation like this
const Auth = require('./../Middleware/Auth');

const api = Router();
api.use(json());

api.post('/auth/signup', (req, res)=>{
    const data = req.body;

    if (!data || Object.keys(data).length === 0 || data.constructor != Object) return res.status(400).send({'error': 'JSON input cannot be empty '})        
    // validating that input is JSON and is not empty
    
    if (!data.email || !data.username || !data.password) return res.status(400).send({'error': 'you must provide email, username and password'}) 
    // ensure email, username and password are provided   
    if(!Helper.isValidEmail(data.email)) return res.status(400).send({'error': 'invalid email provided'}) 
    // validate email

    Helper.readData('./db/day-17_db.txt', (db)=>{
        if(Helper.findEntryInDB(db, 'email', data.email)) return res.status(400).send({'error': 'email already exists in DB'})
        if(Helper.findEntryInDB(db, 'username', data.username)) return res.status(400).send({'error': 'username already exists in DB'})

        // use bcrypt here
        data.password = Helper.hashPassword(data.password);
        const d = new Date()
        data.date = d.toLocaleDateString();
        data.time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        db.push(data)       // works like MongoDB [always push to existing db data]
        
                                                    // encryption of db data for security
        Helper.persistData('./db/day-17_db.txt', Helper.encryptDBData(JSON.stringify(db)), saved=>{        // Hence, new signup data is always added to already existing data
        if (!saved) return res.status(500).send({'error': 'Could not save data'});      // in case of a server error
            return res.status(201).send({'message': 'Sign up completed!'})                    // success
        })
    })
    
});

api.post('/auth/login', (req, res)=>{
        // destructures email and password from data object
        let {email, username, password} = req.body;        
        
        // validate user requests
        const validateEmail = ()=>{
            if(!Helper.isValidEmail(email)) return res.status(400).send({'error': 'invalid email provided'}) // validate email
        }
        const loginMode = email ? validateEmail() || ['email', email] : ['username', username];
        
        Helper.readData('./db/day-17_db.txt', async (data)=>{
            const userDetails = Helper.findEntryInDB(data, loginMode[0], loginMode[1]);
            const isCorrectCredentials = userDetails && await Helper.comparePassword(userDetails.password, password);
            if (!isCorrectCredentials) return res.status(401).send({'error': 'invalid login details'})  // use bcrypt here instead to compare
            
            // sign the email here - jwt
            const token = Helper.generateToken(userDetails.email);

            return res.status(200).send({
                "message": `Logged in as ${loginMode[1]}`,
                 token
            });
        })
})

api.get('/getuser', Auth, (req, res)=>{ // authentication of user done with an Auth middleware
    const {email} = req.body;

    Helper.readData('./db/day-17_db.txt', db=>{
        const requestedUser = Helper.findEntryInDB(db, 'email', email);
        if(!requestedUser) return res.status(404).send({ "message": "user not found"})

        return res.status(200).send({
            email: requestedUser.email,
            date: requestedUser.date,
            time: requestedUser.time
        })
    })
    
})

module.exports = api;