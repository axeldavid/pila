Players = new Meteor.Collection('players');

if (Meteor.is_client) {

  Template.competitors.players = function () {
      return Players.find({});
  };

  Template.competitors.events = {
    'click a.player-remove' : function (e) {
        var player_id = $(e.currentTarget).closest('li').attr('id');
        Players.remove({_id: player_id});
    }
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
