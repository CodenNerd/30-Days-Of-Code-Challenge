const express = require("express");
const { json, urlencoded } = require("body-parser"); // declaring absolute paths before relative paths
const Helper = require('./Helper');     // I chose to use a filesystem because using a db would have been too farfetched for a minimal implementation like this
const expressRoads = require('./Routers/day-13');
const dromeServer = require('./Routers/day-14');
const sGPACalculator = require('./Routers/day-15');
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
[[[[ 07/March/2020                                                              ]]]]
[[[[ Stay Safe, Stay Home --CodenNerd                                           ]]]]
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
*/
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/day-13', expressRoads); // I had to version the APIs so that I don't keep redundant code in the codebase
app.use('/day-14', dromeServer);
app.use('/day-15', sGPACalculator);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
