'use strict';
var My = function() {};

//put your code here
My.getAll = function(callback) {
    var result = {};
    result.collection = [];
  
    var mysql = require('mysql');
    var conf = require(global.APP_DATA + 'configuration');
    var stmt = mysql.createConnection(conf.parameters);

    var sql = "\
select * from table \
";

    stmt.connect();
    stmt.query(sql, function(err, rows, fields) {
      
      rows.forEach(function(element, i) {
        result.collection.push(element);
      })
      
      callback(result);
        
    });
    stmt.end(); 
    
}

console.log(__filename);

module.exports = My;