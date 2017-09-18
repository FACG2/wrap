// const connection = require('../database/db_connection.js');
// var emoji_replace = require('emoji-replace');
// require('env2')('./config.env');
//
// const storeMessage = (username, message, callback) => {
//   // This makes a database query, that returns an id, however, it returns an array of one, so then it is converted to just the id (as an object)
//   return connection.query(
//   `insert into messages (username , context) values($1 , $2) RETURNING username ,context`,
//    [username, message]
//   )
//   .then(dbRes => callback(null, dbRes.rows))
//   .catch((err) => {
//     callback(err);
//   });
// };
//
// const allMessages = (callback) => {
//   connection.query(`SELECT username, context,date FROM messages order by date desc`)
//   .then((dbRes) => {
//     var replac = dbRes.rows.map((message) => {
//       message.context = emoji_replace(message.context);
//       return message;
//     });
//     callback(null, replac);
//   })
//   .catch((err) => {
//     callback(err);
//   });
// };
//
// module.exports = {
//   storeMessage,
//   allMessages
// };
