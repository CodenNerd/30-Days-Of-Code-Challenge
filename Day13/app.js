const express = require("express");
const { json, urlencoded } = require("body-parser"); // declaring absolute paths before relative paths
const Helper = require('./Helper');     // I chose to use a filesystem because using a db would have been too farfetched for a minimal implementation like this

const app = express();
/*
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
[[[[ NOTE:                                              ]]]]
[[[[ The persisted data is in ./db/db.txt               ]]]]
[[[[ Ensure you set the content-type header in Postman  ]]]]
[[[[ Content-Type: application/json                     ]]]]
[[[[ 07/March/2020                                      ]]]]
[[[[ Stay Safe, Stay at Home --CodenNerd                ]]]]
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
*/

app.use(json());
app.use(urlencoded({ extended: false }));


app.post('/createdata', (req, res)=>{
    const data = req.body;

    if (!data || Object.keys(data).length === 0 || data.constructor != Object) return res.status(400).send({'error': 'JSON input cannot be empty '})        
    // validating that input is JSON and is not empty
    
    Helper.persistData(JSON.stringify(data), saved=>{       // I created an Helper object just to make things neater
        if (!saved) return res.status(500).send({'error': 'Could not save data'}); // in case of a server error
        return res.status(201).send({'message': 'Data saved!'})     // success
    })
});

app.get('/getdata', (req, res)=>{
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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
