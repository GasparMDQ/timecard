if (Meteor.isClient) {
    Template.task_preview.helpers({
        elapsed: function () {
            return humanizeTimestamp(this.end_time - this.start_time);
        },
        started: function (){
            return moment(this.start_time).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
    });
}
