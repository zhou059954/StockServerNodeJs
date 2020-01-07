const express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var { Utilisateur } = require('../models/utilisateur');
var ObjectId = require('mongoose').Types.ObjectId;



router.get('/utilisateurs', (req, res) => {
    Utilisateur.find((err, docs) => {
        if (docs) {
            res.status(HttpStatus.OK).send(docs);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Utilisateur :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.get('/utilisateur', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);
    Utilisateur.findById(user_id, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Utilisateur :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.post('/autentification', (req, res) => {
    var email = req.param('email');
    var mdp = req.param('mdp');
    Utilisateur.findOne({ 'email': email, 'mdp': mdp }, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.ACCEPTED)
                .send(doc);
        }
        else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Utilisateur :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.post('/utilisateur', (req, res) => {
    var utilisateur = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        date_naissance: req.body.date_naissance,
        lieu: req.body.lieu,
        email: req.body.email,
        mdp: req.body.mdp
    });
    utilisateur.save((err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.CREATED)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Save Utilisateur :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

/*router.post('/autentification', function (req, res) {
    Utilisateur.findOne({lieu: req.body.lieu }).select('email mdp').exec(function (err, user) {
        if (!user) {
            res.json({ success: false, message: 'Could not authenticate user' });
        } else if (user) {
            var validPassword = user.ComparePassword(req.body.mdp);
            if (!validPassword) {
                res.json({ success: false, message: 'Could not authenticate password' });
            } else {
                res.json({ success: true, message: 'User autenticated' })
            }
        }

    });
});*/


router.put('/utilisateur', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    var test = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        lieu: req.body.lieu
    });

    Utilisateur.findByIdAndUpdate(user_id, { $set: test }, { new: true }, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Edit Utilisateur :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.delete('/utilisateur', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    Utilisateur.findByIdAndDelete(user_id, (err, doc) => {
        if (doc) {
            res
                .status(HttpStatus.CONFLICT)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Delete Utilisateur :' + JSON.stringify(err, undefined, 2)
            );
        }
    })
});

module.exports = router;