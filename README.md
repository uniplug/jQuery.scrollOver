jQuery scrollOver
==================

A jQuery plugin to define a scroll positions and get event on scroll over it.

Creating an object
------------------

```javascript
var scrollOver = $.scrollOver();
```

Defining a scroll positions
---------------------------

To defining a scroll positions, you can set it om the object creation:

```javascript
var scrollOver = $.scrollOver({
    handlers: {
        "top-2000": 2000,
        "top-400": 400
    }
});
```

or later:

```javascript
scrollOver.addOptions({sometrigger: 2500});
```

In this examples, the event will be triggered (see below) each time the page scroll through ``offset``.

Using events
------------

Each time the window scroll position reach a defined positions, the events will be triggered.

4 kind of events are triggered :

* ``scrollover:down``  
  When the scroll position enter move down through the scroll position.
* ``scrollover:up``  
  When the scroll position enter move up through the scroll position.
* ``scrollover:over``  
  Each time you scroll over the scroll position.
* ``scrollover:over:sometrigger``  
  Each time you scroll over the scroll position for specific id.

You can use those events as usual :

```javascript
$(document).on("scrollover:down", function(event) {
    console.log('scrolled over down', event.id);
});

$(document).on("scrollover:up", function(event) {
    console.log('scrolled over up', event.id);
});

$(document).on("scrollover:over", function(event) {
    if ( event.up ) {
        console.log('scrolled over up', event.id);
    } else if ( event.down ) {
        console.log('scrolled over down', event.id);
    }
});

$(document).on("scrollover:over:sometrigger", function(event) {
    console.log('scrolled:over:sometrigger', event);
});
```

Settings
--------

Default settings is:

```javascript
$.scrollOver({
    throttle: 200,
    debug: false,
    wait_for_tick: false
});
```

* throttle - throttle, 0 for disable
* debug - debug mode
* wait_for_tick - wait for the first tick

Examples
--------

You can find some example implementations in the [`examples/`](examples/)
directory.
