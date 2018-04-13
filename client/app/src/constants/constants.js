;(function () {
  'use strict'

  angular.module('sthclient.constants')
    // 1 STH has 100000000 "satoshi"
    .constant('SATOSHI_UNIT', Math.pow(10, 8))
    .constant('TRANSACTION_TYPES', {
      'SEND_STH': 0,
      'CREATE_SECOND_PASSPHRASE': 1,
      'CREATE_DELEGATE': 2,
      'VOTE': 3
    })

  angular.module('sthclient.constants')
  // all SmartHoldem timestamps start at 2017/11/21 13:00
    .constant('STH_LAUNCH_DATE', new Date(Date.UTC(2017, 10, 21, 13, 0, 0, 0)))
})()
