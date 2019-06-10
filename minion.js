module.exports = function(){
	var express = require('express');
	var router = express.Router();

	function getMinions(res, mysql, context, complete){
		console.log('minions are called');
		mysql.pool.query("select * from card inner join card_minion on card.card_id = card_minion.card_id inner join minion on card_minion.minion_id = minion.minion_id", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.minion = results;
	complete();

	});
}
	function getMinion(res, mysql, context, id, complete){
		var sql = mysql.pool.query("select * from minion where minion_id = ?");
		var inserts = [id];
		mysql.pool.query(sql, inserts, function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.minion = results[0];
	complete();

	});
}

	function getMinionMechanics(res, mysql, context, complete){
		mysql.pool.query("select * from card inner join card_minion on card.card_id = card_minion.card_id inner join minion on card_minion.minion_id = minion.minion_id inner join minion_mechanics on minion.minion_id = minion_mechanics.minion_id inner join mechanics on minion_mechanics.mech_id = mechanics.mech_id;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.spell = results;
	complete();

	});
}
	function getWeaponMechanics(res, mysql, context, complete){
		mysql.pool.query("select * from card inner join card_weapon on card.card_id = card_weapon.card_id inner join weapon on card_weapon.weapon_id = weapon.weapon_id inner join weapon_mechanics on weapon.weapon_id = weapon_mechanics.weapon_id inner join mechanics on weapon_mechanics.mech_id = mechanics.mech_id;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.spell = results;
	complete();

	});
}

router.get('/', function(req, res){
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["deleteMinion.js"];
	var mysql = req.app.get('mysql');
	getMinions(res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			res.render('minion', context);
		}
	}
});

router.get('/:id', function(req, res){
	callbackCount = 0;
	var context = {};
	context.jsscripts = ["selectedMinion.js", "updateMinion.js"];
	var mysql = req.app.get('mysql');
	getMinion(res, mysql, context, req.params.id, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 2){
			res.render('update-minion',context);
		}
	}
});
router.post('/', function(req, res){
	console.log(req.body)
	console.log('post is running')
	var mysql = req.app.get('mysql');
	var sql = "insert into card (card_name, rarity, description, mana_cost, card_type) values (?, ?, ?, ?, ?)";
	var inserts = [req.body.card_name, req.body.rarity, req.body.description, req.body.mana_cost, req.body.card_type];
	sql = mysql.pool.query(sql,inserts,function(error,results,fields){
		if(error){
			console.log(JSON.stringify(error));
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/minion');
		}

	});
});

return router;
}();
