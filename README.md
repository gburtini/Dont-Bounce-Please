Don't Bounce Please
===================

A small, modern and easy to use library to detect bouncing users.

Three techniques in place to capture all types of users - mobile or desktop - and display a "please don't leave" type message.

You'll find a discussion of how to use bounce overlays to reduce your bounce rate here: https://inbound.org/discuss/do-popup-overlays-ever-decrease-your-bounce-rate

Usage
=====
Include jQuery > 1.6 and DBP in your website with script tags that look like this:
```
  <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js'></script>
	<script type='text/javascript' src='../../DBP-1.0.0.js'></script>
```

Then call the new function `DBP` with an argument of what you want to do prior to detecting a bounce. 
```
  DBP(function() {
		alert('Please don\'t go!');
	});
```

The DBP method takes either a function to run upon bounce as its first argument or an object with any options you wish to specify. Here's the defaults list:
```
  const defaultOptions = {
    method: 'auto', // the method used "auto", "mouseout", "history" or "blur".
    showPerPage: 1, // the maximum number of times to trigger per page
    showPerUser: undefined, // the maximum number of times to trigger per user (cookie based)
    cookieName: 'dbp',

    // mouseout detector settings
    distance: 100, // minimum distance from the top the user must have exited the window to trigger.
    sensitivity: 10, // minimum distance the mouse must have moved lately to trigger.
    scrollDelay: 500, // ms to wait after scrolling before mouseout will register.

    onlySameReferrer: false, // only show if the referrer is the same domain (user has been on site)
    notSameReferrer: false, // only show if the referrer is not the same domain (user just came in)

    onBounce: () => { console.log('bounce'); }, // the default onBounce handler
  };
```

By default, the method "auto" is used, which applies a mouseout detector on desktop (which checks if the user's mouse leaves the top of the screen towards the browser chrome) and a history and blur based detector on mobile (which pads the user's history and monitors for blur events on the whole page to detect leaving).

Example
=======
![Bounce-time exit popup](http://i.imgur.com/gLeBEWQ.jpg)


Development
===========
Please run eslint on any code in your pull requests. Out of the box, `npm build` will create the dist/ direcotry and `npm dev` will put Webpack in watch mode for any changes (rebuilding upon detection of a change).
