const express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var { Videos } = require('../models/videos');
var { Albums } = require('../models/albums');
var ObjectId = require('mongoose').Types.ObjectId;



router.get('/videos', (req, res) => {
    Videos.find((err, docs) => {
        if (docs) {
            res.status(HttpStatus.OK).send(docs);
            console.log(docs);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Videos :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.get('/video', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);
    Videos.findById(user_id, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Videos :' + JSON.stringify(err, undefined, 2)
            );
        }
    }); 
});

router.get('/videos_album', (req, res) => {
    var album = req.param('album');
    Videos.find({ 'album': album}, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.ACCEPTED)
                .send(doc);
        }
        else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Videos :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});


router.post('/video', (req, res) => {
    var video = new Videos({
        album: req.body.album,
        titre: req.body.titre,
        video: req.body.video
    });
    video.save((err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.CREATED)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Save Videos :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});




router.put('/video', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    var test = new Videos({
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        lieu: req.body.lieu
    });

    Videos.findByIdAndUpdate(user_id, { $set: test }, { new: true }, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Edit Videos :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.delete('/video', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    Videos.findByIdAndDelete(user_id, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.CONFLICT)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Delete Videos :' + JSON.stringify(err, undefined, 2)
            );
        }
    })
});

module.exports = router;