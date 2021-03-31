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

routes.get('/getItem/:id_item',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM `TM_ITEM` WHERE CO_ITEM = ?' , [req.params.id_item] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }   
    })
})

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

routes.get('/getProductosxTienda/:id_tienda',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM `TM_ITEM` WHERE CO_TIEN = ?' , [req.params.id_tienda] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }   
    })
})

routes.post('/registerItem',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('INSERT INTO `TM_ITEM`(`NO_ITEM`, `ITEM_DESCRIPCION`, `UN_MEDI`, `CA_STOC`, `PREC`, `LI_IMAG`, `ES_ITEM`, `FE_CREA_USUA`, `CO_MODI_USUA`, `CO_CATE`, `CO_TIEN`) VALUES (?,?,?,?,?,?,?,?,?,?,?)' , [req.body.item_nombre,req.body.item_descripcion,req.body.item_medida,req.body.item_stock,req.body.item_precio,req.body.item_link_imagen,req.body.item_estado,req.body.item_fecha,req.body.item_modi_usua,req.body.item_codigo_categoria,req.body.item_codigo_tienda] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }   
    })
})//LISTO

routes.post('/cambioEstadoItem',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('UPDATE `TM_ITEM` SET `ES_ITEM`=? WHERE CO_ITEM = ?',[req.body.item_estado,req.body.item_codigo] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }   
    })
})//LISTO




// routes.get('/getPregResptProductos/:id_item',(req,res)=>{
//     let data = [] ;
//     let data_final = [] ;
//     req.getConnection((err,conn) => {
//         if (err) {
//             return res.send(err)
//         }else{
//             conn.query('SELECT * FROM `TM_ADIC_PREGUNTAS` WHERE CO_ITEM_ADC = ?' , [req.params.id_item] , (err,rows) => {
//                 if (err) {
//                     return res.send(err)
//                 }else{
//                     this.data = rows ;
//                     this.data_final = rows ;
//                 }
//             });
//         }   
//     })
//     respuestas = ["hola"] ;
//     req.getConnection((err,conn) => {
//         if (err) {
//             return res.send(err)
//         }else{
//             this.data.forEach((element) => {
//                 conn.query('SELECT * FROM `TM_ADIC_RESPUESTAS` WHERE CO_ADIC_PRGT = ?' , element['CO_ADIC'] , (err,rows) => {
//                     if (err) {
//                         return res.send(err)
//                     }else{
//                         respuestas.push(rows);
//                     }
//                 });
//             });
//             res.send(respuestas);
//             console.log(respuestas);
//         }
//     })
// })


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

routes.get('/getDataUser/:id_usuario',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM `TM_USUA` WHERE ID_USUA = ?' , [req.params.id_usuario] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }   
    })
})

routes.post('/LoginTienda',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM TM_USUA_TIENDA WHERE CO_USUARIO = ? && CO_PASSWORD = ? && CO_ESTADO = 1' , [req.body.user_tienda,req.body.pass_tienda] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }
    })
})//LISTO

routes.post('/LoginRepartidor',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM TM_USUA_REPARTIDOR WHERE RE_CORREO = ? && RE_PASSWORD = ? && RE_ESTADO = 1' , [req.body.user_repartidor,req.body.pass_repartidor] , (err,rows) => {
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