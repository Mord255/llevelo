const express = require('express')
const routes = express.Router()
const axios = require('axios');
const fetch = require('node-fetch');
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

routes.post('/registerItem',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('INSERT INTO `TM_ITEM`(`NO_ITEM`, `ITEM_DESCRIPCION`, `UN_MEDI`, `CA_STOC`, `PREC`, `LI_IMAG`,`TIPO_ITEM`, `ES_ITEM`, `FE_CREA_USUA`, `CO_MODI_USUA`, `CO_CATE`, `CO_TIEN`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)' , [req.body.item_nombre,req.body.item_descripcion,req.body.item_medida,req.body.item_stock,req.body.item_precio,req.body.item_link_imagen,req.body.tipo_item,req.body.item_estado,req.body.item_fecha,req.body.item_modi_usua,req.body.item_codigo_categoria,req.body.item_codigo_tienda] , (err,rows) => {
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



//traer productos por id de tienda
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

routes.get('/getPedidosxTienda/:id_tienda',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('SELECT * FROM `TM_PEDIDOS` WHERE ID_TIENDA = ?' , [req.params.id_tienda] , (err,rows) => {
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

routes.post('/SaveTokenRepartidor',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            conn.query('UPDATE TM_USUA_REPARTIDOR SET RE_TOKEN_FCM = ? WHERE TM_USUA_REPARTIDOR.CO_REPARTIDOR = ?' , [req.body.token_fcm,req.body.co_repatidor] , (err,rows) => {
                if (err) {
                    return res.send(err)
                }else{
                    res.json(rows)
                }
            })
        }
    })
})//LISTO
routes.post('/SendNotificacion',(req,res)=>{
    req.getConnection((err,conn) => {
        if (err) {
            return res.send(err)
        }else{
            var notification = {
                'title' : 'Tienes un nuevo pedido',
                'text' : 'Llevelo Repartidor'
            };
            var fcm_tokens=['dGPxBm-VfEc:APA91bESI8AQ6vLdfstPqBjIXeItIPPhBLM1ZuMB9bwCUKzFmHgeCKl4xoA-NFpwnLqVJqILZ5WtDUV93l27aD1HIc-Ukr21rwZB9XJ-PaPsEX6NFGdDKWTk-cfpTZUN8XCJ0pN4sbzp'];

            var notification_body = {
                'notification':notification,
                'registration_ids':fcm_tokens
            }

            fetch('https://fcm.googleapis.com/fcm/send',{
                'method':'POST',
                'headers':{
                    'Authorization':'key='+'AAAAshVWmgw:APA91bFV_KddpUvhHWZdWoHqXufQRuDwl_21X28LkjA5ySPz9GrnOk4JDOKOpO2OaIJ-_kAdRI_yQ17fCppZSnQ9ha75maCgIo-x9bPy8M3aoAu6ogUy4CBn7HmvrXgEjf34pzHlngZa',
                    'Content-Type':'application/json'
                },
                'body':JSON.stringify(notification_body)
            }).then(()=>{
                res.status(200).send('Notificacion enviada con exito')
            }).catch((err)=>{
                res.status(200).send('Error en enviar la notificacion')
                console.log(err);
            })
        }
    })
})
// {
//     "notification":{
//       "title":"Ionic 4 Notification",
//       "body":"This notification sent from POSTMAN using Firebase HTTP protocol",
//       "sound":"default",
//       "click_action":"FCM_PLUGIN_ACTIVITY",
//       "icon":"fcm_push_icon"
//     },
//     "data":{
//       "landing_page":"second",
//       "price":"$3,000.00"
//     },
//       "to":"eadego-nig0:APA91bEtKx9hv50lmQmfzl-bSDdsZyTQ4RkelInfzxrPcZjJaSgDmok3-WQKV5FBu9hrMrkRrcCmf3arkGSviGltg5CyC2F9x1J2m0W7U8PxJ3Zlh7-_tL6VcFdb76hbaLIdZ-dOK15r",
//       "priority":"high",
//       "restricted_package_name":""
//   }



module.exports = routes