if (Meteor.isClient) {
    var chart;
    Template.weekly_summary.onRendered(function () {
        var chartOptions = {
            chart: {type: 'column', renderTo: 'weekly_summary_chart', zoomType: "xy"},
            title: {text: ''},
            xAxis: {categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']},
            yAxis: {
                min: 0,
                title: {
                    text: 'Total hours'
                },
                stackLabels: {
                    enabled: true,
                    style: {fontWeight: 'bold', color: 'gray'},
                    format: '{total:.2f}'
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: false,
                backgroundColor: 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false,
                layout: 'vertical'
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y:.2f}<br/>Total: {point.stackTotal:.2f}'
            },
            plotOptions: {column: {stacking: 'normal'}},
            credits: {enabled: false}
        };
        chart = new Highcharts.Chart(chartOptions);

        this.autorun(function () {
            var tasks, groupsByTask;
            var seriesToDelete = _.pluck(chart.series, 'name');
            var seriesList = _.pluck(chart.series, 'name');

            tasks = Tasks.find({
                    'end_time': {$not: ''},
                    'start_time': {
                        $gte: moment().startOf('week').valueOf(),
                        $lte: moment().endOf('week').valueOf()
                    }
                }
            ).fetch();
            groupsByTask = _.groupBy(tasks, function (task) {
                return task.name;
            });
            var tasksList = _.keys(groupsByTask);
            _.each(groupsByTask, function (group, name) {
                var dayGroup, serie, serieIndex;
                serie = {};
                serie.name = name;

                serie.data = [];
                dayGroup = _.groupBy(group, function (task) {
                    return moment(task.start_time).day();
                });
                _.each([1, 2, 3, 4, 5, 6, 7], function (day) {
                    if (!dayGroup.hasOwnProperty(day)) {
                        dayGroup[day] = [];
                    }
                });
                _.each(dayGroup, function (dayData, dayNumber) {
                    var total = 0;
                    _.each(dayData, function (task) {
                        total += task.end_time - task.start_time;
                    });
                    serie.data.push(moment.duration(total).asHours());
                });
                serieIndex = _.indexOf(seriesList, name);
                if (serieIndex !== -1) {
                    chart.series[serieIndex].setData(serie.data);
                    seriesToDelete = _.without(seriesToDelete, name);
                } else {
                    chart.addSeries(serie);
                }
            });

            seriesList = _.pluck(chart.series, 'name');
            _.each(seriesToDelete, function (name) {
                var serieIndex = _.indexOf(seriesList, name);
                if (serieIndex !== -1) {
                    chart.series[serieIndex].remove();
                }
            });
        });
    });
}
