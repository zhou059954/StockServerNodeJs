const express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var { Newplaylist } = require('../models/newplaylist');
var ObjectId = require('mongoose').Types.ObjectId;



router.get('/newplaylists', (req, res) => {
    Newplaylist.find((err, docs) => {
        if (docs) {
            res.status(HttpStatus.OK).send(docs);
            console.log(docs);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Newplaylist :' + JSON.stringify(err, undefined, 2)
            );
        }
    }).sort({ _id: -1 }).limit(1);
});

router.get('/all-playlists', (req, res) => {
    var utilisateur = req.param('utilisateur');
    Newplaylist.find({ 'utilisateur': utilisateur }, (err, docs) => {
        if (docs) {
            res.status(HttpStatus.OK).send(docs);
            console.log(docs);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Newplaylist :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.get('/newplaylist', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);
    Newplaylist.findById(user_id, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Newplaylist :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});


router.post('/newplaylist', (req, res) => {
    var newplaylist = new Newplaylist({
        utilisateur: req.body.utilisateur,
        nom: req.body.nom,
        date_playlist: req.body.date_playlist,
        heure_playlist: req.body.heure_playlist

    });
    newplaylist.save((err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.CREATED)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Save Newplaylist :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});




router.put('/newplaylist', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    var test = new Newplaylist({
        utilisateur: req.body.utilisateur,
        nom: req.body.nom

    });

    Newplaylist.findByIdAndUpdate(user_id, { $set: test }, { new: true }, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Edit Newplaylist :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.delete('/newplaylist', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    Newplaylist.findByIdAndDelete(user_id, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.CONFLICT)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Delete Newplaylist :' + JSON.stringify(err, undefined, 2)
            );
        }
    })
});

module.exports = router;