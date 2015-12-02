Tasks = new Mongo.Collection("tasks");

Meteor.publish("tasks", function () {
    return Tasks.find({"user_id": this.userId}, {sort: {start_time: -1}});
});
