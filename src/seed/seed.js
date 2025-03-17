const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
   nombre: String,
   categoria: String,
   precio: Number,
   stock: Number,
   fecha: Date,
});

const Producto = mongoose.model("Producto", productoSchema);

async function insertarProductos() {
    try {
        await mongoose.connect("mongodb://localhost:27017/OptimizaciónConsultas");

        const temp = [];
        for (let i = 0; i < 50000; i++) {
            temp.push({ 
                nombre: `Product ${i}`,
                categoria: ['electronica', 'muebleria', 'ropa', 'calzado', 'hogar'][Math.floor(Math.random() * 5)],
                precio: Math.floor(Math.random() * 500) + 100,
                stock: Math.floor(Math.random() * 100) + 1,
                fecha: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
            });
        }

        await Producto.insertMany(temp);
        console.log("50,000 productos insertados correctamente.");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error insertando productos:", error);
        mongoose.connection.close();
    }
}

insertarProductos();
