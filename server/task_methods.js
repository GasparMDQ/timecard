Meteor.methods({
    createTask: function(data, startTime){
        if(data !== '') {
            var newTask = {
                'name': data,
                'user_id': Meteor.userId(),
                'start_time': startTime,
                'end_time': ''
            };
            Tasks.update({'end_time': ''}, {$set: {'end_time': startTime}}, {multi: true});
            Tasks.insert(newTask);
        } else {
            throw new Meteor.Error("wrong-data",
                "You need to input a task name");
        }

    },
    stopCurrentTask: function(endTime){
        if(endTime !== '') {
            Tasks.update({'end_time': ''}, {$set: {'end_time': endTime}}, {multi: true});
        } else {
            throw  new Meteor.Error("wrong-data",
                "You need to enter a valid time");
        }
    }
});
