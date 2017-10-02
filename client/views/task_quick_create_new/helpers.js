Template.task_quick_create_new.helpers({
    settings: function() {
        return {
            position: "top",
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
    }
});