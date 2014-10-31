eventwatcherApp.service('EventWatcher', function($window, $timeout) {

  var EventWatcher = this;

  this.timeStamp = 0;
  this.events = {};

  this.addEvent = function(eventName, element) {
    if (!element) {
      element = $window;
    }
    if (!(eventName in this.events)) {
      EventWatcher.events[eventName] = {
        fn: function(e) {
          $timeout(function() {
            EventWatcher.events[eventName].timeStamp = e.timeStamp;
          });
        },
        element: $window
      };
      angular.element(element).on(eventName, EventWatcher.events[eventName].fn);
    }
  };

  this.removeEvent = function(eventName) {
    var e = EventWatcher.events[eventName];
    angular.element(e.element).off(eventName, e.fn);
  };

});