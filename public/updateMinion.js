function updateMinion(id){
	$.ajax({
		url: '/minion/' + id,
		type: 'PUT',
		data: $('#update-minion').serialize(),
		success: function(result){
			window.location.replace("./");
		}
	})
};
