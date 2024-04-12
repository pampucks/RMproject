const { Connection } = require('../services/db');

module.exports = class QueryService {
  static checkLogin(username, password) {
      return new Promise((resolve, reject) => {
      let query = `SELECT * FROM users where username='${username}' AND password='${password}'`

      Connection.query( query, (err, result) => {
          if (err) {
              console.error('Error creating record: ', err);
              res.status(500).send('Error creating record');
              return;
          }
          console.log(err);
          console.log(result);

          resolve(result)
      });
    });
  }


  static getDataJob() {
    return new Promise((resolve, reject) => {
    let query = `SELECT * FROM category `

    Connection.query( query, (err, result) => {
        if (err) {
            console.error('Error creating record: ', err);
            res.status(500).send('Error creating record');
            return;
        }
        console.log(err);
        console.log(result);

        resolve(result)
    });
  });
  }

    
    
}
