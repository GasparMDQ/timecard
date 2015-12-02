if (Meteor.isClient) {
    Template.task_summary.helpers({
        elapsed: function () {
            var interval = moment.duration(this.duration);
            return interval.get('hours') + 'h ' +
                interval.get('minutes') + 'm ' +
                interval.get('seconds') + 's ';
        }
    });
}
