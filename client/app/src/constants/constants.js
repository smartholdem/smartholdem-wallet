;(function () {
  'use strict'

  angular.module('sthclient.constants')
    // 1 STH has 100000000 "satoshi"
    .constant('SATOSHI_UNIT', Math.pow(10, 8))
})()
