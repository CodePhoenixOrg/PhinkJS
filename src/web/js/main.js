/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var sayHello = function () {
    var hello = "Hello",
        world = "World",
        helloWorld = hello + ' ' + world + '!';

    return helloWorld;

}

var printHello = function () {

    /**
     * Native javascript
     */ 
    // var hello = document.querySelector("#hello");
    // hello.innerHTML = sayHello();

    /**
     * jQuery enabled
     */
    var message = sayHello();
    $('#hello').html(message);

}