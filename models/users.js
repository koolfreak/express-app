'use strict'

var bcrypt   = require('bcrypt-nodejs');
var md5 = require('md5');
// https://github.com/lorenseanstewart/sequelize-crud-101
// https://www.npmjs.com/package/datatables-query

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    paranoid: true,
    underscored: true
  });

  // force: true will drop the table if it already exists
  Users.sync({force: false}).then(() => {
    // Table created
    /*return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });*/
  });

  // http://docs.sequelizejs.com/manual/tutorial/hooks.html
  /*Users.hook('beforeCreate', (user, options) => {
    bcrypt.hash(user.password, null, null, function(err, hash) {
      console.log(hash);
      user.password = hash;
    });
  });*/
  Users.prototype.validPassword = function(password) {
    var hash = md5(password);
    return this.password === hash; // true
  }
  /* return for table listing purpose  */
  Users.prototype._list = function() {
    var full_name = this.last_name+', '+this.first_name;
    return [full_name, this.id];
  };

  return Users;
};