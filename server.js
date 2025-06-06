const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'db-fastupnvj.cxssc0q0weny.ap-southeast-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'Jorang11*',
    database : 'db-fastupnvj'
});

// connect. 
connection.connect((err) => {
    if(err) {
        console.error('Error connecting to MySQL RDS: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL RDS as ID ' + connection.threadId);
});