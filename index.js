

require("dotenv").config();
const {PORT} = process.env || 4000
// const PORT = 4000
const server = require('./src/app.js');
const { conn } = require('./src/db.js');


conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log('server on port ',process.env.PORT); 
  });
});
