/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById("btnCameroOpen").addEventListener("click", onCameraOpen);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    navigator.camera.getPicture(onSuccess,onFail, { quality: 50, 
        destinationType: Camera.DestinationType.FILE_URI});

    function onSuccess(imageURI){
        var image = document.getElementById('myImage');
        image.src = imageURI;

    }

    function onFail(message){
        alert('Failed because: ' + message);
    }
}


function onCameraOpen(){
    cordova.plugins.CordovaMqTTPlugin.connect({
        url:"tcp://test.mosquitto.org", //a public broker used for testing purposes only. Try using a self hosted broker for production. 
        connectionTimeout:3000,
        port:"1883"
    });

    var delayInMilliseconds = 2000; //1 second
    setTimeout(function() {
        cordova.plugins.CordovaMqTTPlugin.subscribe({
            topic:"MQTT",
            qos:0
        });
        cordova.plugins.CordovaMqTTPlugin.publish({
            topic:"MQTT",
            payload:"Hello from cordova"
        });
    }, delayInMilliseconds);


    navigator.camera.getPicture(onSuccess,onFail, { quality: 50, 
        destinationType: Camera.DestinationType.FILE_URI});

    function onSuccess(imageURI){
        var image = document.getElementById('myImage');
        image.src = imageURI;

    }

    function onFail(message){
        alert('Failed because: ' + message);
    }
    

}
