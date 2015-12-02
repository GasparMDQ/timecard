Tasks = new Mongo.Collection("tasks");
TasksNames = new Mongo.Collection(null);

Tracker.autorun(function () {
    Meteor.subscribe("tasks");
});

Tracker.autorun(function () {
    Tasks.find({'end_time': {$not: ''}}).forEach(function(task){
        TasksNames.upsert({'name': task.name}, {$set: {'name': task.name}}, {multi: true});
    });
});