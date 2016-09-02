humanizeTimestamp = function (ms) {
    var interval = moment.duration(ms);
    return interval.get('hours') + 'h ' +
        interval.get('minutes') + 'm ' +
        interval.get('seconds') + 's ';
};
