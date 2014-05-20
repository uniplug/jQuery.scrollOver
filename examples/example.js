$( document ).ready(function() {

	$(window).on("scrollover:over", function(event) {
		if ( event.up ) {
			console.log('scrolled over up', event.id);
		} else if ( event.down ) {
			console.log('scrolled over down', event.id);
		}
	});

	$.scrollOver({
		offset: 400,
		id: "top-400"
	});

	// $.scrollOver({
	// 	offset: 400,
	// 	id: "top-400"
	// }).on("scrollover:over", function(event) {
	// 	console.log('scrolled over', event);
	// 	if ( event.up ) {
	// 		console.log('scrolled over up', event.id);
	// 	} else if ( event:down ) {
	// 		console.log('scrolled over down', event.id);
	// 	}
	// });

	$.scrollOver({
		offset: 2000,
		id: "bottom-2000"
	});

	// $.scrollOver({
	// 	offset: 2000,
	// 	id: "bottom-2000"
	// }).on("scrollover:down", function(event) {
	// 	console.log('scrolled in', event.id);
	// }).on("scrollover:up", function(event) {
	// 	// console.log('scrolled out', event.id);
	// });



});
