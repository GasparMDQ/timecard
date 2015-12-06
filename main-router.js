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
Router.onBeforeAction(function(){
    Session.set('current_task', Tasks.findOne({'end_time': ''}));
    this.next();
});

Router.route('/', {
    name: 'home',
    action: function () {
        this.render('home', {});
    }
});

Router.route('/task/edit/:_id', {
    name: 'task.edit',
    action: function () {
        this.render('task_edit', {
            data: function(){
                return Tasks.findOne({'_id': this.params._id});
            }
        });
    }
});

