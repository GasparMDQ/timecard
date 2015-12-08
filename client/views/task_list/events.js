if (Meteor.isClient) {
    Template.week_choice.events({
        'click .week-button': function (e) {
            e.preventDefault();
            switch (e.currentTarget.value){
                case 'add':
                    Session.set('weekly_summary_week_offset', Session.get('weekly_summary_week_offset')+1);
                    break;
                case 'remove':
                    Session.set('weekly_summary_week_offset', Session.get('weekly_summary_week_offset')-1);
                    break;
                default:
                    Session.set('weekly_summary_week_offset', 0);
                    break;
            }
            console.log(e.currentTarget.value);
        }
    });
}
