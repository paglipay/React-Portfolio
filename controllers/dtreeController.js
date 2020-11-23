const db = require("../models");
const axios = require('axios')
// Defining methods for the configsController
module.exports = {
    show: function (req, res) {
        console.log('axios')
        axios.get('http://localhost:5000/show/' + req.params.id).then(resp => {
            console.log(resp.data);
            res.json(resp.data)
        });
    },
    start: function (req, res) {
        console.log('req.body: ', req.body)
        axios.post('http://localhost:5000/start/' + req.params.id, req.body)
            .then(resp => {
                console.log(resp.data);
                res.json(resp.data)
            })
            .catch(error => {
                console.log(error.message)
            })

    }
};
