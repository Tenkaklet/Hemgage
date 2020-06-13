
// require things
var House = require('../models/House');
var geocode = require('node-geocoder');
var getSlug = require('speakingurl');
var User = require('../models/User');

var options = {
    apiKey: 'AIzaSyD8BYoMr1iaJ0wlaQi6flwhM4TKEecPo8Y'
};

var geoCode = geocode(options);

exports.getHouses = function (req, res, next) {
    console.log('GETTING HOUSES');

    House.find({}).exec(function (err, houses) {
        res.send(houses);
    });
};


exports.createHouse = function (req, res, next) {
    console.log('creating house');
    geoCode.geocode({ address: req.body.address, zipcode: req.body.postcode }, function (err, response) {
        if (!response[0]) {
            console.log('wrong addresss');
            res.status(400).json({
                message: 'Could not find your address.'
            });
        } else {
            const location = {
                latitude: response[0].latitude,
                longitude: response[0].longitude
            };

            const contact = {
                phone_number: req.body.number
            };

            const houseDetails = {
                location,
                contact,
                creator: req.user._id,
                title: req.body.title,
                slug: getSlug(req.body.title)
            };
            House.create(houseDetails, function (err, house) {
                if (err) {
                    console.log(err);
                    res.status(400).json({
                        success: false,
                        message: "Could not create a listing."
                    });
                    console.log('error');
                }

                res.status(200).send(house);
            });
        }


    });

};

exports.getOwnHouse = function (req, res, next) {
    const user = req.user;
    let userId = null;
    if (user === undefined) {
        return;
    } else {
        userId = user._id;
    }

    House.findOne({ slug: req.params.owner }, function (err, listing) {
        const owner = listing.creator;
        if (userId != owner) {
            res.send({ listing, owner: false });
        } else {
            res.send({ listing, owner: true });
        }
    });
};

exports.getOwnListings = function (req, res, next) {
    House.find({ creator: req.params.owner }, function (err, listings) {
        res.send(listings);
    });
};

exports.searchDirectory = function (req, res, next) {
    const search = req.params.search;
    House.find({ $text: { $search: search } })
        .exec(function (err, listing) {
            res.send(listing);
        });


};