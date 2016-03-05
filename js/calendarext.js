$(document).ready(function() {
	//alert(window.location.host);
	$('#rendez-vous').on('rendezvous-change',function(event, rdv){
		var tasks = [];
		var curdate = rdv.format('%Y-%M-%D',rdv.getDate());
		for (var i = 0; i < 5; i++) {
			var task = {};
			task.id = i;
			task.taskname = '我的第'+i+'个任务';
			task.date = curdate;
			task.content = '这是我的第'+i+'个任务~~~';
			tasks[i] = task;
		}
		$('#tlist').empty();
		loadTasksByDate(curdate,'tlist');
		}
	).on('rendezvous-open', function(event, rdv) {
        var curdate = rdv.format('%Y-%M-%D',rdv.getDate());
        //alert(curdate);
        $('.rendezvous-input-date').val(curdate);
        loadTasksByDate(curdate,'tlist');
    }).RendezVous({
	        canClose: false,
	        openByDefault: true,
		    formats: {
		        display: {
		            date: '%Y-%M-%D'
		        },
		        data: {
		        	date: '%Y-%M-%D'
		        }
		    }
	    }
	);
});