var app = app || {};

(function () {
    "use strict";

    // The watch id references the current `watchAcceleration`
    var watchID = null;

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
        var options = { frequency: 20 };

        watchID = navigator.accelerometer.watchAcceleration(app.acceleration.onSuccess,                 app.acceleration.onError, options);
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
        var xR = -xRichting*45 + 200;
        $(".circle").attr("cx", xR);


        var yRichting = acceleration.y;
        var yR = yRichting*50 + 400;
        $(".circle").attr("cy", yR);

         
         if (xR > 435 ) {
             app.vibrate.vibrate();
         }
         
        else if (xR < 65 ) {
             app.vibrate.vibrate();
         }
         
         else if (yR > 640 ) {
             app.vibrate.vibrate();
         }
         
         else if (yR < 100 ) {
             app.vibrate.vibrate();
             
         }
         else {
             $(".playground").removeClass('red');
             $("#titel").addClass('animated bounceIn');
         }

    },

    // onError: Failed to get the acceleration
    //
        onError: function() {
            alert('onError!');
    },
};
    
    app.vibrate = {
        
        
            vibrate: function() {
            navigator.notification.vibrate(100);
            app.animation.titelAnimation();  
            app.animation.bgAnimation();  
            console.log("vibrate");
        }

    };
    
    app.animation = {
            
            titelAnimation: function() {
                $("#titel").removeClass('animated bounceIn');
                console.log("titel bounce");
        },
        
            bgAnimation: function() {
                $(".playground").addClass('red');
        }
    };

    app.controller = {
        init: function() {
        document.addEventListener("deviceready", app.acceleration.onDeviceReady, false);
        }
    };

    $( document ).ready(function() {
        app.controller.init();
    });
    

})();