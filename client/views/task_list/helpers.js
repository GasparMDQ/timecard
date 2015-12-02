if (Meteor.isClient) {
    Template.task_list.helpers({
        tasks: function () {
            return Tasks.find({'end_time': {$not: ''}}, {sort: {start_time: -1}});
        },
        elapsed: function () {
            var interval = moment.duration(this.end_time - this.start_time);
            return interval.get('hours') + 'h ' +
                interval.get('minutes') + 'm ' +
                interval.get('seconds') + 's ';
            return interval.humanize();
        },
        started: function (){
            return moment(this.start_time).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
    });
}
