const db = require("../models");
const axios = require('axios')
// Defining methods for the configsController
module.exports = {
    start: function (req, res) {
        console.log('axios')
        axios.get('http://localhost:5000/start/' + req.params.id).then(resp => {
            console.log(resp.data);
            res.json(resp.data)
        });
    },
    send: function (req, res) {
        const d = { "(PASSCODE): ": ['echo "HI PAUL 1"','echo "HI PAUL 2"','echo "HI PAUL 3"'] }
        console.log('send: ', d)
        axios.post('http://localhost:5000/start/' + req.params.id, d)
            .then(resp => {
                console.log(resp.data);
                res.json(resp.data)
            })
            .catch(error => {
                console.log(error.message)
            })

    }
};
