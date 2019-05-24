module.exports = function(){
	var express = require('express');
	var router = express.Router();
	
	function serveMinions(req,res){
		console.log("You asked me for some minions?")
		var query = 'select minion_id, attack_power, health_power from minion';
		var mysql = req.app.get('mysql');
		var context = {};
		
		function handleRenderingOfMinions(error, results, fields){
			console.log(error)
			console.log(results)
			console.log(fields)
			//stores results of query inside context
			context.minions = results;
			res.render('minion', context)
		}
		//executes mysql query
		mysql.pool.query(query, handleRenderingOfMinions)

	}

	function serveOneMinion(req,res){
		console.log(req.params.minionID);
		console.log(req.params);
		minionID = req.params.minionID

		var queryStr = "select minion_id, attack_power, health_power from minions where minion_id = ?"

		var mysql = res.app.get('mysql')
		var context = {};

		function handleRenderingOfOneMinion(error, results, fields){
			console.log("results are " + results)
			context.minion = results[0]
			console.log(context)

		if(error){
			console.log(error)
			res.write(error)
			res.end();
		}else{
			res.render('serverMinion', context);
		}
		}
		var queryStr = mysql.pool.query(queryStr, minionID, handleRenderingOfOneMinion);
	}

	router.get('/', serveMinions);
	router.get('/:minionID', serveOneMinion);
	return router;

}();

