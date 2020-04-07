const { Router, json } = require('express');
const Helper = require('../Helper');     // I chose to use a filesystem because using a db would have been too farfetched for a minimal implementation like this


const api = Router();
 api.use(json());

api.post('/createdata', (req, res)=>{
    const data = req.body;

    if (!data || Object.keys(data).length === 0 || data.constructor != Object) return res.status(400).send({'error': 'JSON input cannot be empty '})        
    // validating that input is JSON and is not empty
    
    Helper.persistData(JSON.stringify(data), saved=>{       // I created an Helper object just to make things neater
        if (!saved) return res.status(500).send({'error': 'Could not save data'}); // in case of a server error
        return res.status(201).send({'message': 'Data saved!'})     // success
    })
});

api.get('/getdata', (req, res)=>{
   Helper.readData((data)=>{
    if (!data) return res.status(404).send({'error':'Could not retrieve any content'});
        try {
            data = JSON.parse(data.toString())  // content it's retrieving must be parseable to JSON
        } catch (error) {
            return res.status(404).send({'error':'Could not retrieve any content'});
        }
       return res.status(200).send(data);
   })
})

module.exports = api;