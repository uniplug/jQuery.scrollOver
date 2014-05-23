var scrollOver;

$(function() {

	$(document).on("scrollover:over", function(event) {
		if ( event.up ) {
			console.log('scrolled:over up', event.id);
		} else if ( event.down ) {
			console.log('scrolled:over down', event.id);
		}
	});

	$(document).on("scrollover:down", function(event) {
		console.log('scrolled:down', event.id);
	}).on("scrollover:up", function(event) {
		console.log('scrolled:up', event.id);
	});

	$(document).on("scrollover:over:sometrigger", function(event) {
		console.log('scrolled:over:sometrigger', event);
	});

	scrollOver = $.scrollOver({
		debug: false,
		throttle: 200,
		wait_for_tick: true,
		handlers: {
			"top-2000": 2000,
			"top-400": 400
		}
	});

	// scrollOver.addOptions({"top-2000": 2000});
	// scrollOver.addOptions({"top-400": 400});

	scrollOver.addOptions({sometrigger: 2500});

});
