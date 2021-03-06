const pool = require('../../db/pool');
const express = require('express');
const router = express.Router();
const func = require('../../functions/index');
const name = "Company";

router.get(`/vw`, function (req, res) {
    let query = `SELECT id,title FROM ${name} `;

    pool.query(query)
        .then((results) => {
            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});

let baseQuery=`SELECT c.*,
    b1.title AS province,b2.title AS registration_province,b3.title AS certificate_type
    FROM company c LEFT JOIN baseinfo b1 ON c.province_id = b1.id
                   LEFT JOIN baseinfo b2 ON c.registration_province_id = b2.id
                   LEFT JOIN baseinfo b3 ON c.certificate_type_id = b3.id `;
                   
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
    let query = func.queryGen(name, 'insert', req.body);
    // let query = `INSERT INTO public.company(title,full_title,meli_code,economic_code,registration_number,registration_province_id,certificate_type,province_id,city,address,postalcode,tell,fax,rating1,rating2)  Values('${req.body.title}','${req.body.full_title}','${req.body.meli_code}','${req.body.economic_code}','${req.body.registration_number}',${req.body.registration_province_id},'${req.body.certificate_type}',${req.body.province_id},'${req.body.city}','${req.body.address}','${req.body.postalcode}','${req.body.tell}','${req.body.fax}','${req.body.rating1}','${req.body.rating2}')`;
  //  console.log(query)
    pool.query(query)
        .then((results) => {
            return res.send(results.rows);
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.put('/:id', function (req, res) {
    let query = func.queryGen(name, 'update', req.body);
   // let query = `UPDATE public.company SET title='${req.body.title}',full_title='${req.body.full_title}',meli_code='${req.body.meli_code}',economic_code='${req.body.economic_code}',registration_number='${req.body.registration_number}',registration_province_id=${req.body.registration_province_id},certificate_type='${req.body.certificate_type}',province_id=${req.body.province_id},city='${req.body.city}',address='${req.body.address}',postalcode='${req.body.postalcode}',tell='${req.body.tell}',fax='${req.body.fax}',rating1='${req.body.rating1}',rating2='${req.body.rating2}' WHERE  id=${req.body.id}    `;

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
    let query = `delete from public.company WHERE  id=${req.params.id};    `;
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

