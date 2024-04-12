const log = require('../services/log');
const QueryService = require("../services/querySql");
const utils = require("../services/utils");



module.exports = class UsersController {
    static async login(req, res, next) {
        try {
          const { username, password } = req.body
            console.log("data user", username, password);
            if (!username || !password) {
                log.info(`Success Access apiLogin - failed login - Please enter all field!`);
                return next({ message: `Please enter all field!` });
            }

            let find = await QueryService.checkLogin(username, password);
            if (find.length < 0) {
              log.info(`Success Access apiLogin - failed login - Password or nik incorrect!`);
              return next({ message: `Password or nik incorrect!` });
            }

            
            const access_token = utils.tokenGenerator(find);

            let data = {
                "success" : true,
                "message" : '`Success Access apiLogin - Success login`',
                "access_token":access_token,
                "data_user": find[0]
            }

            // const dataQuery = await QueryService.getDataItem()

            res.status(200).json(data)
        } catch (error) {
            log.error(error + " - apiGetOrder")
            return res.status(500).json({ error: error });
        }
        
    }

    
}