const db = require("../models");
const axios = require('axios')
// Defining methods for the configsController
module.exports = {
    show: function (req, res) {
        // console.log('axios')
        let server_url = 'https://automate.paglipay.info//show/'
        if (process.env.NODE_ENV === "production") {
            server_url = 'https://automate.paglipay.info/show/';
        }
        axios.get(server_url + req.params.id).then(resp => {
            // console.log(resp.data);
            res.json(resp.data)
        })
        .catch(error => {
            console.log(error.message)
            res.json({"ParamikoObj": ["Working..."],"sending": [
                {
                "recv": [
                "START",
                "GO"],
                "send": "pwd"
                }]})
        });
    },
    send: function (req, res) {
        // console.log('req.body: ', req.body)
        let server_url = 'https://automate.paglipay.info//send/'
        if (process.env.NODE_ENV === "production") {
            server_url = 'https://automate.paglipay.info/send/';
        }
        axios.post(server_url + req.params.id, req.body)
            .then(resp => {
                // console.log(resp.data);
                res.json(resp.data)
            })
            .catch(error => {
                console.log(error.message)
                res.json({"ParamikoObj": ["Working..."],"sending": [
                    {
                    "recv": [
                    "START",
                    "GO"],
                    "send": "pwd"
                    }]})
            })
    },
    start: function (req, res) {
        // console.log('req.body: ', req.body)
        let server_url = 'https://automate.paglipay.info//start/'
        if (process.env.NODE_ENV === "production") {
            server_url = 'https://automate.paglipay.info/start/';
        }
        axios.post(server_url + req.params.id, req.body)
            .then(resp => {
                // console.log(resp.data);
                res.json(resp.data)
            })
            .catch(error => {
                console.log(error.message)
                res.json({"ParamikoObj": ["Working..."],"sending": [
                    {
                    "recv": [
                    "START",
                    "GO"],
                    "send": "pwd"
                    }]})
            })
    }
};
