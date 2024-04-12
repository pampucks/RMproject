const jwt = require("jsonwebtoken");
const secretKey = `t3stFulst4ck`;
const constant = require("./constant");


module.exports = class UtilService {
    
    static tokenGenerator(user) {
        let userData = user[0]
        const { id, username, password, role } = userData;
        console.log("ini user", id, username, password, role);


        return "Bearer " + jwt.sign({
            // _id,
            // idlogin,
            id,
            username,
            password,
            role
        },
            secretKey,
            { expiresIn: '24h' }
        );
    };

    static tokenVerifier(token) {
        return jwt.verify(token, secretKey);
    };

    
}