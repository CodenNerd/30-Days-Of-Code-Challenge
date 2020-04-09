const express = require("express");
const { json, urlencoded } = require("body-parser"); // declaring absolute paths before relative paths
const expressRoads = require('./Routers/day-13');
const dromeServer = require('./Routers/day-14');
const sGPACalculator = require('./Routers/day-15');
const authAuth = require('./Routers/day-16');
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
[[[[ -------------------------------IMPORTANT NOTICE--------------------------- ]]]]
[[[[ Because I am using a filesystem as db, I have encryted the content of the  ]]]]
[[[[ day-16_db.txt file. To run the server, you need to include a dot env file  ]]]]
[[[[ and set your own DB_SECRET key. This is necessary so as to secure the      ]]]]
[[[[ content of the db from anyone who gets access to the db files              ]]]]
[[[[ -------------------------------------------------------------------------- ]]]]
[[[[ 09/April/2020                                                              ]]]]
[[[[ Stay Safe, Stay Home --CodenNerd                                           ]]]]
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
*/
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/day-13', expressRoads); // I had to version the APIs so that I don't keep redundant code in the codebase
app.use('/day-14', dromeServer);
app.use('/day-15', sGPACalculator);
app.use('/day-16', authAuth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
