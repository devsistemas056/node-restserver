const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONDODB_ATLAS);
        // await mongoose.connect(process.env.MONDODB_ATLAS, {
        //     useNewUrlParser : true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false
        // });
        console.log(`Base de datos Online`);

    } catch (error) {
        console.log(`Error al iniciar conexion a la base de datos: ${error}`);
        throw new Error(`Error al iniciar conexion a la base de datos: ${error}`);
    }
}

module.exports = {
    dbConnection
}