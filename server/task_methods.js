Meteor.methods({
    createTask: function (task) {
        if (task.name !== '') {
            task.user_id = Meteor.userId();
            task.end_time = '';
            Tasks.update({'end_time': ''}, {$set: {'end_time': task.start_time}}, {multi: true});
            Tasks.insert(task);
        } else {
            throw new Meteor.Error("wrong-data",
                "You need to input a task name");
        }

    },
    updateTask: function (task) {
        //todo validate task
        //todo check for overlapping tasks
        Tasks.update({
            '_id': task._id,
            'user_id': Meteor.userId()
        }, {
            $set: {
                'name': task.name,
                'subtask': task.subtask,
                'projectcode': task.projectcode,
                'start_time': task.start_time,
                'end_time': task.end_time
            }
        });
    },
    stopCurrentTask: function (endTime) {
        if (endTime !== '') {
            Tasks.update({'end_time': '', 'user_id': Meteor.userId()}, {$set: {'end_time': endTime}}, {multi: true});
        } else {
            throw  new Meteor.Error("wrong-data",
                "You need to enter a valid time");
        }
    },
    removeTask: function (id) {
        Tasks.remove({
            '_id': id,
            'user_id': Meteor.userId()
        });
    }
});
