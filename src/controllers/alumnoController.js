const xlsx = require('xlsx');
const path = require('path');
const { json } = require("express/lib/response");

const alumnos = {};

alumnos.export = (req, res) => {
    const {sede_id} = req.query;
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query(`SELECT 
                        a.id AS id,
                        a.nombre AS nombre,
                        a.apellido AS apellido,
                        a.sexo AS sexo,
                        DATE_FORMAT(a.fecha_nacimiento, "%d/%m/%Y") AS fecha_nacimiento,
                        foto AS foto,
                        s.nombre AS sede
                    FROM alumno a
                    ${sede_id?'INNER':'LEFT'} JOIN sede s ON s.id = a.sede_id ${sede_id?'AND s.id ='+sede_id:''};
                    `
            , (err, alumnos)=>{
            if(err){
                res.json(err);
            }
            const workBook = xlsx.utils.book_new();
            const data = alumnos.map(alumno => {
                const foto = alumno.foto?req.protocol+"://"+req.get('host')+"/uploads/"+JSON.parse(alumno.foto).filename:"SIN FOTO";
                return [
                    alumno.id,
                    alumno.nombre,
                    alumno.apellido,
                    alumno.sexo,
                    alumno.fecha_nacimiento,
                    foto,
                    alumno.sede
                ]
            });
            const workSheetData =[
                [
                    'ID',
                    'NOMBRE',
                    'APELLIDO',
                    'SEXO',
                    'FECHA NACIMIENTO',
                    'FOTO',
                    'SEDE'
                ],
                ...data
            ]

            const sedeName = 0 < data.length ? data[0][6]:'';
            const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
            const ExlName = "alumnos - "+sedeName+" - "+Date.now()+".xlsx";
            xlsx.utils.book_append_sheet(workBook, workSheet,'alumnos');
            const ExlPath = path.join(__dirname,"../../public/exports/",ExlName);
            xlsx.writeFile(workBook,ExlPath);
            res.download(ExlPath)
        });
    });
};
alumnos.list = (req, res) => {
    const {sede_id} = req.query;
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query(`SELECT 
                        a.id AS id,
                        a.nombre AS nombre,
                        a.apellido AS apellido,
                        a.sexo AS sexo,
                        DATE_FORMAT(a.fecha_nacimiento, "%d/%m/%Y") AS fecha_nacimiento,
                        foto AS foto,
                        s.nombre AS sede
                    FROM alumno a
                    ${sede_id?'INNER':'LEFT'} JOIN sede s ON s.id = a.sede_id ${sede_id?'AND s.id ='+sede_id:''};

                    SELECT * FROM sede;
                    `
            , (err, results, fields)=>{
            if(err){
                res.json(err);
            }
            res.render('alumnos/container',{
                data: results[0],
                sedes: results[1],
                sede_id: sede_id || null
            });
        });
    });
};

alumnos.agregar = (req, res) => {
    const dataFile = req.file;
    var data = req.body;
    if (dataFile) {
        data.foto = JSON.stringify(dataFile);
    }
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query('INSERT INTO alumno SET ?',[data],(err, alumnos)=>{
            if(err){
                res.json(err);
            }
            res.redirect('/alumnos');
        });
    });
};

alumnos.eliminar = (req, res) => {
    const { id } = req.params
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query('DELETE FROM alumno WHERE id = ?',[id],(err, alumnos)=>{
            if(err){
                res.json(err);
            }
            res.redirect('/alumnos');
        });
    });
}

alumnos.ver = (req, res) => {
    const { id, sid } = req.params;
    if(isNaN(id)){
        res.send("Id invalido, por favior utiliza las rutas predefinidas de la aplicacion")
    }
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query(`SELECT 
                        a.id AS id,
                        a.nombre AS nombre,
                        a.apellido AS apellido,
                        a.sexo AS sexo,
                        DATE_FORMAT(a.fecha_nacimiento, "%Y-%m-%d") AS fecha_nacimiento,
                        foto AS foto,
                        a.sede_id
                    FROM alumno a
                    WHERE a.id = ?;

                    SELECT * FROM sede;
                    `
            , [id],(err, results, fields)=>{
            if(err){
                res.json(err);
            }
            res.render('alumnos/actualizar',{
                data: results[0][0] || [],
                sedes: results[1],
                sid: sid || null
            });
        });
    });
}

alumnos.actualizar = (req, res) => {
    const { id, sid } = req.params;
    const dataFile = req.file;
    var data = req.body;
    if (dataFile) {
        data.foto = JSON.stringify(dataFile);
    }
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query('UPDATE alumno set ? WHERE id = ?',[data,id],(err, alumnos)=>{
            if(err){
                res.json(err);
            }
            if(sid){
                res.redirect('/sedes/actualizar/'+sid);
            }else{
                res.redirect('/alumnos');
            }
        });
    });
}


module.exports = alumnos;