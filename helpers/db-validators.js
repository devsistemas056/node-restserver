const Role = require("../models/role")
const {Usuario, Categoria, Producto} = require('../models')

const validaRole = async (rol = '')=>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const validaSiExisteEmail = async(correo = '')=>{
    const existeCorreo = await Usuario.findOne({correo});
    if (existeCorreo) {
        //return res.status(400).json({ msg: "Este correo ya esta registrado"});
        throw new Error(`Este correo ${correo} ya esta registrado`);
    }
}

const validaSiExisteUsuarioById = async(id)=>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`Usuario con Id: ${id} no existe`);
    }
}

/*
    Categorias
*/
const existeCategoriaById = async(id)=>{
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`Categoria con Id: ${id} no existe`);
    }
}

const existeProductoById = async(id)=>{
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`Producto con Id: ${id} no existe`);
    }
}

module.exports = {
    validaRole,
    validaSiExisteEmail,
    validaSiExisteUsuarioById,
    existeCategoriaById,
    existeProductoById
}