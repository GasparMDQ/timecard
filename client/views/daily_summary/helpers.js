if (Meteor.isClient) {
    var chart;

    Template.daily_summary.onCreated(function () {
        Session.set('daily_summary_day_offset', 0);
    });

    Template.daily_summary.onRendered(function () {
        var chartOptions = {
            chart: {type: 'column', renderTo: 'daily_summary_chart', zoomType: "xy"},
            title: {text: ''},
            xAxis: {
                type: 'category'
            },
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
                enabled: false
            },
            tooltip: {
                pointFormat: '{point.y:.2f}'
            },
            plotOptions: {column: {stacking: 'normal'}},
            credits: {enabled: false}
        };
        chart = new Highcharts.Chart(chartOptions);

        this.autorun(function () {
            var tasks, groupsByTask;
            var serie = {
                name: 'Tasks',
                data: []
            };

            tasks = Tasks.find({
                    'end_time': {$not: ''},
                    'start_time': {
                        $gte: moment().startOf('day').add(Session.get('daily_summary_day_offset', 0), 'days').valueOf(),
                        $lte: moment().endOf('day').add(Session.get('daily_summary_day_offset', 0), 'days').valueOf()
                    }
                }
            ).fetch();
            groupsByTask = _.groupBy(tasks, function (task) {
                return task.name;
            });


            _.each(groupsByTask, function (group) {
                var total = 0;
                var name;
                _.each(group, function (task) {
                    total += task.end_time - task.start_time;
                    name = task.name;
                });
                serie.data.push([name, moment.duration(total).asHours()]);
            });

            if (chart.series.length !== 0) {
                chart.series[0].setData(serie.data, false, false);
            } else {
                chart.addSeries(serie, false, false);
            }
            chart.redraw();
        });
    });


    Template.daily_summary.helpers({
        day: function () {
            var day = moment().startOf('day').add(Session.get('daily_summary_day_offset', 0), 'days');

            return day.format("dddd, MMM Do YYYY");
        }
    });

}
