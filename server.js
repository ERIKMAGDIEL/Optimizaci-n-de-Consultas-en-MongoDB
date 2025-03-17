require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database'); 
const productsRoutes = require('./src/routes/productsRoutes'); // Conexión a MongoDB


const app = express();
connectDB();

app.use(express.json());
app.use('/api', productsRoutes);


const PORT = process.env.PORT || 3005;
app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
} );


 