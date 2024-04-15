const { response } = require("express");

const usuariosGetAll = (req, res = response)=>{
    const { filter = '', page = 1, limitpage = 10 } = req.query;
    res.status(200).json({
        msg: "GET API - Controllers",
        filter,
        page,
        limitpage
    });
};

const usuariosPost = (req, res = response)=>{
    const body = req.body;              // opcion uno
    const{ nombre, edad} = req.body;    // opcion dos
    res.status(200).json({
        msg: "POST API - Controllers",
        body,
        nombre, 
        edad
    });
};

const usuariosUpdate = (req, res = response)=>{
    const { id } = req.params;
    res.status(200).json({
        msg: "PUT API - Controllers",
        id
    });
};

const usuariosDelete = (req, res = response)=>{
    res.status(200).json({
        msg: "DELETE API - Controllers"
    });
};


module.exports = {
    usuariosGetAll,
    usuariosPost,
    usuariosUpdate,
    usuariosDelete
}