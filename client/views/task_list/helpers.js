if (Meteor.isClient) {
    Template.task_list.helpers({
        tasks: function () {
            return Tasks.find({'end_time': {$not: ''}}, {sort: {start_time: -1}});
        }
    });
}
