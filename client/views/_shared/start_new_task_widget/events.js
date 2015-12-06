if (Meteor.isClient) {
    Template.start_new_task_widget.events({
        'submit #create_task': function (e) {
            e.preventDefault();
            var data = $('#new_task_name').val();
            if (data !== '') {
                Meteor.call('createTask', data, moment().millisecond(0).valueOf(), function (error, result) {
                    if (error) {
                        alert(error.message);
                    }
                });
            } else {
                alert('You need to input a task name');
            }
            $('#new_task_name').val('');
        }
    });
}
