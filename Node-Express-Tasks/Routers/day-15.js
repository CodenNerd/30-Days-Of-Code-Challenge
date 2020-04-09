const { Router, json } = require('express');
const Helper = require('../Helper');     // I chose to use a filesystem because using a db would have been too farfetched for a minimal implementation like this


const api = Router();
api.use(json());

api.post('/createdata', (req, res)=>{
    const data = req.body;

    if (!data || Object.keys(data).length === 0 || data.constructor != Object) return res.status(400).send({'error': 'JSON input cannot be empty '})        
    // validating that input is JSON and is not empty
    try {
        data.courses[0]
    } catch (error) {
        return res.status(400).send({'error': 'courses property must be an array'}) // ensure courses property array has atleast an element   
    }
    if(Object.keys(data.courses[0]).length === 0 || data.courses[0].constructor != Object) return res.status(400).send({'error': 'you have input data in a wrong format - use [{}] format for courses'}) 
    // validate again that what is in the array is an object i.e [{}] -- if not this format, bad request error

    Helper.persistData('./db/day-15_db.txt', JSON.stringify(data), saved=>{        // I created a Helper object just to make things neater
        if (!saved) return res.status(500).send({'error': 'Could not save data'}); // in case of a server error
        return res.status(201).send({'message': 'Data saved!'})                    // success
    })
});

api.get('/getdata', (req, res)=>{
   Helper.readData('./db/day-15_db.txt', (data)=>{
    if (!data) return res.status(404).send({'error':'Could not retrieve any content'});
        try {
            data = JSON.parse(data.toString())  // content it's retrieving must be parseable to JSON
        } catch (error) {
            return res.status(404).send({'error':'Could not retrieve any content'});
        }

        let {courses} = data;                   // destructures courses from data object
        const sgpa = {
            "sgpa": Helper.calculateSGPA(courses)
        }
       return res.status(200).send(sgpa);
   })
})

module.exports = api;