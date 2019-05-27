function updateCard(id){
	$.ajax({
		url: '/cards/' + id,
		type: 'PUT',
		data: $('#update-card').serialize(),
		success: function(result){
			window.location.replace("./");
		}
	})
};
