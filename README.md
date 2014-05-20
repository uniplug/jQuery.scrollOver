jQuery scrollOver
==================

A jQuery plugin to define a scroll positions and get event on scroll over it.

Defining a scroll positions
----------------------

To bind an element with a scroll zone, you can use the ``up`` and ``down`` parameters :

```javascript
$.scrollOver({
    offset: 400,
    id: "position-400"
});
```

In this example, the event will be triggered (see below) each time the page scroll through ``offset``.

Using events
------------

Each time the window scroll position reach a defined positions, the events will be triggered.

3 kind of events are triggered :

* ``scrollover:down``  
  When the scroll position enter move down through the scroll position.
* ``scrollover:up``  
  When the scroll position enter move up through the scroll position.
* ``scrollover:over``  
  Each time you scroll over the scroll position.

You can use those events as usual :

```javascript
$(window).on("scrollover:down", function(event) {
    console.log('scrolled over down', event.id);
});

$(window).on("scrollover:up", function(event) {
    console.log('scrolled over up', event.id);
});

$(window).on("scrollover:over", function(event) {
    if ( event.up ) {
        console.log('scrolled over up', event.id);
    } else if ( event.down ) {
        console.log('scrolled over down', event.id);
    }
});
```

Settings
--------

Default settings is:

```javascript
$.scrollOver({
    element: window,
    throttle: 200,
    offset: 0,
    id: false,
    debug: false,
    wait_for_tick: false
});
```

* element - jQuery selector to bind scroll event
* throttle - throttle, 0 for disable
* offset - position of trigger from the top of the page
* id - id of event
* debug - debug mode
* wait_for_tick - wait for the first tick

Examples
--------

You can find some example implementations in the [`examples/`](examples/)
directory.
