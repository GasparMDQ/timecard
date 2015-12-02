if (Meteor.isClient) {
    Template.daily_summary.helpers({
        tasks: function () {
            var tasks, groups;
            var response = {};
            tasks = Tasks.find({
                    'end_time': {$not: ''},
                    'start_time': {
                        $gte: moment().startOf('day').valueOf(),
                        $lte: moment().endOf('day').valueOf()
                    }
                }, {
                    sort: {
                        start_time: -1
                    }
                }
            ).fetch();
            groups = _.groupBy(tasks, function (task) {
                return task.name;
            });
            _.each(groups, function (group, name) {
                response[name] = {};
                response[name].name = name;
                response[name].duration = 0;
                _.each(group, function (task){
                    response[name].duration += task.end_time - task.start_time;
                })
            });
            return _.toArray(response);
        }
    });
}
