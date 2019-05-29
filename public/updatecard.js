function updateCard(id){
	$.ajax({
		url: '/card/' + id,
		type: 'PUT',
		data: $('#update-card').serialize(),
		success: function(result){
			window.location.replace("./");
		}
	})
};
