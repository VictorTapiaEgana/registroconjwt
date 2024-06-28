const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const validarUsuarios = require('./functions/validarUsuarios');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(process.cwd(),'/public')));
app.use(express.static(path.join(process.cwd(),'/pages')));

function validaToken(req, res, next) {

    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

  
    
    if (token == null) return res.status(401).send('FALTA TOKEN DE VALIDACION !!!');

    jwt.verify(token, process.env.SECRETKEY, (err) => {
    
        if (err) return res.sendStatus(403).status('TOKEN CADUCADO O INVALIDO !!!');           
        next();

    });
};

app.get('/dashboard',validaToken,(req,res)=>{
  

    res.status(200).json({ status: 'Acceso permitido' });

});

app.get('/',(req,res)=>{
    
    res.sendFile(path.join(process.cwd(),'/pages/index.html'));    

});

app.post('/login', async(req,res)=>{

    const { nombre, password } = req.body;

       try {

            const resultado = await validarUsuarios(nombre,password);              
            res.status(200).send(resultado);            
        
       } catch (error) {

            console.log(error);

       }

});

app.listen(PORT,()=>{

    console.clear();
    console.log(`Holiwis en port: ${PORT}`);

});