const pool = require('../../db/pool');
const express = require('express');
const router = express.Router();
const func = require('../../functions/index');
const name = "insurance_appendix";

let baseQuery=` SELECT i.*,c.contract_no AS contract,b1.insurance_no AS insurance
    ,co.title as vw_company ,c.title as vw_contract_title ,b.title as vw_insurance_company
    FROM insurance_appendix i LEFT JOIN contract c ON i.contract_id = c.id
                              LEFT JOIN insurance b1 ON i.insurance_id = b1.id
                              left JOIN  Company as co ON c.company_id=co.id 
                              LEFT JOIN baseinfo b ON b.id = b1.insurance_company_id `;

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
    let query = `${baseQuery} where id = ${req.params.id} `;

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
    let file_contract = files && files.file_contract ? func.saveFile(files.file_contract, name, 'file_contract', data.contract_id+"_"+data.insurance_id) : '';
    data["file_contract"] = file_contract;
    let query = func.queryGen(name, 'insert',data);
   
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
    let file_contract = files && files.file_contract ? func.saveFile(files.file_contract, name, 'file_contract', data.contract_id+"_"+data.insurance_id) : '';
    data["file_contract"] = data['file_contract'] == false ? '**d**' : file_contract;

    let query = func.queryGen(name, 'update',data);
  //   console.log(query);
    pool.query(query)
        .then((results) => {
            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.delete('/:id', function (req, res) {
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

