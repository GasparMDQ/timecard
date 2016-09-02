if (Meteor.isClient) {
    Template.task_edit.onRendered(function () {
        Session.set('start_time', '');
        Session.set('end_time', '');
    });

    Template.task_edit.helpers({
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
            Session.set('start_time', this.start_time !== ''?moment(this.start_time).format('YYYY-MM-DDTHH:mm:ss'):'');
            Session.set('end_time', this.end_time !== ''?moment(this.end_time).format('YYYY-MM-DDTHH:mm:ss'):'');
            return {
                'start_time': Session.get('start_time'),
                'end_time': Session.get('end_time')
            }
        }

    });
}
