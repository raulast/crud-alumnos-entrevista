require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

// impor routes
const alumnosRoutes = require('./routes/alumnos')
const sedesRoutes = require('./routes/sedes')
const appRoutes = require('./routes/app')

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT ||  3306,
    database: process.env.DB_DATABASE || 'db',
    multipleStatements: true
},'single'));
app.use(express.urlencoded({extended:true}));

//routes
app.use('/',appRoutes);
app.use('/alumnos',alumnosRoutes);
app.use('/sedes',sedesRoutes);

//static files
app.use(express.static(path.join(__dirname,"..","public")));

app.listen(app.get('port'), ()=>{
    console.log("Server on port "+app.get('port'));
});