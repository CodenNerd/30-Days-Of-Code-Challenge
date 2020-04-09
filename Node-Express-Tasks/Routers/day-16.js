const { Router, json } = require('express');
const Helper = require('../Helper');     // I chose to use a filesystem because using a db would have been too farfetched for a minimal implementation like this


const api = Router();
api.use(json());

api.post('/signup', (req, res)=>{
    const data = req.body;

    if (!data || Object.keys(data).length === 0 || data.constructor != Object) return res.status(400).send({'error': 'JSON input cannot be empty '})        
    // validating that input is JSON and is not empty
    
    if (!data.email || !data.username || !data.password) return res.status(400).send({'error': 'you must provide email, username and password'}) 
    // ensure email, username and password are provided   
    if(!Helper.isValidEmail(data.email)) return res.status(400).send({'error': 'invalid email provided'}) 
    // validate email

    Helper.readData('./db/day-16_db.txt', (db)=>{
        
        try {
            db = Helper.decryptDBData(db.toString()); // if error, it means data in db isn't encrypted and that's bad
            db = JSON.parse(db.toString())  // content it's retrieving must be parseable to JSON
        } catch (error) {
            db = [];  // if an error is thrown, then the db either is empty or contains invalid data, replace with []
        }
        // if db is empty, assign it an empty array

        if(Helper.findEmailInDB(db, data.email)) return res.status(400).send({'error': 'email already exists in DB'})

        // use bcrypt here
        data.password = Helper.hashPassword(data.password);
        db.push(data)       // works like MongoDB [always push to existing db data]
        
                                                    // encryption of db data for security
        Helper.persistData('./db/day-16_db.txt', Helper.encryptDBData(JSON.stringify(db)), saved=>{        // Hence, new signup data is always added to already existing data
        if (!saved) return res.status(500).send({'error': 'Could not save data'});      // in case of a server error
        return res.status(201).send({'message': 'Sign up completed!'})                    // success
         })
    })
    
});

api.post('/login', (req, res)=>{
    
        // destructures email and password from data object
        let {email, password} = req.body;
        // validate user requests
        if(!Helper.isValidEmail(email)) return res.status(400).send({'error': 'invalid email provided'}) 
        // validate email

        Helper.readData('./db/day-16_db.txt', async (data)=>{
            try {
                data = Helper.decryptDBData(data.toString()); // if error, it means data in db isn't encrypted and that's bad
                data = JSON.parse(data.toString())  // content it's retrieving must be parseable to JSON
            } catch (error) {
                return res.status(500).send({'error':'Our server has temporarily crashed: could not log you in.'});
            }

            const userDetails = Helper.findEmailInDB(data, email);
            const isCorrectCredentials = userDetails && await Helper.comparePassword(userDetails.password, password);
            if (!isCorrectCredentials) return res.status(401).send({'error': 'invalid login details'})  // use bcrypt here instead to compare
            
            return res.status(200).send({
                "message": `Logged in as ${email}`
            });
        })
})

module.exports = api;