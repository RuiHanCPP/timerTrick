var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://ec2-54-163-225-41.compute-1.amazonaws.com:5432/d22g50co19tmnh';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });