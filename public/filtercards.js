function filterCardsByManaCost(){
	var mana_cost_filter = document.getElementById('mana_cost_filter').value
	window.location = '/card/filter/' + parseInt(mana_cost_filter)
}
