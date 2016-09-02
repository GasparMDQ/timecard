if (Meteor.isClient) {
    Template.task_summary.helpers({
        elapsed: function () {
            return humanizeTimestamp(this.duration);
        }
    });
}
