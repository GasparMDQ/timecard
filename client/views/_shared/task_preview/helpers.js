if (Meteor.isClient) {
    Template.task_preview.helpers({
        elapsed: function () {
            var interval = moment.duration(this.end_time - this.start_time);
            return interval.get('hours') + 'h ' +
                interval.get('minutes') + 'm ' +
                interval.get('seconds') + 's ';
        },
        started: function (){
            return moment(this.start_time).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
    });
}
