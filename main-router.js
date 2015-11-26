Router.configure({
    // the default layout
    layoutTemplate: 'defaultContainer'
});

//Aux functions
var mustBeSignedIn = function () {
    if (!Meteor.loggingIn() && !Meteor.user()) {
        this.redirect('home');
    }
    this.next();
};

Router.onBeforeAction(mustBeSignedIn, {except: ['home']});

Router.route('/', {
    name: 'home',
    action: function () {
        Session.set('current_task', Tasks.findOne({'end_time': ''}));
        this.render('home', {});
    }
});

