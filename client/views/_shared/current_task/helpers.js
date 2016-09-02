var countdownInterval;

function updateCountDown() {
    var countdownValue;
    var task = Session.get('current_task');
    if (typeof task !== 'undefined') {
        var start_time = moment(task.start_time);
        var now = moment();
        var interval = moment.duration(now.valueOf() - start_time.valueOf());

        countdownValue = ("0" + interval.hours()).slice(-2)  + ':' + ("0" + interval.minutes()).slice(-2) + ':' + ("0" + interval.seconds()).slice(-2);
    } else {
        countdownValue = '--:--:--';
    }
    Session.set('current_task_elapsed_time', countdownValue);
}

Template.current_task_widget.created = function () {
    updateCountDown();
    countdownInterval = Meteor.setInterval(updateCountDown, 1000);
};

Template.current_task_widget.destroyed = function () {
    Meteor.clearInterval(countdownInterval);
};

Template.current_task_widget.helpers({
    current_task: function () {
        return Session.get('current_task');
    },
    time_elapsed: function () {
        return Session.get('current_task_elapsed_time');
    }
});