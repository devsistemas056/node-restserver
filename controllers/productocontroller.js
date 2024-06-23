const { response, json } = require("express");
const { Producto } = require("../models");
//***********************************************************//
const productoGetAll = async(req, res = response)=>{
    
    const {desde = 0, limite = 100}  = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    
    res.status(200).json({total, productos});
}
//***********************************************************//
const productoGetById = async(req, res = response)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');
    // if (!categoria) {
    //     return res.json({msg: `No existe ${id} en BD`});
    // }
    res.json({ producto});
}
//***********************************************************//
const productoCreate = async(req, res = response)=>{
    const {estado, usuario, ...body} = req.body;
    const nombre = body.nombre.toUpperCase();
    const productoDb = await Producto.findOne({nombre});
    if (productoDb) {
        return res.status(400).json({ msg: `El producto ${productoDb.nombre} ya existe en la BD`});
    }

    const data = {
        ...body,
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    const producto = new Producto(data);
    await producto.save();
    res.status(200).json({msg: 'Se creo el producto', producto});

}
//***********************************************************//
const productoUpdate = async(req, res = response)=>{
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuarioAutenticado.id;
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});
    res.json(producto);
}
//***********************************************************//
const productoDelete = async(req, res = response)=>{
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, { new :true });
    res.json(producto);
}
//***********************************************************//
module.exports= {
    productoGetAll,
    productoGetById,
    productoCreate,
    productoUpdate,
    productoDelete
}