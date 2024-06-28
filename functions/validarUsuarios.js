const Pool = require('pg-pool');
const jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY;

const config ={
        user:    process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME,
        port:    process.env.DB_PORT,
        host:    process.env.DB_HOST
};

let pool = new Pool(config);

async function GenerarToken(nombre,email){
  
    return new Promise((resolve, reject) => {

                jwt.sign({
                   exp: Math.floor(Date.now() / 1000) + 120,
                   nombre,
                   email
                }, SECRETKEY,(err,token)=>{
                    
                    if (err) {

                        reject({status:err});

                    } else {                        

                        resolve({status:token});

                    } 
          
      })

    });

};

async function validarUsuarios (nombre, password){  
   
    let cliente = '';

    try {       
        
        cliente = await pool.connect()
        const consulta = 'SELECT nombre,password,email FROM usuarios WHERE nombre = $1;';
        const variables = [nombre];
        const resultado = await cliente.query(consulta,variables);
        
        if( resultado.rowCount > 0){
           
            if( resultado.rows[0].password == password){
               
                 const token = await GenerarToken(nombre,resultado.rows[0].email)
                 return token;

            }else{

                return   {error:`401 Unauthorized`,
                          status:`Password incorrecto`};

            }

        }else{            
            
            return  {error:`401 Unauthorized`,
                     status:`Usuario incorrecto`};
        }
        

    } catch (error) {       
        console.log(error)
        return  {status:`Error de conexion`};

    } finally{

        // cliente.release();

    }

 
};

module.exports =  validarUsuarios;