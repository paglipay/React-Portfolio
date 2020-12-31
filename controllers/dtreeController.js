const db = require("../models");
const axios = require('axios')
// Defining methods for the configsController
module.exports = {
    show: function (req, res) {
        // console.log('axios')
        const server_url = 'http://localhost:5000/start/'
        if (process.env.NODE_ENV === "production") {
            const server_url = 'https://paglipay-dtree.herokuapp.com/show/';
        }
        axios.get(server_url + req.params.id).then(resp => {
            // console.log(resp.data);
            res.json(resp.data)
        });
    },
    send: function (req, res) {
        // console.log('req.body: ', req.body)
        axios.post('https://paglipay-dtree.herokuapp.com/show/' + req.params.id, req.body)
            .then(resp => {
                // console.log(resp.data);
                res.json(resp.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    },
    start: function (req, res) {
        // console.log('req.body: ', req.body)
        const server_url = 'http://localhost:5000/start/'
        if (process.env.NODE_ENV === "production") {
            const server_url = 'https://paglipay-dtree.herokuapp.com/show/';
        }
        axios.post(server_url + req.params.id, req.body)
            .then(resp => {
                // console.log(resp.data);
                res.json(resp.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }
};
