# Validacion de usuarios y proteccion de rutas con JWT y Postgres

Aplicacion de backend, que permite validar datos de usuario desde una base de datos y genera un jwt para usar en rutas protegidas.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)
![](https://img.shields.io/badge/JSON%20Web%20Tokens-000000.svg?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white)

## Extracto codigo de validacion de endpoint.

```
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



```

## Estructura de Carpetas.
```
└── 📁FBI System
    └── .env    
    └── 📁functions
        └── validarUsuarios.js    
    └── 📁pages
        └── dashboard.html
        └── index.html
    └── 📁public
        └── 📁css
            └── style.css
        └── 📁font
            └── CFGlitchCity-Regular.ttf
        └── 📁images
            └── avatar.png
            └── fondo - copia.jpg
            └── fondo.jpg
            └── logo.png
        └── 📁scripts
            └── dashboard.js
            └── script.js    
    └── server.js
```





## Dependencias.

```
  "dependencies": {
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.12.0"
  }
```

## Instalación.

```
    git clone https://github.com/VictorTapiaEgana/registroconjwt.git
    npm install
    npm start

```

## .env File
```
  SECRETKEY = HoLiWiS
  SERVER_PORT = 3010
  DB_USER = postgres
  DB_PASS = "TU CONTRAEÑA DE BBDD"
  DB_NAME  = login
  DB_PORT = 5432
  DB_HOST = localhost

```

## Script de la base de datos.
```
CREATE DATABASE login
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```

## Script de la Tabla.
```
 CREATE TABLE IF NOT EXISTS public.usuarios
(
    id integer NOT NULL DEFAULT nextval('usuarios_id_seq'::regclass),
    nombre character varying(20) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default",
    password character varying(30) COLLATE pg_catalog."default"
)
```

## Datos de prueba.
```
 INSERT INTO usuarios (nombre, email, password) VALUES ('victor', 'victor@gmail.com', '123');
```