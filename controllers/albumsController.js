const express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var { Albums } = require('../models/albums');
var ObjectId = require('mongoose').Types.ObjectId;



router.get('/albums', (req, res) => {
    Albums.find((err, docs) => {
        if (docs) {
            res.status(HttpStatus.OK).send(docs);
            console.log(docs);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Albums :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});



router.get('/search-albums', (req, res) => {
    var titre = req.param('titre');
    Albums.find({ $text: { $search: titre } }, (err, docs) => {
        if (docs) {
            res.status(HttpStatus.OK).send(docs);
            console.log(docs);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Albums :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.get('/new-albums', (req, res) => {
    Albums.find((err, docs) => {
        if (docs) {
            res.status(HttpStatus.OK).send(docs);
            console.log(docs);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Albums :' + JSON.stringify(err, undefined, 2)
            );
        }
    }).sort({ _id: -1 }).limit(6);
});

router.get('/album', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);
    Albums.findById(user_id, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Albums :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});


router.post('/album', (req, res) => {
    var album = new Albums({
        image: req.body.image,
        titre: req.body.titre,
        annee: req.body.annee,
        album: req.body.album,
        genre: req.body.genre
    });
    album.save((err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.CREATED)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Save Albums :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});




router.put('/album', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    var test = new Albums({
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        lieu: req.body.lieu
    });

    Albums.findByIdAndUpdate(user_id, { $set: test }, { new: true }, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Edit Albums :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.delete('/album', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    Albums.findByIdAndDelete(user_id, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.CONFLICT)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Delete Albums :' + JSON.stringify(err, undefined, 2)
            );
        }
    })
});

module.exports = router;