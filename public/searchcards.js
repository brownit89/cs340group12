function searchCardsByName(){
	var card_name_search_string = document.getElementById('card_name_search_string').value
	window.location = '/card/search/' + encodeURI(card_name_search_string)
}
