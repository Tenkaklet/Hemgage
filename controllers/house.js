
// require things
var House = require('../models/House');
var geocode = require('node-geocoder');
var getSlug = require('speakingurl');
var User = require('../models/User');
var cloudinary = require('cloudinary').v2;
var formidable = require('formidable');

var options = {
    apiKey: 'AIzaSyD8BYoMr1iaJ0wlaQi6flwhM4TKEecPo8Y'
};

var geoCode = geocode(options);
cloudinary.config({
    cloud_name: 'hemgage',
    api_key: '529314655698826',
    api_secret: 'NllKEnoDFKyRh4Hork8msSYjH-c'
});


exports.getHouses = function (req, res, next) {
    console.log('GETTING HOUSES');

    House.find({}).exec(function (err, houses) {
        res.send(houses);
    });
};


exports.createHouse = function (req, res) {
    console.log(req.body);
    
    geoCode.geocode(`${req.body.address} ${req.body.city}`, function (err, response) {
        
        
        
        

        if (response.length === 0) {
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
            var form = new formidable.IncomingForm();
            form.multiples = true;
            console.log(form);
            

            
            // let gallery = [];
            
            // for(let i = 0; i < req.body.images.length; i++) {
            //     gallery.push(req.body.images[i].$ngfBlobUrl);
            //     let images = [...gallery];
            //     console.log(images);
                
            // }


            // cloudinary.uploader.upload('http://localhost:3000/64ca3437-a1f9-4b82-a029-e0e4c7e53743', function(err, result) {
            //     console.log('error', err);
                
                
            //     gallery.push(result.secure_url);
            //     const houseDetails = {
            //         location,
            //         contact,
            //         creator: req.user._id,
            //         title: req.body.title,
            //         slug: getSlug(req.body.title),
            //         city: response[0].city,
            //         renovations: req.body.renovations,
            //         balkong: req.body.balkong,
            //         boarea: req.body.boarea,
            //         electricity: req.body.electricity,
            //         floors: req.body.floors,
            //         internet: req.body.internet,
            //         rooms: req.body.numofrooms,
            //         pool: req.body.pool,
            //         tomtarea: req.body.tomtarea,
            //         type: req.body.type,
            //         heat: req.body.varme,
            //         water: req.body.vatten,
            //         year: req.body.year,
            //         photoGallery: gallery
            //     };
            //     res.send(houseDetails);
            // });
            
            form.on('file', function (field, files) {
                console.log(files.path);
                
            });

            // log any errors that occur
            form.on('error', function (err) {
                console.log('An error has occured: \n' + err);
                console.log('error error error');
            });

            // once all the files have been uploaded, send a response to the client
            form.on('end', function () {
                // form done!
                console.log('ALL DONE');
            });

            // parse the incoming request containing the form data
            form.parse(req);



            
            // House.create(houseDetails, function (err, house) {
            //     if (err) {
            //         res.status(400).json({
            //             success: false,
            //             message: "Could not create a listing."
            //         });
            //     }

            //     res.status(200).send(house);
            // });

            // res.status(200).send(houseDetails);
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

