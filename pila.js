Players = new Meteor.Collection('players');

if (Meteor.is_client) {

  Template.competitors.players = function () {
      return Players.find({});
  };

  Template.player.events = {
    'click' : function (e) {
        if ($(e.target).hasClass('player-remove')) {
            Players.remove({_id: this._id});
        }
        else {
            Session.set('selected_player', this._id);
        }
    },
    'mouseenter i.player-remove' : function(e) {
        $(e.target).closest('li').addClass('removing');
    },
    'mouseleave i.player-remove' : function(e) {
        $(e.target).closest('li').removeClass('removing');
    }
  };

  Template.player.selected = function () {
      return Session.equals('selected_player', this._id) ? 'selected' : '';
  };

  Template.add_player.events = {
    'keydown input' : function(e) {
        if (e.keyCode == 13) {
            var $input = $(e.currentTarget);
            Players.insert({name: $input.val(), score: 301});
            $input.val('');
        }
    }
  };

  Template.add_score.selected_name = function () {
      var player = Players.findOne(Session.get('selected_player'));
      return player ? player.name : '';
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
      Players.allow({
          'insert': function(){
              return true;
          },
          'remove': function(){
              return true;
          }
      });
  });
}
