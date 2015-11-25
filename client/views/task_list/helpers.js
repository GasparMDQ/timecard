if (Meteor.isClient) {
    Template.task_list.helpers({
        tasks: function () {
            return Tasks.find();
        }
    });
}
