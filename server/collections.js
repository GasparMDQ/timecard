Meteor.publish("tasks", function () {
    //todo filter tasks by user
    if (null === this.userId) {
        this.stop()
    }
    return Tasks.find({"user_id": this.userId}, {sort: {"name": 1}});
});