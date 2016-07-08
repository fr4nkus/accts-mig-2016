var mysql = require('mysql');
var mongo = require('mongodb');

var mydb = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : process.env.MYSQL_PASS,
  database : 'ronin_development'
});

var mongdb = new mongo.Db('ronin', new mongo.Server('localhost',22892, {}), {});

mydb.connect();

mydb.query(

	'SELECT				\
		i.invoiced AS raised,	\
		i.id AS invoice_number,	\
		a.name AS agency,	\
		cl.name AS client,	\
		i.paid AS payment_received,	\
		ii.units AS units_worked,	\
		ii.rate,		\
		ii.vat,			\
		ii.net,			\
		ii.gross,		\
		ii.description,		\
		ii.id AS detail_id	\
	FROM				\
		agents a,		\
		contracts co,		\
		clients cl,		\
		invoices i,		\
		invoice_items ii	\
	WHERE ii.invoice_id = i.id	\
	AND i.contract_id = co.id	\
	AND co.agent_id = a.id		\
	AND co.client_id = cl.id	\
					\
	ORDER BY i.invoiced, ii.id ASC ',

  function(err, rows, fields) {

		if (!err)
			console.log('The solution is: ', rows);
		else
			console.log('Error while performing Query.');
	}
);

mydb.end();
