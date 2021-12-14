const sedes = {};
const { json } = require("express/lib/response");


sedes.list = (req, res) => {
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query(`SELECT 
                        s.id AS id,
                        s.nombre AS nombre,
                        COUNT(a.id) AS alumnos               
                    FROM sede s
                    LEFT JOIN alumno a ON a.sede_id = s.id
                    group by s.id;
                    `
            , (err, sedes)=>{
            if(err){
                res.json(err);
            }
            res.render('sedes/container',{
                data: sedes
            });
        });
    });
};

sedes.agregar = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query('INSERT INTO sede SET ?',[data],(err, sedes)=>{
            if(err){
                res.json(err);
            }
            res.redirect('/sedes');
        });
    });
};

sedes.eliminar = (req, res) => {
    const { id } = req.params
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query('DELETE FROM sede WHERE id = ?',[id],(err, alumnos)=>{
            if(err){
                // res.json(err);
                res.redirect('/sedes');
            }
            res.redirect('/sedes');
        });
    });
}

sedes.ver = (req, res) => {
    const { id } = req.params
    if(isNaN(id)){
        res.send("Id invalido, por favior utiliza las rutas predefinidas de la aplicacion")
    }
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query(`SELECT 
                        s.id AS id,
                        s.nombre AS nombre,
                        COUNT(a.id) AS alumnos               
                    FROM sede s
                    LEFT JOIN alumno a ON a.sede_id = s.id
                    WHERE s.id = ?
                    GROUP BY s.id;

                    SELECT 
                        a.id AS id,
                        a.nombre AS nombre,
                        a.apellido AS apellido,
                        a.sexo AS sexo,
                        DATE_FORMAT(a.fecha_nacimiento, "%d/%m/%Y") AS fecha_nacimiento,
                        foto AS foto,
                        s.nombre AS sede
                    FROM alumno a
                    INNER JOIN sede s ON s.id = a.sede_id and s.id = ?;
                    `
            , [id,id],(err, results, fields)=>{
            if(err){
                res.json(err);
            }
            res.render('sedes/actualizar',{
                data: results[0][0] || [],
                alumnos: results[1]
            });
        });
    });
}

sedes.actualizar = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    req.getConnection((err, conn) => {
        if(err){
            res.json(err);
        }
        conn.query('UPDATE sede set ? WHERE id = ?',[data,id],(err, alumnos)=>{
            if(err){
                res.json(err);
            }
            res.redirect('/sedes');
        });
    });
}


module.exports = sedes;