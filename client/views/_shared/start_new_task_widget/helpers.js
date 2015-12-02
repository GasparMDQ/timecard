Template.start_new_task_widget.helpers({
    settings: function() {
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
    }
});