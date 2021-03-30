const db = require("../models");
const axios = require('axios')
// Defining methods for the configsController
module.exports = {
    show: function (req, res) {
        // console.log('axios')
        let server_url = 'http://localhost:5000/show/'
        if (process.env.NODE_ENV === "production") {
            server_url = 'https://paglipay-dtree.herokuapp.com/show/';
        }
        axios.get(server_url + req.params.id).then(resp => {
            // console.log(resp.data);
            res.json(resp.data)
        });
    },
    send: function (req, res) {
        // console.log('req.body: ', req.body)
        let server_url = 'http://localhost:5000/send/'
        if (process.env.NODE_ENV === "production") {
            server_url = 'https://paglipay-dtree.herokuapp.com/send/';
        }
        axios.post(server_url + req.params.id, req.body)
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
        let server_url = 'http://localhost:5000/start/'
        if (process.env.NODE_ENV === "production") {
            server_url = 'https://paglipay-dtree.herokuapp.com/start/';
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
