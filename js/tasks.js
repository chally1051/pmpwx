function loadTasksByDate(date,panelid){
	var host = location.host;
	$.post(
		'/wechat/pmpmobile/Task/getCurrentDateTasks',
		{CurrentDate:date},
		function(data){
			buildTaskPanels(data.data,date,panelid);
		},
		'json'
	);
}

function buildTaskPanels(tasks,currdate,panelid){
	if (tasks && tasks.length > 0) {
		var selectdate = currdate;
		selectdate = currdate + '  任务列表';
		var listpanel = $('#'+panelid);
		var box = buildList(listpanel,selectdate);
		for (var i = 0; i < tasks.length; i++) {
			var task = tasks[i];
			var taskpanel = buildTaskPanel(task,box);
		}
	} else {
		$('#'+panelid).addClass('tasks-panel');
		var msg = $('<span>');
		msg.text('今天没有任务哦~~').appendTo($('#'+panelid));
		//$('#'+panelid).appendChild(msg);
	}
}

function buildList(listpanel,title){
	var list = $('<div>',{class : 'weui_panel weui_panel_access'}).appendTo(listpanel);
	var head = $('<div class="weui_panel_hd"></div>').appendTo(list);
	head.text(title);
	var box = $('<div class="weui_panel_bd"><div>').appendTo(list);
	return box;
}

function buildTaskPanel(task,listpanel){
	var panel = $('<div>',{id : task.pk_task,class : 'weui_media_box weui_media_text'});
	panel.appendTo(listpanel);
	var title = $('<h4>',{class : 'weui_media_title'}).appendTo(panel);
	title.text(task.taskname);
	//var titlename = $('<span>').text(task.taskname).appendTo(title);
	//var taskdate = $('<li>').text(task.date).appendTo(panel);
	var taskcontent = $('<p>',{class : 'weui_media_desc'}).text(task.description).appendTo(panel);
	panel.on('click',{taskid:task.pk_task},onTaskClick);
	return panel;
}

function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
}

function onTaskClick(taskid){
	//alert(taskid.data.taskid);
	location.href = ('tasklogs.html?taskid='+taskid.data.taskid);
}

var _loglistid = '';
function loadTaskLog(taskid,loglistid){
	_loglistid = loglistid;
	var logs = [];
	for (var i = 0; i < 5; i++) {
		var log = {};
		log.id = i;
		log.date = ('2016-3-' + (i+1));
		log.content = log.date + "完成了一次" + (i+1) + "杀";
		log.per = ((20 * (i+1)) + '%');
		logs[i] = log;
	}
	var host = location.host;
	$.post(
		'/wechat/pmpmobile/Task/getWorknotes',
		{pk_task : taskid},
		function(data){
			buildTaskLogs(data.data);
		},
		'json'
	);
}

function buildTaskLogs(logs){
	$('#'+_loglistid).empty();
	if (logs && logs.length > 0) {
		var listpanel = $('#'+_loglistid);
		var box = buildList(listpanel,'日志');
		for (var i = 0; i < logs.length; i++) {
			var log = logs[i];
			buildLogPanel(log,box);
		}
	} else {
		$('#'+_loglistid).addClass('tasks-panel');
		var msg = $('<span>');
		msg.text('还没有开始填写任务~~').appendTo($('#'+_loglistid));
	}	
}

function buildLogPanel(log,logpanel){
	var panel = $('<div>',{id : log.pk_worknotes,class : 'weui_media_box weui_media_text'});
	panel.appendTo(logpanel);
	var title = $('<h4>',{class : 'weui_media_title'}).appendTo(panel);
	
	var percent = parseInt(log.percent);
	
	title.text(log.workdate + '    进度: ' + percent + '%');
	//var titlename = $('<span>').text(task.taskname).appendTo(title);
	//var taskdate = $('<li>').text(task.date).appendTo(panel);
	var taskcontent = $('<p>',{class : 'weui_media_desc'}).text(log.worknote).appendTo(panel);
	panel.on('click',onlogClick);
}

function onlogClick(){
	//history.back();
}

function calenderimgclick(){
	if (history.length > 1){
		history.back();
	} else {
		location.href = 'taskcalendar.html'
	}
}

function pencilimgclick(taskid,date){
	$('.logback').css('display','block');
	$('.logcontent').css('display','block');
}

function confirmlog(data){
	//$('#dialog1').css('display','block');
	//var url = "/wechat/pmpmobile/Task/addWorknote?pk_task="+ data.data.taskid + '&' + $("form").serialize();
	//alert(url); 
//	$.ajax({
//		url : url,
//		type : 'POST',
//		success : function(data){
//			if(data.status){
//				cancllog();
//			}else{
//				alert(data.message);
//			}
//		},
//		ajaxError
//	}
//	);
	var paramarr = $("form").serializeArray();
	var param = {};
	param['pk_task'] = data.data.taskid;
	for (var i = 0; i < paramarr.length; i++) {
		param[paramarr[i].name] = paramarr[i].value;
	}
	var url = "/wechat/pmpmobile/Task/addWorknote";
	$.post(
		url,
		param,
		function(data){
			if(data.status){
				cancllog();
			}else{
				alert(data.message);
			}
		}
	);
}

function cancllog(data){
	$('.logback').css('display','none');
	$('.logcontent').css('display','none');	
}
