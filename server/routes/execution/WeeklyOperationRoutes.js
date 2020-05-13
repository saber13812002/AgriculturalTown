const pool = require('../../db/pool');
const express = require('express');
const router = express.Router();
const func = require('../../functions/index');
const name = "Weekly_Operation";



router.get(`/`, function (req, res) {
    let query = `SELECT * FROM vw_${name} order by period_id desc  `;

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
// router.post('/upsert', function (req, res) {

//     let rows = req.body.rows;
//     let contractId = req.body.rows[0].contract_id;
//     // pool.query(`delete from public.${name} WHERE parent_id=${contractId}`).then((results) => {
//     let query = `INSERT INTO public.${name}(
//             creator_id, create_date, current_user_id, status, contract_id, period_id)
//         VALUES (${req.body.user_id},'${req.body.current_date}',1,'1',${req.body.contract_id},${req.body.period_id}) RETURNING id`;
//     pool.query(query)
//         .then((results) => {
//             let parent_id = results.rows[0].id;
//             let query_d = `INSERT INTO public.weekly_operation_detail(
//                 operation, unit, total_work, cumulative_plan, cumulative_done, current_plan, current_done, parent_id, sort)
//                 VALUES `;

//             rows.forEach(e => {
//                 query_d += `('${e.operation}','${e.unit}',${e.total_work},${e.cumulative_plan},${e.cumulative_done},
//                     ${e.current_plan},${e.current_done},${parent_id},${e.sort}),`
//             });
//             query_d = query_d.slice(0, -1);
//             console.log(query_d)
//             pool.query(query_d)
//                 .then((results_d) => {
//                     return res.send(results.rows);
//                 }).catch((err) => {
//                     return res.send({ type: "Error", message: err.message })
//                 });

//         })
//         .catch((err) => {
//             return res.send({ type: "Error", message: err.message })
//         });
//     //  });
// });
router.post('/', function (req, res) {
    let rows = req.body.rows;
    let query = `INSERT INTO public.${name}(creator_id, create_date, current_user_id, status, contract_id, period_id)
        VALUES (${req.body.creator_id},'${req.body.create_date}',1,'1',${req.body.contract_id},${req.body.period_id}) RETURNING id`;
    pool.query(query)
        .then((results) => {
            let parent_id = results.rows[0].id;
            let query_d = `INSERT INTO public.${name}_detail(
                operation, unit, total_work, cumulative_plan, cumulative_done, current_plan, current_done, parent_id, sort)
                VALUES `;
            rows.forEach(e => {
                query_d += `('${e.operation}','${e.unit}',${e.total_work},${e.cumulative_plan},${e.cumulative_done},
                    ${e.current_plan},${e.current_done},${parent_id},${e.sort}),`
            });
            query_d = query_d.slice(0, -1);
            console.log(query_d)
            pool.query(query_d)
                .then((results_d) => {
                    return res.send(results.rows);
                }).catch((err) => {
                    return res.send({ type: "Error", message: err.message })
                });
        })
        .catch((err) => {
            return res.send({ type: "Error", message: err.message })
        });
});
router.put('/:id', function (req, res) {
    let rows = req.body.rows;
    let parent_id = req.body.parent_id;
    console.log(parent_id);
    pool.query(`delete from public.${name}_detail WHERE parent_id=${parent_id}`).then((results) => {
        let query = `update public.${name} 
        SET  editor_id=${req.body.editor_id}, edit_date='${req.body.edit_date}' 
        where id =${parent_id}`;
       console.log('master',query);
        pool.query(query)
            .then((results) => {
               // let parent_id = results.rows[0].id;
                let query_d = `INSERT INTO public.${name}_detail(
                operation, unit, total_work, cumulative_plan, cumulative_done, current_plan, current_done, parent_id, sort)
                VALUES `;

                rows.forEach(e => {
                    query_d += `('${e.operation}','${e.unit}',${e.total_work},${e.cumulative_plan},${e.cumulative_done},
                    ${e.current_plan},${e.current_done},${parent_id},${e.sort}),`
                });
                query_d = query_d.slice(0, -1);
                console.log('details',query_d)
                pool.query(query_d)
                    .then((results_d) => {
                        return res.send(results.rows);
                    }).catch((err) => {
                        return res.send({ type: "Error", message: err.message })
                    });

            })
            .catch((err) => {
                return res.send({ type: "Error", message: err.message })
            });
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


