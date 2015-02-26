module.exports = function(app) {
	var couchbase = require("couchbase");

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	// app.get('*', function(req, res) {
	// 	res.sendfile('./public/index.html');
	// });


	app.get('/testCB', function(req, res) {


		console.log(" am here to test CB ");

		// Connect to Couchbase Server

		var cluster = new couchbase.Cluster('127.0.0.1:8091');
		var bucket = cluster.openBucket('beer-sample', function(err) {
		  if (err) {
		    // Failed to make a connection to the Couchbase cluster.
		    throw err;
		  }

		  // Retrieve a document

		  bucket.get('aass_brewery-juleol', function(err, result) {
		    if (err) {
		      // Failed to retrieve key
		      throw err;
		    }

		    var doc = result.value;

		    console.log(doc.name + ', ABV: ' + doc.abv);
		    
		    // Store a document

		    doc.comment = "Random beer from Norway";

		    bucket.replace('aass_brewery-juleol', doc, function(err, result) {
		      if (err) {
		        // Failed to replace key
		        throw err;
		      }

		      console.log(result);

		      // Success!
		      process.exit(0);
		    });
		  });
		});
	});

};