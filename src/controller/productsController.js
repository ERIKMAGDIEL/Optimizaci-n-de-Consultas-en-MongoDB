const Producto = require("../models/Products");


//Consulta con filtros y ordenamiento
const consulta1 = async (req, res) => {
   try {
       const result = await Producto.find({ 
           categoria: "Electrónica", 
           precio: { $gte: 500, $lte: 1000 } 
       }).sort({ precio: -1 }).explain("executionStats");


       res.status(200).json({ message: "Consulta realizada con éxito.", executionStats: result.executionStats });
   } catch (error) {
       res.status(500).json({ error: "Error al realizar la consulta." });
   }
};

//Consulta con agregación para calcular el precio promedio
const consulta2 = async (req, res) => {
   try {
       const result = await Producto.aggregate([
           { $match: { categoria: "Electrónica" } },
             {
               $group: { 
                   _id: "$categoria", 
                   precioPromedio: { $avg: "$precio" }
               }
            }
       ]).explain("executionStats");

       res.status(200).json({ message: "Consulta realizada con éxito.", executionStats: result.executionStats });
   } catch (error) {
       res.status(500).json({ error: "Error al realizar la consulta." });
   }
};
 

 //Consulta con filtros complejos y agrupación
//Esta consulta busca productos que cumplen con ciertos criterios de precio y stock. Luego, agrupa los resultados por categoría de producto y calcula dos valores:

const consulta3 = async (req, res) => {
   try {
       const result = await Producto.aggregate([
           { $match: { precio: { $gte: 100 }, stock: { $gte: 5 } } },
           { $group: { _id: "$categoria", total: { $sum: 1 }, precioPromedio: { $avg: "$precio" } } }
       ]).explain("executionStats");

       res.status(200).json({ message: "Consulta realizada con éxito.", executionStats: result.executionStats });
   } catch (error) {
       res.status(500).json({ error: "Error al realizar la consulta." });
   }
};
 

const createIndexes = async (req, res) => {
   try {
       const productoCollection = Producto.collection;

       // Índice compuesto para la consulta 1, que filtra por categoría y precio y los ordena
       await productoCollection.createIndex({ categoria: 1, precio: 1 }, { name: "categoria_precio_index" });

       // Índice para la consulta 2, que busca por categoría para calcular el precio promedio
       await productoCollection.createIndex({ categoria: 1 }, { name: "categoria_index" });

       // Índice compuesto para la consulta 3, que filtra por precio y stock
       await productoCollection.createIndex({ precio: 1, stock: 1 }, { name: "precio_stock_index" });

       // Índice compuesto para la consulta 3, que agrupa por categoría y precio
       await productoCollection.createIndex({ categoria: 1, precio: -1, stock: 1 }, { name: "categoria_precio_stock_index" });

       res.status(201).json({
           message: "Índices creados con éxito."
       });
   } catch (error) {
       res.status(500).json({
           error: "Error al crear los índices."
       });
       console.log(error);
   }
};


module.exports = {
   consulta1,
   consulta2,
   consulta3,
   createIndexes
   
};
