$ = jQuery

$.fn.scrollOver = (options) ->
	triggerEvent = (eventType, eventParams) ->
		n = undefined
		Event = $.Event(eventType)
		for n of eventParams
			Event[n] = eventParams[n]
		$(document).trigger Event
		return

	@getScrollFunction = ->
		objScrollOver = @
		offsetSettings = @objSettings.scrollSettings
		scrollFunction = ->
			scroll = objScrollOver.getCurrentScroll()
			objScrollOver.log scroll

			offsets = objScrollOver.objSettings.offsets.slice()
			if objScrollOver.objSettings.windowOffset > scroll
				offsets.reverse()

			objScrollOver.log offsets

			$.each offsets, (key, value)->
				nowOverLoc = scroll > value
				$.each offsetSettings[value], (key, offset) ->
					if not offset.wasOver and nowOverLoc
						objScrollOver.log "scroll down"

						triggerEvent "scrollover:down",
							id: offset.id

						triggerEvent "scrollover:over",
							id: offset.id
							up: false
							down: true

						triggerEvent "scrollover:over:" + offset.id,
							id: offset.id
							up: false
							down: true

					if offset.wasOver and not nowOverLoc
						objScrollOver.log "scroll up"

						triggerEvent "scrollover:up",
							id: offset.id

						triggerEvent "scrollover:over",
							id: offset.id
							up: true
							down: false

						triggerEvent "scrollover:over:" + offset.id,
							id: offset.id
							up: true
							down: false

					offset.wasOver = nowOverLoc  if offset.wasOver isnt nowOverLoc
					true

				objScrollOver.objSettings.windowOffset = $(window).scrollTop()

		if $.isFunction $.throttle  and  objScrollOver.objSettings.throttle > 0
			return $.throttle(settings.throttle, scrollFunction)
		return scrollFunction

	@log = (msg) ->
		console?.log("ScrollOver: ", msg)  if @objSettings.debug

	@getCurrentScroll = ->
		@.objSettings.elem[0].pageYOffset

	@.addOptions = (options)->
		obScrollOver = @
		settings = @.objSettings.scrollSettings
		offsets = @.objSettings.offsets
		defaultSettings = 0

		$.each options, (key, value) ->
			obScrollOver.log value
			setting =
				offset: value
				id: key
				wasOver: false

			if settings[value] == undefined
				settings[value] = []

			settings[value][settings[value].length] = setting
			offsets[offsets.length] = value

	@Init = ->
		objScrollOver = @
		@.objSettings.debug = !!options.debug

		@log options
		if (!!options.throttle || options.throttle == 0)
			@.objSettings.throttle = options.throttle

		if (!!options.handlers)
			@.addOptions options.handlers

		scrollFunction = @getScrollFunction()

		@.objSettings.elem = $(window)
		@.objSettings.windowOffset = @.objSettings.elem.scrollTop()
		@.objSettings.elem.on "scroll", scrollFunction

		if @.objSettings.wait_for_tick
			scrollFunction
		else
			setTimeout scrollFunction, 0

		scrollFunction()

	@.objSettings =
		throttle: 200
		wait_for_tick: false
		windowOffset: false
		scrollSettings: {}
		offsets: []
	@Init()

	@

$.scrollOver = $.fn.scrollOver
