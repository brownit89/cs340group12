function deleteCard(id){
	$.ajax({
		url: '/card/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
