const jwt = require('jsonwebtoken');
const Helper = require('./../Helper');

const Auth = {

  async verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    token = token ? token.split(" ") : '';      // in a bid to avoid undefined error
    token = token[0] === "Bearer" && token[1]; // returns false if condition 1 is not met
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET);
        Helper.readData('./db/day-17_db.txt', db=>{
            const user = Helper.findEntryInDB(db, 'email', decoded.email);
            if (!user || !user.email) {
                return res.status(400).send({ "error": 'The token you provided is invalid' });
            }
            req.user = { email: user.email };
            next(); // if successful, calls the next middleware 
        })
      
    } catch (error) {
        return res.status(400).send({
             "error": 'The token you provided is invalid' 
        });
    }
    return res;
  },
};

module.exports = Auth.verifyToken;