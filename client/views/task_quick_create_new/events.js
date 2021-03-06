if (Meteor.isClient) {
    Template.task_quick_create_new.events({
        'submit #create_task': function (e) {
            e.preventDefault();
            var task = {
                'name': $('#new_quick_task_name').val(),
                'start_time': moment().millisecond(0).valueOf()
            };
            if (task !== '') {
                Meteor.call('createTask', task, function (error, result) {
                    if (error) {
                        alert(error.message);
                    }
                });
            } else {
                alert('You need to input a task name');
            }
            $('#new_quick_task_name').val('');
        }
    });
}
