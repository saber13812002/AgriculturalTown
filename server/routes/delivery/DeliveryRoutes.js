const pool = require('../../db/pool');
const express = require('express');
const router = express.Router();
const func = require('../../functions/index');
const moment=require('moment-jalaali');
const name = "Delivery";

let baseQuery=`select d.*, c.contract_no AS contract
    ,co.title as vw_company ,c.title as vw_contract_title
    FROM delivery d  LEFT JOIN contract c ON d.contract_id = c.id
                     left JOIN  Company as co ON c.company_id=co.id `;

router.get(`/`, function (req, res) {
    let query = `${baseQuery} order by id desc  `;

    pool.query(query)
        .then((results) => {
            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.get(`/:id`, function (req, res) {
    let query = ` ${baseQuery} where id = ${req.params.id} `;

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
    let file_record = files && files.file_record ? func.saveFile(files.file_record, name, 'file_record', data.contract_id+"_"+moment(data.commision_date).format('jYYYYjMMjDD')) : '';
    let file_signification = files && files.file_signification ? func.saveFile(files.file_signification, name, 'file_signification',data.contract_id+"_"+moment(data.commision_date).format('jYYYYjMMjDD')) : '';
    let file_free = files && files.file_free ? func.saveFile(files.file_free, name, 'file_free',data.contract_id+"_"+moment(data.commision_date).format('jYYYYjMMjDD')) : '';
    data["file_free"] = file_free;
    data["file_record"] = file_record;
    data["file_signification"] = file_signification;
    // console.log(data);
    let query = func.queryGen(name, 'insert', data);
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
   // console.log(data);
    let file_record = files && files.file_record ? func.saveFile(files.file_record, name, 'file_record', data.contract_id+"_"+moment(data.commision_date).format('jYYYYjMMjDD')) : '';
    let file_signification = files && files.file_signification ? func.saveFile(files.file_signification, name, 'file_signification',data.contract_id+"_"+moment(data.commision_date).format('jYYYYjMMjDD')) : '';
    let file_free = files && files.file_free ? func.saveFile(files.file_free, name, 'file_free', data.contract_id+"_"+moment(data.commision_date).format('jYYYYjMMjDD')) : '';
    data["file_free"] = data['file_free'] == false ? '**d**' : file_record;
    data["file_record"] = data['file_record'] == false ? '**d**' : file_record;
    data["file_signification"] = data['file_signification'] == false ? '**d**' : file_signification;

    let query = func.queryGen(name, 'update', data);
     console.log(query);
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



