const express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var { Playlists } = require('../models/playlists');
var { Albums } = require('../models/albums');
var ObjectId = require('mongoose').Types.ObjectId;




/*router.get('/playlists', (req, res) => {
    Playlists.find((err, docs) => {
        if (docs) {
            res.status(HttpStatus.OK).send(docs);
            console.log(docs);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Playlists :' + JSON.stringify(err, undefined, 2)
            );
        }
    });  
});
*/


router.get('/playlists', (req, res) => {
    var playlist = req.param('playlist');
    Playlists.find({ 'playlist': playlist }, (err, docs) => {
        if (docs) {
            res.status(HttpStatus.OK).send(docs);
            console.log(docs);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Playlists :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.get('/playlist', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);
    Playlists.findById(user_id, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Playlists :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.get('/playlists_album', (req, res) => {
    var album = req.param('album');
    Playlists.find({ 'album': album }, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.ACCEPTED)
                .send(doc);
        }
        else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Playlists :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});


router.post('/playlist', (req, res) => {
    var playlist = new Playlists({
        playlist: req.body.playlist,
        album: req.body.album,
        titre: req.body.titre,
        video: req.body.video,
        id: req.body.id
    });
    playlist.save((err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.CREATED)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Save Playlists :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});




router.put('/playlist', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    var test = new Playlists({
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        lieu: req.body.lieu
    });

    Playlists.findByIdAndUpdate(user_id, { $set: test }, { new: true }, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Edit Playlists :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.delete('/playlist', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    Playlists.findByIdAndDelete(user_id, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.CONFLICT)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Delete Playlists :' + JSON.stringify(err, undefined, 2)
            );
        }
    })
});

module.exports = router;