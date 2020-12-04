const db = require("../models");
const axios = require('axios')
// Defining methods for the configsController
module.exports = {
    show: function (req, res) {
        console.log('axios')
        axios.get('https://paglipay-dtree.herokuapp.com//show/' + req.params.id).then(resp => {
            // console.log(resp.data);
            res.json(resp.data)
        });
    },
    send: function (req, res) {
        console.log('req.body: ', req.body)
        axios.post('https://paglipay-dtree.herokuapp.com//show/' + req.params.id, req.body)
            .then(resp => {
                // console.log(resp.data);
                res.json(resp.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    },
    start: function (req, res) {
        console.log('req.body: ', req.body)
        axios.post('https://paglipay-dtree.herokuapp.com//start/' + req.params.id, req.body)
            .then(resp => {
                // console.log(resp.data);
                res.json(resp.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }
};
