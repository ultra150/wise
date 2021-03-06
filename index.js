var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME,
  multipleStatements: true
});


exports.myHandler = function(event, context, callback) {
    var queryTemplate = 'INSERT INTO `data` (`sn`, `site`, `location`, `mod`, `sid`, `type`, `cid`, `name`, `unit`, `value`, `raw`, `ts`) ' +
                'VALUES (?,?,?,?,?,?,?,?,?,?,?,?);';
    
    var query = '';
    var values = [];

    // When testing this through the lambda UI the packet is the event but when testing through the Api Gateway
    // the packet is wrapped in an additional object containing request metadata
    var packet;
    if(event.hasOwnProperty('body')){
        packet = JSON.parse(event.body);
    } else {
        packet = event;
    }

    // Construct the query
    packet.data.forEach(function(record){
        query += queryTemplate;
        values.push(
            packet.sn,
            packet.site,
            packet.location,
            packet.mod,
            packet.sid,
            packet.type,
            packet.cid,
            packet.name,
            packet.unit,
            record.value,
            record.raw,
            record.ts
        )
    });
    

    // Put it into the database
    connection.query(query, values, function(err, rows) {
        if(err){
            console.log(err);
            return context.fail(err);
        }
    
        return context.succeed({
          statusCode: 200,
          body: ""
        })
    });
}
