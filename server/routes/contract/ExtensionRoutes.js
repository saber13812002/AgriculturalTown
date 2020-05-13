const pool = require('../../db/pool');
const express = require('express');
const router = express.Router();
const func = require('../../functions/index');
const name = "extension";

router.get(`/`, function (req, res) {
    let query = `SELECT * FROM vw_${name} order by id desc  `;

    pool.query(query)
        .then((results) => {
            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.get(`/:id`, function (req, res) {
    let query = `SELECT * FROM vw_${name} where id = ${req.params.id} `;

    pool.query(query)
        .then((results) => {
            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.post('/', function (req, res) {

    let data = JSON.parse(req.body.data);
    let files = req.files;
   
    let file_late = files && files.file_late ? func.saveFile(files.file_late, name, 'file_late', data.title) : '';
    let file_signification = files && files.file_signification ? func.saveFile(files.file_signification, name, 'file_signification', data.title) : '';
    
    data["file_late"] = file_late;
    data["file_signification"] = file_signification;
    // console.log(data);
    let query = func.queryGen(name, 'insert', data);
    console.log(query)

    console.log(query)
    pool.query(query)
        .then((results) => {
            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.put('/:id', function (req, res) {
    let data = JSON.parse(req.body.data);
    let files = req.files;
    let file_late = files && files.file_late ? func.saveFile(files.file_late, name, 'file_late', data.title) : '';
    let file_signification = files && files.file_signification ? func.saveFile(files.file_signification, name, 'file_signification', data.title) : '';
    
    data["file_late"] = data['file_late'] == false ? '**d**' : file_late;
    data["file_signification"] = data['file_signification'] == false ? '**d**' : file_signification;

    let query = func.queryGen(name, 'update', data);
    pool.query(query)
        .then((results) => {
            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.delete('/:id', function (req, res) {

    console.log(req.body);
    let query = `delete from public.${name} WHERE  id=${req.params.id};    `;
    console.log(query);
    pool.query(query)
        .then((results) => {

            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
module.exports = router;


