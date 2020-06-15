const request = require('request');

exports.getLocation = function (req, res, next) {

    request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.latitude},${req.params.longitude}&key=AIzaSyD8BYoMr1iaJ0wlaQi6flwhM4TKEecPo8Y`, function (err, response, body) {
        res.send(body);
    });
};