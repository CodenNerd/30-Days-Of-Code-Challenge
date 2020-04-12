const { Router, json } = require('express');
const Auth = require('./../Middleware/Auth');
const RestMotionController = require('./../Controllers/RestMotionController');
const api = Router();
api.use(json());
/*
        --------------------------------------------------------
    {{{{{  So I kinda just tidied things up with a controller }}}}}
        --------------------------------------------------------

*/        

api.post('/auth/signup', RestMotionController.createUser);

api.post('/auth/login', RestMotionController.loginUser);

api.get('/getuser', Auth, RestMotionController.getUser)

api.get('/users', Auth, RestMotionController.getUsers)

api.patch('/users/:userId', Auth, RestMotionController.updateUser)

api.delete('/users/:userId', Auth, RestMotionController.deleteUser)

module.exports = api;
