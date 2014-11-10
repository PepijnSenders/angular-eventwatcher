eventwatcherApp.service('EventWatcher', function($window, $timeout) {

  var EventWatcher = this;

  this.timeStamp = 0;
  this.events = {};

  this.addEvent = function(eventName, element, throttle) {
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
      var fn = EventWatcher.events[eventName].fn.throttle(throttle);
      angular.element(element).on(eventName, fn);
    }
  };

  this.removeEvent = function(eventName) {
    var e = EventWatcher.events[eventName];
    angular.element(e.element).off(eventName, e.fn);
  };

});