const log = require('../services/log');
const QueryService = require("../services/querySql");
const axios = require('axios');

module.exports = class JobController {
    static async getListData(req, res, next) {
        try {
            const {description, location, full_time, page} = req.body
            // const dataQuery = await QueryService.getDataJob()

            console.log(description, location, full_time)
            
            
            const response = await axios.get(`https://dev6.dansmultipro.com/api/recruitment/positions.json`);

            const pagination = await axios.get(`https://dev6.dansmultipro.com/api/recruitment/positions.json?page=${page}`);
            // res.json(response.data);
            
            let result = []


            if(description || location || full_time) {
                console.log("goblok")
                result = response.data.filter(item => {

                    let resultData = []
                    function filterByDescription()  {
                       return item.description.toLowerCase().includes(description.toLowerCase());
                    }
                    function filterByLocation()  {
                       return item.location.toLowerCase().includes(location.toLowerCase());
                    }
                    function filterByFullTime() {
                       return full_time == 'Y' ? item.type.includes('Full Time') : !item.type.includes('Full Time')
                    }
                    


                    if(description && !location && !full_time) resultData = filterByDescription()
                    if(!description && location && !full_time) resultData = filterByLocation()
                    if(!description && !location && full_time) resultData = filterByFullTime()

                    if(description && location && !full_time) resultData = filterByDescription() && filterByLocation()
                    if(description && !location && full_time) resultData = filterByDescription() && filterByFullTime()
                    if(!description && location && full_time) resultData = filterByFullTime() && filterByLocation()

                    if(description && location && full_time) resultData =filterByDescription() && filterByFullTime() && filterByLocation()

    
                    return resultData
                })
            }else{
                console.log("hahaha")
                result = pagination.data
            }


            // console.log("result", result);
            
            res.status(200).json({
                "success" : true,
                "data" : result
            })
            

       
        } catch (error) {
            log.error(error + " - apiGetOrder")
            return res.status(500).json({ error: error });
        }
        
    }

    static async getDetailJobs(req, res, next) {
        try {

            const {id} = req.params

            const response = await axios.get(`https://dev6.dansmultipro.com/api/recruitment/positions/${id}`);
            
            let result = response.data


            // console.log("result", result);
            
            res.status(200).json({
                "success" : true,
                "data" : result
            })
            

        } catch (error) {
            log.error(error + " - apiGetOrder")
            return res.status(500).json({ error: error });
        }
        
    }
    
}