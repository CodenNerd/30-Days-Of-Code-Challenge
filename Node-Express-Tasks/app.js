const express = require("express");
const { json, urlencoded } = require("body-parser"); // declaring absolute paths before relative paths
const expressRoads = require('./Routers/day-13');
const dromeServer = require('./Routers/day-14');
const sGPACalculator = require('./Routers/day-15');
const authAuth = require('./Routers/day-16');
const authAuthII = require('./Routers/day-17');
const mongoBoss = require('./Routers/day-18');
const restMotion = require('./Routers/day-19');
const softroleum = require('./Routers/softroleum/items');
const app = express();
/*
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
[[[[ NOTE:                                                                      ]]]]
[[[[ The persisted data is in ./db folder                                       ]]]]
[[[[ Ensure you set the content-type header in Postman                          ]]]]
[[[[ Content-Type: application/json                                             ]]]]
[[[[ Also, I refactored Day-13 code, you can now access the routes as below     ]]]]
[[[[ Day-13 ==> localhost:3000/day-13/getdata                                   ]]]]
[[[[ Day-14 ==> localhost:3000/day-14/getdata                                   ]]]]
[[[[ Day-15 ==> localhost:3000/day-15/getdata                                   ]]]]
[[[[ Day-16 ==> localhost:3000/day-16/signup                                    ]]]]
[[[[ Day-17 ==> localhost:3000/day-17/auth/signup                               ]]]]
[[[[ Day-17 ==> localhost:3000/day-17/auth/login                                ]]]]
[[[[ Day-17 ==> localhost:3000/day-17/getuser                                   ]]]]
[[[[ -------------------------------IMPORTANT NOTICE--------------------------- ]]]]
[[[[ Observe that I have added a /auth route to login and signup. Don't forget  ]]]]
[[[[ to add a .env file and write a SECRET=secret_of_your_choice. I have        ]]]]
[[[[ retained the files from previous challenges in my code base only for       ]]]]
[[[[ the records.                                                               ]]]]
[[[[ -------------------------------------------------------------------------- ]]]]
[[[[ 09/April/2020                                                              ]]]]
[[[[ Stay Safe, Stay Home --CodenNerd                                           ]]]]
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
*/
app.use(json());
app.use(urlencoded({ extended: false }));
// app.use('/day-13', expressRoads); // I had to version the APIs so that I don't keep redundant code in the codebase
// app.use('/day-14', dromeServer);
// app.use('/day-15', sGPACalculator);
// app.use('/day-16', authAuth);
// app.use('/day-17', authAuthII);
// app.use('/day-18', mongoBoss);
// app.use('/day-19', restMotion);
app.use('/softroleum/core', softroleum);

app.get('/', (req, res)=>{
    return res.send({message: 'nice'})
})

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
