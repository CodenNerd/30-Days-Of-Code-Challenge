const { Router, json } = require('express');
const { request } = require('../../app');
const Helper = require('../../Helper');     // I chose to use a filesystem because using a db would have been too farfetched for a minimal implementation like this


const api = Router();
api.use(json());

api.post('/items', (req, res)=>{
    const item = req.body;
    if (!item || Object.keys(item).length === 0 || item.constructor != Object) return res.status(400).send({'error': 'JSON input cannot be empty '})        
    // validating that input is JSON and is not empty
    
    Helper.readData('./db/softroleum/items.txt', (data)=>{    
            if ((data.filter((d)=>d.id===item.id).length)) return res.status(400).send({'error': 'item already exists'})
            
            data.push(item)
            Helper.persistData('./db/softroleum/items.txt', Helper.encryptDBData(JSON.stringify(data)), saved=>{        
                if (!saved) return res.status(500).send({'error': 'Could not save data'}); 
                return res.status(201).send({'message': 'Data saved!', items: data})
            })
       })    
});

api.get('/items', (req, res)=>{
   Helper.readData('./db/softroleum/items.txt', (data)=>{
    if (!data) return res.status(404).send({message: 'empty database'});                      
       return res.status(200).send(data);
   })
})

api.put('/items/:id', (req, res)=>{
    const updatedata = req.body;

            if (!updatedata || Object.keys(updatedata).length === 0 || updatedata.constructor != Object) return res.status(400).send({'error': 'JSON input cannot be empty '})        
            // validating that input is JSON and is not empty

    Helper.readData('./db/softroleum/items.txt', (data)=>{
        if (!data) return res.status(200).send({message: 'no data'});
            
                        
            const item = data.filter((d)=>d.id===req.params.id)

            

            data.map(d=> {
                if (d.id === req.params.id) {
                    for (const key in updatedata) {
                        console.log(key);
                        if(key==='id') continue;
                        d[key] = updatedata[key]
                    }
                }
            })
           Helper.persistData('./db/softroleum/items.txt', Helper.encryptDBData(JSON.stringify(data)), saved=>{        // I created a Helper object just to make things neater
                if (!saved) return res.status(500).send({'error': 'Could not save data'}); // in case of a server error
                return res.status(201).send({'message': 'updated!'})                    // success
            })

       })
});

module.exports = api;