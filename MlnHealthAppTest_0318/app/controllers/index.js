$.index.open();


var AltData = ['0'];

var AltChart = chart.createLineChartView({
    data : [AccData],
    toolTipData : AccData,
    styles :[chart.CHART_LINE_SOLID],
    selectedLineColors :['yellow'],
    lineColors:['green'],
    selectionBarColor:'#fff',
    chartBackgroundColor:'#505051'
});
$.chartView2.add(AltChart);
if (Ti.Geolocation.locationServicesEnabled) {
    Titanium.Geolocation.purpose = 'Get Current Location';

    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.error('Error: ' + e.error);
        } else {
            Ti.API.info(e.coords);
            var Alt = e.coords.altitude;
			AltData.push(Alt);
			if(AltData.length>=40)
				AltData.shift();
			AltChart.setToolTipData(AltData);
			AltChart.setData([AltData]);
			AltChart.reloadData();
        }
    });
} else {
    alert('Please enable location services');
}



// Accelerometer
var Accelerometer = CoreMotion.createAccelerometer();

if (Accelerometer.isAccelerometerAvailable()) {
    Accelerometer.setAccelerometerUpdateInterval(1000);
    Accelerometer.startAccelerometerUpdates(updateAccelData);
} else {
    alert("Device does not have an accelerometer.");
}
var AccData = ['0'];

var AccChart = chart.createLineChartView({
    data : [AccData],
    toolTipData : AccData,
    styles :[chart.CHART_LINE_SOLID],
    selectedLineColors :['yellow'],
    lineColors:['green'],
    selectionBarColor:'#fff',
    chartBackgroundColor:'#505051'
});
$.chartView1.add(AccChart);
function updateAccelData(e) {
    data = e.acceleration;
    $.accelX.message = "Accel X: " + data.x.toFixed(4);
    $.accelX.value = data.x;
    $.accelY.message = "Accel Y: " + data.y.toFixed(4);
    $.accelY.value = data.y;
    $.accelZ.message = "Accel Z: " + data.z.toFixed(4);
    $.accelZ.value = data.z;
   
    // var Acc = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z).toFixed(4);
    // $.totalAcc.text = "Acc Total: " + Acc;
 
    
    var Acc = data.y.toFixed(4);
    AccData.push(parseInt(Math.abs(100*Acc)).toString());
    if(AccData.length>=40)
		AccData.shift();
	AccChart.setToolTipData(AccData);
	AccChart.setData([AccData]);
	AccChart.reloadData();
	
	
	
}

  
// Gyrometer
var Gyroscope = CoreMotion.createGyroscope();

if (Gyroscope.isGyroAvailable()) {
    Gyroscope.setGyroUpdateInterval(1000);
    Gyroscope.startGyroUpdates(updateGyroData);
} else {
    alert("Device does not have an gyroscope.");
}

function updateGyroData(e) {
    if (e.success) {
        data = e.rotationRate;
        $.gyroX.message = "Gyro X: " + data.x.toFixed(4);
        $.gyroX.value = data.x;
        $.gyroY.message = "Gyro Y: " + data.y.toFixed(4);
        $.gyroY.value = data.y;
        $.gyroZ.message = "Gyro Z: " + data.z.toFixed(4);
        $.gyroZ.value = data.z;
        
    } else {
        if (e.error) {
            Ti.API.error(e.error);
        }
    }
}

// Magnetometer
var Magnetometer = CoreMotion.createMagnetometer();

if (Magnetometer.isMagnetometerAvailable()) {
    Magnetometer.setMagnetometerUpdateInterval(1000);
    Magnetometer.startMagnetometerUpdates(updateMagnetometerData);
} else {
    alert("Device does not have a magnetometer.");
}

function updateMagnetometerData(e) {
    data = e.magneticField;
    $.xMag.message = "Mag X: " + data.x.toFixed(4);
    $.xMag.value = data.x / 1000;
    $.yMag.message = "Mag Y: " + data.y.toFixed(4);
    $.yMag.value = data.y / 1000;
    $.zMag.message = "Mag Z: " + data.z.toFixed(4);
    $.zMag.value = data.z / 1000;
    $.totalMag.text = "Mag Total: " + Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z).toFixed(4);
}

// // iBeacon
// function startBeacon() {
    // // $.webView.url = "http://www.sci.hkbu.edu.hk/";
//     
    // TiBeacons.addEventListener("bluetoothStatus", function(e){
       // if (e.status != "on") {
          // Ti.API.error("bluetooth is not on");
          // alert("bluetooth is not on");
       // }
    // });
//     
    // TiBeacons.requestBluetoothStatus();
//     
    // Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
		// Ti.API.info('In Callback');
	 	// Ti.API.info(JSON.stringify(e, null, 2));
	// });
// 	
	// TiBeacons.startRangingForBeacons({
    	// uuid : "e031cced-1ce9-42c6-a936-83c78157d268",
    	// identifier : "Test Region",
    // // major: 1, //optional
    // // minor: 2  //optional
	// });
// 	
	// var orange = -999;
	// var yellow = -999;
	// var purple = -999;
// 
	// TiBeacons.addEventListener("beaconProximity", function(e) {
    // // alert("beacon " + e.major + "/" + e.minor + " is now " + e.proximity + "e: " + JSON.stringify(e));
//         
    	// if (e.minor == '4369' && e.rssi != 0)
        	// orange = parseInt(e.rssi);
    	// if (e.minor == '4129' && e.rssi != 0)
        	// yellow = parseInt(e.rssi);
    	// if (e.minor == '0' && e.rssi != 0)
        	// purple = parseInt(e.rssi);
//             
    	// if (orange > purple && orange > yellow)
    		// postToWebform({major:21845, minor:4369});
		// else if (purple > orange && purple > yellow)
    		// postToWebform({major:21845, minor:0});
		// else if (yellow > orange && yellow > purple)
    		// postToWebform({major:4128, minor:4129});
// 
	// });
// }
// 
// function postToWebform(e) {
     // var xhr = Ti.Network.createHTTPClient();
     // xhr.onload = function(e) {
            // //handle response, which at minimum will be an HTTP status code
           // var json = JSON.parse(this.responseText);
           // $.webView.url = json.url;
     // };
     // xhr.open('POST','http://cs9213.comp.hkbu.edu.hk/beaconDetector/index.php');
     // xhr.send({
           // "major": e.major,
           // "minor": e.minor
     // });
// }
// // BLE
// var heartRateData = ['78', '76', '72'];
// 
// var lineChart = chart.createLineChartView({
    // data : [heartRateData],
    // toolTipData : heartRateData,
    // styles :[chart.CHART_LINE_SOLID],
    // selectedLineColors :['yellow'],
    // lineColors:['green'],
    // selectionBarColor:'#fff',
    // chartBackgroundColor:'#505051'
// });
//    
// $.chartView.add(lineChart);
// 
// function scanButton() {
    // heartRateData.push('75');
    // lineChart.setToolTipData(heartRateData);
    // lineChart.setData([heartRateData]);
    // lineChart.reloadData();
// }
// 
// ble.addEventListener("state", function(e) {
    // updateState(e.state);
// });
// 
// function updateState(state) {
    // $.status.text = " bluetooth is " + state;
    // switch (state) {
    // case "on":
        // $.status.backgroundColor = "#7d7";
        // break;
    // case "off":
    // default:
        // $.status.backgroundColor = "#f99";
        // break;
    // }
// }
// 
// var scanning = false;
// ble.addEventListener("scanStart", function(e) {
    // $.scanButton.backgroundColor = "#f99";
    // $.scanButton.title = "stop";
    // scanning = true;
// });
// 
// ble.addEventListener("scanStop", function(e) {
    // $.scanButton.backgroundColor = "#7d7";
    // $.scanButton.title = "scan";
    // scanning = false;
// });
// 
// function scanButton() {
    // if (scanning) {
        // ble.stopScan();
    // } else {
        // ble.startScan("180D");
    // }
// }
// 
// updateState(ble.state);
// 
// 
// ble.addEventListener("characteristicValue", characteristicValue);
// function characteristicValue(e) {
    // if (e.characteristic.uuid == "2a37") {
        // $.periName.text = "Device name: " + e.peripheral.name;
// 
        // console.log(parseInt(e.characteristic.value, 16));
        // heartRateData.push(parseInt(e.characteristic.value, 16).toString());
        // if(heartRateData.length>=40)
			// heartRateData.shift();
    	// lineChart.setToolTipData(heartRateData);
    	// lineChart.setData([heartRateData]);
    	// lineChart.reloadData();
    // }
// }
// 
// 
// var deviceToken = null;
// // Check if the device is running iOS 8 or later
// if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
//  
    // // Wait for user settings to be registered before registering for push notifications
    // Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
//  
        // // Remove event listener once registered for push notifications
        // Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
//  
        // Ti.Network.registerForPushNotifications({
            // success: deviceTokenSuccess,
            // error: deviceTokenError,
            // callback: receivePush
        // });
    // });
//  
    // // Register notification types to use
    // Ti.App.iOS.registerUserNotificationSettings({
        // types: [
            // Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
            // Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
            // Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
        // ]
    // });
// }
 // // For iOS 7 and earlier
// else {
    // Ti.Network.registerForPushNotifications({
        // // Specifies which notifications to receive
        // types: [
            // Ti.Network.NOTIFICATION_TYPE_BADGE,
            // Ti.Network.NOTIFICATION_TYPE_ALERT,
            // Ti.Network.NOTIFICATION_TYPE_SOUND
        // ],
        // success: deviceTokenSuccess,
        // error: deviceTokenError,
        // callback: receivePush
    // });
// }
// 
// // Save the device token for subsequent API calls
// function deviceTokenSuccess(e) {
    // console.log("Device Token: " +  e.deviceToken);
    // deviceToken = e.deviceToken;
// }
// 
// function deviceTokenError(e) {
    // alert('Failed to register for push notifications! ' + e.error);
// }
// 
// //Subscribing a Channel
// 
// 
// function subscribeToChannel () {
    // // Subscribes the device to the 'news_alerts' channel
    // // Specify the push type as either 'android' for Android or 'ios' for iOS
//     
    // console.log("In stc: " + deviceToken);
//                 
    // Cloud.PushNotifications.subscribeToken({
        // device_token: deviceToken,
        // channel: 'news_alerts',
        // type: Ti.Platform.name == 'android' ? 'android' : 'ios'
    // }, function (e) {
        // if (e.success) {
            // alert('Subscribed');
        // } else {
            // alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        // }
    // });
// }
// 
// function unsubscribeToChannel () {
    // // Unsubscribes the device from the 'test' channel
    // Cloud.PushNotifications.unsubscribeToken({
        // device_token: deviceToken,
        // channel: 'news_alerts',
    // }, function (e) {
        // if (e.success) {
            // alert('Unsubscribed');
        // } else {
            // alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        // }
    // });
// }
// 
// //
// var ostype = Titanium.Platform.osname;
// var alertString;
// 
// function receivePush(e) {
    // // alert("received something");
    // if(ostype === "android"){
            // alertString = JSON.parse(e.payload).android.alert;
    // }
    // if(ostype === "iphone" || ostype === "ipad"){
            // alertString = e.data.aps.alert;
            // // alert(alertString);
            // $.pushed.value = alertString;
    // }
// }