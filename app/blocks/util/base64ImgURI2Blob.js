(function() {
  'use strict';

  angular
    .module('blocks.util')
    .factory('base64ImgURI2Blob', base64ImgURI2Blob);

  function base64ImgURI2Blob() {
    var service = {
        dataURItoBlob: dataURItoBlob
    };

    return service;

    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    };
  }
})();