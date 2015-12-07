Router.configure({
    // the default layout
    layoutTemplate: 'defaultContainer',
    notFoundTemplate: 'data_not_found'
});

//Aux functions
var mustBeSignedIn = function () {
    if (!Meteor.loggingIn() && !Meteor.user()) {
        this.redirect('home');
    }
    this.next();
};

Router.onBeforeAction(mustBeSignedIn, {except: ['home']});
Router.onBeforeAction(function () {
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
        if (typeof Tasks.findOne({'_id': this.params._id}) === 'undefined') {
            this.render('data_not_found', {});
        } else {
            this.render('task_edit', {
                data: function () {
                    return Tasks.findOne({'_id': this.params._id});
                }
            });

        }
    }
});

