const express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var {
    Stocks
} = require('../models/stock');
var ObjectId = require('mongoose').Types.ObjectId;


router.get('/stocks', (req, res) => {
    Stocks.find((err, docs) => {
        if (!err) {
            res.status(HttpStatus.OK).send(docs);
        } else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({
                    err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
                });
            console.log('Error in Retriving Testcrud :' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/stock', (req, res) => {
    var user_id = req.param('id');
    if (!ObjectId.isValid(user_id))
        return res.status(HttpStatus.OK)
            .send(user_id);

    Stocks.findById(user_id, (err, doc) => {
        if (!err) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({
                    err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
                });
            console.log('Error in Retriving Testcrud :' + JSON.stringify(err, undefined, 2));
        }
    });
});


router.post('/stock', (req, res) => {
    var stock = new Stocks({
        image: req.body.image,
        nom: req.body.nom,
        total: req.body.total
    });
    stock.save((err, doc) => {
        if (!err) {
            res
                .status(HttpStatus.CREATED)
                .send(doc);
        } else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({
                    err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
                });
            console.log('Error in Save Testcrud :' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/stock', (req, res) => {
    var stock_id = req.param('_id');
    if (!ObjectId.isValid(stock_id))
        return res.status(HttpStatus.OK)
            .send(stock_id);

    var stock = new Stocks({
        image: req.body.image,
        nom: req.body.nom,
        total: req.body.total
    });

    Stocks.findByIdAndUpdate(stock_id, {
        $set: stock
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res
                .status(HttpStatus.OK)
                .send(doc);
        } else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({
                    err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
                });
            console.log('Error in Edit Testcrud :' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/stock', (req, res) => {
    var stock_id = req.param('id');
    if (!ObjectId.isValid(stock_id))
        return res.status(HttpStatus.OK)
            .send(stock_id);

    Stocks.findByIdAndDelete(stock_id, (err, doc) => {
        if (!err) {
            res
                .status(HttpStatus.CONFLICT)
                .send(doc);
        } else {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({
                    err: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
                });
            console.log('Error in Delete Testcrud :' + JSON.stringify(err, undefined, 2));
        }
    })
});

module.exports = router;