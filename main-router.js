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

Router.route('/', {name: 'home'}
);

