$(document).ready(function() {
	//alert(window.location.host);
	$('#rendez-vous').on('rendezvous-change',function(data,d1,d2,d3){
		// alert(d1.displayedDate);
		//d1.format('%Y-%M-%D',d1.getDate())
		var tasks = [];
		var curdate = d1.format('%Y-%M-%D',d1.getDate());
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
	).RendezVous({
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