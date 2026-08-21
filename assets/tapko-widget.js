// Tapko change-request widget loader.
//
// Shared by every page on the site. The widget is a review tool: it belongs on
// preview deployments and local dev only, and must never appear on the live
// site guests are sent to.
//
// The check fails closed. A host only gets the widget if it is explicitly
// recognised as a preview or as local dev; anything else — including a host
// this file has never heard of — gets nothing, not even the network request
// for the widget script.
(function () {
  'use strict';

  // Live hosts guests reach. judeandmesmin.vercel.app is the main hosted
  // version, so it is listed here even though it is a *.vercel.app domain.
  var LIVE_HOSTS = [
    'judeandmesmin.vercel.app',
    'www.judeandmesmin.vercel.app',
    'judemesmin.online',
    'www.judemesmin.online',
    'judemesmin-online.vercel.app'
  ];

  var LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]', '::1'];

  var host = String(location.hostname || '').toLowerCase();

  if (LIVE_HOSTS.indexOf(host) !== -1) return;

  var isPreview = /\.vercel\.app$/.test(host) || LOCAL_HOSTS.indexOf(host) !== -1;
  if (!isPreview) return;

  var script = document.createElement('script');
  script.src = 'https://tapko-prod-generalbucket.s3.ap-south-1.amazonaws.com/cdn/tapko-widget.js';
  script.async = true;
  script.onload = function () {
    var failed = function (error) {
      console.error('Error initializing tapko.app widget:', error);
    };
    try {
      // init() is async, so a rejection needs catching separately from a
      // synchronous throw.
      var started = Tapko.init({
        projectId: 'c4b6898e-78ff-4375-b45d-2b6b0b5552b5',
        apiKey: 'your-api-key',
        userId: 'user_37HZP8DEV5dKk9i8zZUuNbugwMX'
      });
      if (started && typeof started.catch === 'function') started.catch(failed);
    } catch (error) {
      failed(error);
    }
  };
  script.onerror = function () {
    console.error('Failed to load tapko.app widget script');
  };
  (document.head || document.documentElement).appendChild(script);
})();
