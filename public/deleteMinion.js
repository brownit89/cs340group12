function deleteMinion(id){
	$.ajax({
		url: '/minion/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
