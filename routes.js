const express = require('express')
const routes = express.Router()

routes.get('/getRubros',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM TM_RUBR' , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }
    })
})//LISTO

routes.get('/getNegocios/:id_rubro',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM TM_TIEN WHERE CO_RUBR_TIEN = ?' , [req.params.id_rubro] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }
    })
})//LISTO 1 

routes.get('/getCategorias/:id_tienda',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM TM_CATE WHERE  CO_TIEN_CATE = ?' , [req.params.id_tienda] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }
    })
})//LISTO 0 , 1 , 2

routes.post('/getProductos',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM TM_ITEM WHERE CO_CATE = ? && CO_TIEN = ?' , [req.body.id_categoria,req.body.id_tienda] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }   
    })
})//LISTO 5

routes.get('/getPreguntas/:id_item',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM `TM_ADIC_PREGUNTAS` WHERE CO_ITEM_ADC = ?' , [req.params.id_item] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }   
    })
})

routes.get('/getRespuestas/:id_preguntas',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM `TM_ADIC_RESPUESTAS` WHERE CO_ADIC_PRGT = ?' , [req.params.id_preguntas] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }   
    })
})





//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

routes.post('/PostLogin',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM TM_USUA WHERE DI_CORR_USUA = ? AND IN_PASS_USUA = ? ' , [req.body.usuario,req.body.password] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }
    })
})//LISTO

routes.post('/PostRegister',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('INSERT INTO `TM_USUA` (`NO_USUA`, `AP_USUA`, `DI_CORR_USUA`, `IN_PASS_USUA`, `CE_USUA`, `ES_USUA`) VALUES (?,?,?,?,?,?)' , [req.body.nombre,req.body.apellidos,req.body.email,req.body.password,req.body.phone,req.body.estado] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }
    })
})//LISTO 


module.exports = routes