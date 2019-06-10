module.exports = function(){
	var express = require('express');
	var router = express.Router();
	
	function getWeapons(res, mysql, context, complete){
		mysql.pool.query("select * from card inner join card_weapon on card.card_id = card_weapon.card_id inner join weapon on card_weapon.weapon_id = weapon.weapon_id", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.weapon = results;
	complete();

	});
}
router.get('/', function(req, res){
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["deleteMinion.js"];
	var mysql = req.app.get('mysql');
	getWeapons(res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			res.render('weapon', context);
		}
	}
});
/*
router.get('/', function(req, res){
	function serveWeapons(req,res){
		console.log("You asked me for some weapons?")
		var query = 'select weapon_id, attack_power, durability from weapon';
		var mysql = req.app.get('mysql');
		var context = {};
		
		function handleRenderingOfWeapons(error, results, fields){
			console.log(error)
			console.log(results)
			console.log(fields)
			//stores results of query inside context
			context.weapon = results;
			res.render('weapon', context)
		}
		//executes mysql query
		mysql.pool.query(query, handleRenderingOfWeapons)

	}

	function serveOneWeapon(req,res){
		console.log(req.params.weaponID);
		console.log(req.params);
		weaponID = req.params.weaponID

		var queryStr = "select weapon_id, attack_power, durability from weapon where weapon_id = ?"

		var mysql = res.app.get('mysql')
		var context = {};

		function handleRenderingOfOneWeapon(error, results, fields){
			console.log("results are " + results)
			context.weapon = results[0]
			console.log(context)

		if(error){
			console.log(error)
			res.write(error)
			res.end();
		}else{
			res.render('serverWeapon', context);
		}
		}
		var queryStr = mysql.pool.query(queryStr, weaponID, handleRenderingOfOneWeapon);
	}

	router.get('/', serveWeapons);
	router.get('/:weaponID', serveOneWeapon);
	*/
	return router;

}();
