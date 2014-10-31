var eventwatcherApp = angular.module('eventwatcherApp', []);
eventwatcherApp.service('EventWatcher', function($window, $timeout) {

  var EventWatcher = this;

  this.timeStamp = 0;
  this.events = [];

  this.addEvent = function(eventName) {
    if (!!~this.events.indexOf(eventName)) {
      EventWatcher[eventName] = {};
      angular.element($window).on(eventName, function(e) {
        $timeout(function() {
          EventWatcher[eventName].timeStamp = timeStamp;
        });
      });
    }
  };

});