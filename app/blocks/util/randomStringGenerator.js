(function() {
  'use strict';

  angular
    .module('blocks.util')
    .factory('randomStringGenerator', randomStringGenerator);

  function randomStringGenerator() {
    var service = {
        getRandomString: getRandomString
    };

    return service;

    function getRandomString() {
        var s = "";
        var x = 20;
        while(s.length < x && x > 0) {
            var r = Math.random();
            s += (r<0.1 ? Math.floor(r*100) : String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
        }
        return s;
    };
  }
})();