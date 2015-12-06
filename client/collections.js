Tasks = new Mongo.Collection("tasks");
TasksNames = new Mongo.Collection(null);
SubTasksNames = new Mongo.Collection(null);
Projectcodes = new Mongo.Collection(null);

Tracker.autorun(function () {
    Meteor.subscribe("tasks");
});

Tracker.autorun(function () {
    Tasks.find({'end_time': {$not: ''}}).forEach(function(task){
        TasksNames.upsert({'name': task.name}, {$set: {'name': task.name}}, {multi: true});
    });
    Tasks.find({'end_time': {$not: ''}}).forEach(function(task){
        SubTasksNames.upsert({'name': task.subtask}, {$set: {'name': task.subtask}}, {multi: true});
    });
    Tasks.find({'end_time': {$not: ''}}).forEach(function(task){
        Projectcodes.upsert({'name': task.projectcode}, {$set: {'name': task.projectcode}}, {multi: true});
    });
});