console.log(1);
const express = require("express");
const { json, urlencoded } = require("body-parser"); // declaring absolute paths before relative paths
const Helper = require('./Helper');     // I chose to use a filesystem because using a db would have been too farfetched for a minimal implementation like this
const expressRoads = require('./Routers/day-13');
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
[[[[ 07/March/2020                                                              ]]]]
[[[[ Stay Safe, Stay at Home --CodenNerd                                        ]]]]
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
*/
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/day-13', expressRoads);

console.log(2);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
