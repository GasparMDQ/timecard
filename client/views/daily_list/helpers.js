if (Meteor.isClient) {
    Template.daily_list.helpers({
        tasks: function () {
            return Tasks.find({
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
            );
        }
    });
}
