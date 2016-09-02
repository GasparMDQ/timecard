if (Meteor.isClient) {
    Template.current_task_widget.events({
        'click #stop_current_task': function (e) {
            e.preventDefault();
            Meteor.call('stopCurrentTask', moment().millisecond(0).valueOf(), function (error, result) {
                if (error) {
                    alert(error.message);
                }
            });
        }
    });
}
