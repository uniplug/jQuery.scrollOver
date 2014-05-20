var $;

$ = jQuery;

$.fn.extend({
  scrollOver: function(options) {
    var getCurrentScroll, getScrollFunction, isOver, log, nowOver, scrollFunction, settings, triggerEvent, wasOver;
    settings = {
      element: window,
      throttle: 200,
      offset: 0,
      id: false,
      debug: false,
      wait_for_tick: false
    };
    settings = $.extend(settings, options);
    settings.element = $(settings.element);
    nowOver = false;
    wasOver = false;
    log = function(msg) {
      if (settings.debug) {
        return typeof console !== "undefined" && console !== null ? console.log(settings.id, msg) : void 0;
      }
    };
    triggerEvent = function(eventType, eventParams) {
      var Event, n;
      n = void 0;
      Event = $.Event(eventType);
      for (n in eventParams) {
        Event[n] = eventParams[n];
      }
      $(document).trigger(Event);
    };
    getCurrentScroll = function() {
      return settings.element[0].pageYOffset;
    };
    isOver = function() {
      var scroll;
      scroll = getCurrentScroll();
      log(scroll);
      return scroll > settings.offset;
    };
    getScrollFunction = function() {
      var scrollFunction;
      scrollFunction = function() {
        var nowOverLoc;
        nowOverLoc = isOver();
        log("old " + wasOver);
        log("new " + nowOverLoc);
        if (!wasOver && nowOverLoc) {
          log("scroll down");
          triggerEvent("scrollover:down", {
            id: settings.id
          });
          triggerEvent("scrollover:over", {
            id: settings.id,
            up: false,
            down: true
          });
        }
        if (wasOver && !nowOverLoc) {
          log("scroll up");
          triggerEvent("scrollover:up", {
            id: settings.id
          });
          triggerEvent("scrollover:over", {
            id: settings.id,
            up: true,
            down: false
          });
        }
        if (wasOver !== nowOverLoc) {
          wasOver = nowOverLoc;
        }
        return true;
      };
      if ($.isFunction($.throttle && settings.throttle > 0)) {
        return $.throttle(settings.throttle, scrollFunction);
      }
      return scrollFunction;
    };
    scrollFunction = getScrollFunction();
    settings.element.on("scroll", scrollFunction);
    setTimeout(scrollFunction, 0);
    if (settings.wait_for_tick) {
      scrollFunction;
    } else {
      setTimeout(scrollFunction, 0);
    }
    return $(settings.element);
  }
});

$.scrollOver = $.fn.scrollOver;
