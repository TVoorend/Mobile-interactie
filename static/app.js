var app = app || {};

(function () {
    "use strict";

    // The watch id references the current `watchAcceleration`
    var watchID = null;
    // Wait for device API libraries to load

    app.acceleration = {
    // device APIs are available
    //
    onDeviceReady: function()  {
        app.acceleration.startWatch();
    },

    // Start watching the acceleration
    //
    startWatch: function() {

        // Update acceleration every 3 seconds
        var options = { frequency: 2 };

        watchID = navigator.accelerometer.watchAcceleration(app.acceleration.onSuccess, app.acceleration.onError, options);
    },

    // Stop watching the acceleration
    //
    stopWatch: function() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    },

    // onSuccess: Get a snapshot of the current acceleration
    //
     onSuccess: function(acceleration) {
        var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                            'Acceleration Y: ' + acceleration.y         + '<br />' +
                            'Acceleration Z: ' + acceleration.z         + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';

        var xRichting = acceleration.x;
        var xR = -xRichting*45 + 290;
        $(".circle").attr("cx", xR);
        // console.log(xR);

        var yRichting = acceleration.y;
        var yR = yRichting*50 + 400;
        $(".circle").attr("cy", yR);
        // console.log(yR);

       // if (yR > 300.0000000000000) {
       //     app.vibrate.vibrate();
       // }
    },

    // onError: Failed to get the acceleration
    //
    onError: function() {
        alert('onError!');
    },
};

    app.vibrate = {
            showAlert: function() {
                navigator.notification.alert(
                    'You are the winner!',  // message
                    'Game Over',            // title
                    'Done'                  // buttonName
                );
            },

            // Vibrate for 2 seconds
            //
//            vibrate: function() {
//                navigator.notification.vibrate(2000);
//            }

    };

    app.controller = {
        init: function() {
        document.addEventListener("deviceready", app.acceleration.onDeviceReady, false);
        }
    };

    app.controller.init();

})();