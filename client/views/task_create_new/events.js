if (Meteor.isClient) {
    Template.task_new.events({
        'submit #task_new_form': function (e) {
            e.preventDefault();
            var task = {};
            task._id = this._id;
            task.name = $('#taskName').val();
            task.subtask = $('#subTaskName').val();
            task.projectcode = $('#projectCode').val();
            task.start_time = moment().millisecond(0).valueOf();

            //todo task validation
            if (task.name !== '') {
                Meteor.call('createTask', task, function (error, result) {
                    if (error) {
                        alert(error.message);
                    } else {
                        Router.go('/');
                    }
                });
            } else {
                alert('You need to input a task name');
            }
            $('#taskName').val('');
            $('#subTaskName').val('');
            $('#projectCode').val('');
        }
    });
}
