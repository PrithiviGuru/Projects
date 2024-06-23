const mongoose = require('mongoose');

const url =  "mongodb://127.0.0.1:27017/tutorial_db";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url);
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
// const Sequelize = require("sequelize");


// const dbObj = {
//     user: "postgres",
//     host: "localhost",
//     database: "food",
//     password: "1234",
//     port: 5432,
//     dialect: "postgres",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };
// const sequelize = new Sequelize(dbObj.database, dbObj.user, dbObj.password, {
//     host: dbObj.host,
//     dialect: dbObj.dialect,
  
//     pool: {
//       max: dbObj.pool.max,
//       min: dbObj.pool.min,
//       acquire: dbObj.pool.acquire,
//       idle: dbObj.pool.idle
//     }
//   })

// const connectDB = async () => {
//     try {

//       await sequelize.authenticate();
//       console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
//   };

// const connectDB= async () => {
//     try {
//         // const sequelize  = new Sequelize({
//         //     user: dbObj.user,
//         //     host: dbObj.host,
//         //     database: dbObj.database,
//         //     password: dbObj.password,
//         //     port: dbObj.port
//         // })
//         // const conn = await client.connect();
        
//         // const res = await client.query('SELECT * FROM some_table')
//         console.log(`Postgres db connected`)
//         // await client.end()
//     } catch (error) {
//         console.log(error)
//         process.exit(1);
//     }
// }
// module.exports = connectDB;
