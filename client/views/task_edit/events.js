if (Meteor.isClient) {
    Template.task_edit.events({
        'submit #task_edit_form': function (e) {
            e.preventDefault();
            var task = {};
            task._id = this._id;
            task.name = $('#taskName').val();
            task.subtask = $('#subTaskName').val();
            task.projectcode = $('#projectCode').val();
            var startTime, endTime;
            startTime = moment($('#startTime').val()).valueOf();
            endTime = moment($('#endTime').val()).valueOf();
            task.start_time = isNaN(startTime) ? '' : startTime;
            task.end_time = isNaN(endTime) ? '' : endTime;

            //todo task validation
            if (task.name !== '') {
                Meteor.call('updateTask', task, function (error, result) {
                    if (error) {
                        alert(error.message);
                    }
                });
            } else {
                alert('You need to input a task name');
            }
        },
        'click #task_remove_button': function (e) {
            e.preventDefault();
            if (confirm('Are you sure you want to delete this task?\nTHIS ACTION CAN\'T BE UNDONE')) {
                Meteor.call('removeTask', this._id, function (error, result) {
                    if (error) {
                        alert(error.message);
                    } else {
                        Router.go('/');
                    }
                });
            }
        }
    });
}
