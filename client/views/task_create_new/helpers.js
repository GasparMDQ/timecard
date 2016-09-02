if (Meteor.isClient) {
    Template.task_new.helpers({
        settings_task: function () {
            return {
                position: "bottom",
                limit: 5,
                rules: [
                    {
                        collection: TasksNames,
                        field: "name",
                        template: Template.taskPill,
                        sort: true
                    }
                ]
            };
        },
        settings_subtask: function () {
            return {
                position: "bottom",
                limit: 5,
                rules: [
                    {
                        collection: SubTasksNames,
                        field: "name",
                        template: Template.taskPill,
                        sort: true
                    }
                ]
            };
        },
        settings_projectcode: function () {
            return {
                position: "bottom",
                limit: 5,
                rules: [
                    {
                        collection: Projectcodes,
                        field: "name",
                        template: Template.taskPill,
                        sort: true
                    }
                ]
            };
        },
        isoDates: function () {
            return {
                'start_time': Session.get('start_time'),
                'end_time': Session.get('end_time')
            }
        }

    });
}
