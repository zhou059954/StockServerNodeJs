const express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var { Testcrud } = require('../models/crudtest');
var ObjectId = require('mongoose').Types.ObjectId;


router.get('/testcruds', (req, res) => {
    Testcrud.find((err, docs) => {
        if (!err) {
            res.status(HttpStatus.OK).send(docs);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Testcrud :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.get('/testcrud', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    Testcrud.findById(user_id, (err, doc) => {
        if (!err) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Testcrud :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});


router.get('/testcrudOne', (req, res) => {
    var lieu = req.param('lieu');
    var age = req.param('age');
    if (!ObjectId.isValid(lieu))
        return res.status(HttpStatus.OK)
            .send(lieu);

    Testcrud.findOne({ 'lieu': lieu, 'age': age }, (err, doc) => {
        if (!err) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Retriving Testcrud :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.post('/testcrud', (req, res) => {
    var test = new Testcrud({
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        lieu: req.body.lieu
    });
    test.save((err, doc) => {
        if (!err) {
            res
                .status(HttpStatus.CREATED)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Save Testcrud :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.put('/testcrud', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    var test = new Testcrud({
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        lieu: req.body.lieu
    });

    Testcrud.findByIdAndUpdate(user_id, { $set: test }, { new: true }, (err, doc) => {
        if (!err) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Edit Testcrud :' + JSON.stringify(err, undefined, 2)
            );
        }
    });
});

router.delete('/testcrud', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    Testcrud.findByIdAndDelete(user_id, (err, doc) => {
        if (!err) {
            res
                .status(HttpStatus.CONFLICT)
                .send(doc);
        }
        else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
            console.log('Error in Delete Testcrud :' + JSON.stringify(err, undefined, 2)
            );
        }
    })
});

module.exports = router;