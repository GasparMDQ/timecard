if (Meteor.isClient) {
    Template.day_choice.events({
        'click .day-button': function (e) {
            e.preventDefault();
            switch (e.currentTarget.value){
                case 'add':
                    Session.set('daily_summary_day_offset', Session.get('daily_summary_day_offset')+1);
                    break;
                case 'remove':
                    Session.set('daily_summary_day_offset', Session.get('daily_summary_day_offset')-1);
                    break;
                default:
                    Session.set('daily_summary_day_offset', 0);
                    break;
            }
        }
    });
}
