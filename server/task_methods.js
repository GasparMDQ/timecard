Meteor.methods({
    createTask: function(data){
        if(data !== '') {
            var newTask = {
                'name': data,
                'user_id': Meteor.userId(),
                'start_time': Date.now(),
                'end_time': ''
            };
            Tasks.update({'end_time': ''}, {$set: {'end_time': Date.now()}}, {multi: true});
            Tasks.insert(newTask);
        } else {
            throw new Meteor.Error("wrong-data",
                "You need to input a task name");
        }

    }
});
