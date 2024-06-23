const { response, json } = require("express");
const {Categoria } = require("../models");
//***********************************************************//
const obtenerCategorias = async(req, res = response)=>{
    
    const {desde = 0, limite = 100}  = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    
    res.status(200).json({total, categorias});
}
//***********************************************************//
const obtenerCategoriaById = async(req, res = response)=>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    // if (!categoria) {
    //     return res.json({msg: `No existe ${id} en BD`});
    // }
    res.json({ categoria});
}
//***********************************************************//
const crearCategoria = async(req, res = response)=>{
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDb = await Categoria.findOne({nombre});
    if (categoriaDb) {
        return res.status(400).json({ msg: `La categoria ${categoriaDb.nombre} ya existe en la BD`});
    }

    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    const categoria = new Categoria(data);
    await categoria.save();
    res.status(200).json({msg: 'Se creo la categoria', categoria});

}
//***********************************************************//
const actualizarCategoria = async(req, res = response)=>{
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuarioAutenticado.id;
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
    res.json(categoria);
}
//***********************************************************//
const borrarCategoria = async(req, res = response)=>{
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, { new :true });
    res.json(categoria);
}
//***********************************************************//
module.exports = {
    obtenerCategorias,
    obtenerCategoriaById,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}