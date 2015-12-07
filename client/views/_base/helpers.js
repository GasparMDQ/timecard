Tracker.autorun(function(){
    var title = 'TimeCard - ';
    var task = Session.get("current_task");
    if(typeof task !== 'undefined') {
        title += task.name;
    } else {
        title += 'no task';
    }
    document.title = title;
});