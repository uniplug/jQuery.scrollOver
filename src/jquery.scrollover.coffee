$ = jQuery

$.fn.extend
  scrollOver: (options) ->
    settings =
      element: window
      throttle: 200
      offset: 0
      id: false
      debug: false
      wait_for_tick: false

    settings = $.extend settings, options

    settings.element = $(settings.element)
    nowOver = false
    wasOver = false

    log = (msg) ->
      console?.log(settings.id, msg) if settings.debug

    triggerEvent = (eventType, eventParams) ->
      n = undefined
      Event = $.Event(eventType)
      for n of eventParams
        Event[n] = eventParams[n]
      $(document).trigger Event
      return

    getCurrentScroll = ->
      settings.element[0].pageYOffset

    isOver = ->
      scroll = getCurrentScroll()
      log scroll
      scroll > settings.offset

    getScrollFunction = ->
      scrollFunction = ->
        nowOverLoc = isOver()
        log "old " + wasOver
        log "new " + nowOverLoc
        if not wasOver and nowOverLoc
          log "scroll down"
          triggerEvent "scrollover:down",
            id: settings.id
          triggerEvent "scrollover:over",
            id: settings.id
            up: false
            down: true

        if wasOver and not nowOverLoc
          log "scroll up"
          triggerEvent "scrollover:up",
            id: settings.id
          triggerEvent "scrollover:over",
            id: settings.id
            up: true
            down: false

        wasOver = nowOverLoc  if wasOver isnt nowOverLoc
        true

      if $.isFunction $.throttle  and  settings.throttle > 0
        return $.throttle settings.throttle, scrollFunction
      return scrollFunction

    scrollFunction = getScrollFunction()
    settings.element.on "scroll", scrollFunction
    setTimeout scrollFunction, 0
    if settings.wait_for_tick
      scrollFunction
    else
      setTimeout scrollFunction, 0

    $(settings.element)

$.scrollOver = $.fn.scrollOver
