require('dotenv').config({ path: '.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const tenantApi = require('./routes/tenantRoutes')
const dockerSecret = require('./utils/dockersecret');
const app = express();
const port = process.env.BACKEND_PORT || 3000;

// load environmental dependent MongoDB configuration
let db = process.env.MONGO_DB_STRING
if (process.env.NODE_ENV === "production") {
  db = dockerSecret.read('MONGO_DB_STRING')
}
mongoose.Promise = global.Promise;
mongoose.connect(db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not be connected: ' + error)
  }
)

// enable cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// publish API
app.use('/api/tenants', tenantApi)

// start app
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})