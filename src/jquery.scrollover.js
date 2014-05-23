var $;

$ = jQuery;

$.fn.scrollOver = function(options) {
  var triggerEvent;
  triggerEvent = function(eventType, eventParams) {
    var Event, n;
    n = void 0;
    Event = $.Event(eventType);
    for (n in eventParams) {
      Event[n] = eventParams[n];
    }
    $(document).trigger(Event);
  };
  this.getScrollFunction = function() {
    var objScrollOver, offsetSettings, scrollFunction;
    objScrollOver = this;
    offsetSettings = this.objSettings.scrollSettings;
    scrollFunction = function() {
      var offsets, scroll;
      if (!objScrollOver.objSettings.enable) {
        return;
      }
      scroll = objScrollOver.getCurrentScroll();
      objScrollOver.log(scroll);
      offsets = objScrollOver.objSettings.offsets.slice();
      if (objScrollOver.objSettings.windowOffset > scroll) {
        offsets.reverse();
      }
      objScrollOver.log(offsets);
      return $.each(offsets, function(key, value) {
        var nowOverLoc;
        nowOverLoc = scroll > value;
        $.each(offsetSettings[value], function(key, offset) {
          if (!offset.wasOver && nowOverLoc) {
            objScrollOver.log("scroll down");
            triggerEvent("scrollover:down", {
              id: offset.id
            });
            triggerEvent("scrollover:over", {
              id: offset.id,
              up: false,
              down: true
            });
            triggerEvent("scrollover:over:" + offset.id, {
              id: offset.id,
              up: false,
              down: true
            });
          }
          if (offset.wasOver && !nowOverLoc) {
            objScrollOver.log("scroll up");
            triggerEvent("scrollover:up", {
              id: offset.id
            });
            triggerEvent("scrollover:over", {
              id: offset.id,
              up: true,
              down: false
            });
            triggerEvent("scrollover:over:" + offset.id, {
              id: offset.id,
              up: true,
              down: false
            });
          }
          if (offset.wasOver !== nowOverLoc) {
            offset.wasOver = nowOverLoc;
          }
          return true;
        });
        return objScrollOver.objSettings.windowOffset = $(window).scrollTop();
      });
    };
    if ($.isFunction($.throttle && objScrollOver.objSettings.throttle > 0)) {
      return $.throttle(settings.throttle, scrollFunction);
    }
    return scrollFunction;
  };
  this.log = function(msg) {
    if (this.objSettings.debug) {
      return typeof console !== "undefined" && console !== null ? console.log("scrollOver: ", msg) : void 0;
    }
  };
  this.getCurrentScroll = function() {
    return this.objSettings.elem[0].pageYOffset;
  };
  this.enable = function() {
    this.objSettings.working = true;
    return true;
  };
  this.disable = function() {
    this.objSettings.working = false;
    return true;
  };
  this.addOptions = function(options) {
    var defaultSettings, obScrollOver, offsets, settings;
    obScrollOver = this;
    settings = this.objSettings.scrollSettings;
    offsets = this.objSettings.offsets;
    defaultSettings = 0;
    return $.each(options, function(key, value) {
      var setting;
      obScrollOver.log(value);
      setting = {
        offset: value,
        id: key,
        wasOver: false
      };
      if (settings[value] === void 0) {
        settings[value] = [];
      }
      settings[value][settings[value].length] = setting;
      return offsets[offsets.length] = value;
    });
  };
  this.Init = function() {
    var objScrollOver, scrollFunction;
    objScrollOver = this;
    this.objSettings.debug = !!options.debug;
    this.log(options);
    if (!!options.throttle || options.throttle === 0) {
      this.objSettings.throttle = options.throttle;
    }
    if (!!options.handlers) {
      this.addOptions(options.handlers);
    }
    scrollFunction = this.getScrollFunction();
    this.objSettings.elem = $(window);
    this.objSettings.windowOffset = this.objSettings.elem.scrollTop();
    this.objSettings.elem.on("scroll", scrollFunction);
    this.objSettings.elem.on("resize", scrollFunction);
    if (this.objSettings.wait_for_tick) {
      $('body').on('touchmove', scrollFunction);
    }
    if (this.objSettings.wait_for_tick) {
      scrollFunction;
    } else {
      setTimeout(scrollFunction, 0);
    }
    return scrollFunction();
  };
  this.objSettings = {
    throttle: 200,
    wait_for_tick: false,
    windowOffset: false,
    touchmove: false,
    scrollSettings: {},
    offsets: [],
    enable: true
  };
  this.Init();
  return this;
};

$.scrollOver = $.fn.scrollOver;
