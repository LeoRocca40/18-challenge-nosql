const { connect, connection } = require('mongoose');

connect('mongodb://localhost/userthoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
