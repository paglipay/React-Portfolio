const db = require("../models");
const axios = require('axios')
// Defining methods for the configsController
module.exports = {
    start: function (req, res) {
        console.log('axios')
        axios.get('https://paglipay-dtree.herokuapp.com/start').then(resp => {
            console.log(resp.data);
            res.json(resp.data)
        });
    }
};
