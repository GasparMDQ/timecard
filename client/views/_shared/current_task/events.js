if (Meteor.isClient) {
    Template.current_task_widget.events({
        'click #stop_current_task': function (e) {
            e.preventDefault();
            Meteor.call('stopCurrentTask', Date.now(), function (error, result){
                if (error) { alert(error.message); }
            });
        }
    });
}
