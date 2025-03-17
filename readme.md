# Análisis del Impacto de los Índices en MongoDB

## Objetivo de la Tarea
El estudiante configurará distintos tipos de índices en MongoDB, analizará su impacto en el rendimiento de consultas y comparará los tiempos de ejecución con y sin índices. Se busca que el estudiante comprenda la importancia de los índices y cómo afectan la eficiencia en la recuperación de datos,  Node.js con Mongoose (Implementar un API).

## **Iniciar el Proyecto**

### Requisitos Previos:
Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js**: [Instalar Node.js](https://nodejs.org/)
- **MongoDB**: [Instalar MongoDB](https://www.mongodb.com/try/download/community) o usar un servicio en la nube como [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Manual de instalación 
npm  init --yes : Para inicializar. El —yes es para que todo lo que pregunte al ejecutarlo, automáticamente seleccione “yes”.

npm i nodemon -D :_ Para actualizar automáticamente.

npm install express mongodb dotenv cors express:permite manejar rutas y peticiones en el servidor. mongodb permite conectarse a una DB MongoDB. dotenv permite usar variables de entorno desde un archivo .env. cors permite que la API sea accesible desde otros dominios.

npm run dev: Para conectarse al servidor.


## 1. Modelo de Datos
Se utilizó una colección `products` con los siguientes campos:
- `nombre`: Nombre del producto (String).
- `categoria`: Categoría del producto (String).
- `precio`: Precio del producto (Number).
- `stock`: Cantidad en inventario (Number).
- `fecha`: Fecha de registro (Date).

## 2. Consultas sin Índices
### 5. Análisis
| Consulta | Tiempo (ms) |
|----------|------------|
| Consulta con filtros y ordenamiento|  45 |
| /Consulta con agregación para calcular el precio promedio |  28  |
| Agregación por stock  |  71  |

### 2.1 Resultados sin idices
consulta 1.
![get](/src/assets/consulta%201.png)

Consulta 2.
![get](/src/assets/consulta2.png)

Consulta 3.
![get](/src/assets/consulta3.png)


## 3. Creación de Índices
Se crearon los siguientes índices:
- `categoria_precio_index`
- `categoria_index`
- `precio_stock_index`
- `categoria_precio_stock_index`

Creación de index Thunder.
![post](/src/assets/crearIndex.png)

Creación de index Compass
![post](/src/assets/IndexCompass.png)

## 4. Consultas con Índices
### 5. Análisis
|| Consulta | Tiempo (ms) |
|----------|------------|
| Consulta con filtros y ordenamiento|  1 |
| /Consulta con agregación para calcular el precio promedio |  2  |
| Agregación por stock  |  139  |


consulta 1.
![get](/src/assets/consulta1Index.png)

Consulta 2.
![get](/src/assets/consulta2Index.png)

Consulta 3.
![get](/src/assets/consulta3Index.png)





## 6. Conclusión
El uso adecuado de índices en MongoDB mejora la eficiencia de las consultas, pero debe evaluarse su impacto en la inserción de datos.
