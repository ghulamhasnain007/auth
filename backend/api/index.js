const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors') 
const config = require('../src/config/server.config.js')
// const db = require('../src/config/db.config.js')
const bodyParser = require('body-parser');
const {router: userRoutes} = require('../src/routes/user.routes.js');
const mysqlPool = require('../src/config/db.config.js');
const { corsConfig } = require('../src/config/cors.config.js');

const PORT = config.PORT
const app = express();

app.use(cors(corsConfig))
app.use(cookieParser())
app.use(bodyParser.json());
app.use('/api', userRoutes)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send('Something went wrong!');
});


mysqlPool.query("SELECT 1")
.then(() => {
  console.log('db connection  succeeded.')
  app.listen(PORT,
            () => console.log(`server started at PORT ${PORT}`))
    })
    .catch(err => console.log('db connection failed. \n' + err))


// async function connectDB(){
//     try{
//         const db = mysql.createConnection({
//             host: config.host,
//             user: config.user,
//             password: config.password,
//             database: config.database
//         })
//         db.connect((err) => {
//             if (err) {
//               console.error('Error connecting to MySQL: ' + err.stack);
//               return;
//             }
//             console.log('Connected to MySQL as ID ' + db.threadId);
//           });
//     }
//     catch(error){
//         console.log(error.message);
//     }

// }
// connectDB()
// .then(() => console.log('DB Connected'))
// .catch((error) => console.log("something went wrong"))



// app.listen(()=>{
//     console.log(`Server up and running on PORT ${PORT}`);
// })

// module.exports = app;




// const app = express();
// const PORT =  3000;
// // Middleware
// app.use(express.json());
// // MySQL Connection
// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'wahaj',
//   password: 'Hasnain@123',
//   database: 'authentication'
// });
// // Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     console.error('Error connectin to MySQL: ' + err.message);
//     return;
//   }
//   console.log('Connected to MySQL as ID ' + db.threadId);
// });
// // Routes

// app.post('/api/register', async (req, res) => {
//   try {
//       const { username, email, password } = req.body;
//       const hashedPassword = await createHash(password);
  
//       const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//       db.query(query, [username, email, hashedPassword], (err) => {
//           if (err) {
//               console.error(err.message);
//               return res.status(500).send('Error: ' + err.message);
//           }
//           res.status(201).send('User created successfully.');
//       });
//   } catch (error) {
//       res.status(500).json({ message: "Something went wrong" });
//   }
// });


// app.get('/api/users', (req, res) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) {
//       console.error('Error executing query: ' + err.stack);
//       res.status(500).send('Error fetching users');
//       return;
//     }
//     res.json(results);
//   });
// });
// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express')
// const app = express();
// require('express-async-errors')

// const db = require('./'),
//     // employeeRoutes = require('./controllers/employee.controller')


// //middleware
// app.use(express.json())
// app.use('/api/employees', employeeRoutes)


//first make sure db connection is successful
//then start the express server.
