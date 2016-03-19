// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var CoreMotion = require('ti.coremotion');
var TiBeacons = require('org.beuckman.tibeacons');
var chart = require('ti.jbchart');
var ble = require("org.beuckman.tible");
// Require the Cloud module
var Cloud = require("ti.cloud");

Ti.App.addEventListener('resumed',function(e){
    
    alert("I'm back");
    
    Ti.App.iOS.scheduleLocalNotification({
        date: new Date(new Date().getTime()),
        badge: -1
    });
    
});