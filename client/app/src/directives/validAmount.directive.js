;(function () {
  'use strict'

  angular.module('sthclient.directives')
    .directive('validAmount', ['SATOSHI_UNIT',
      function (SATOSHI_UNIT) {
        return {
          require: 'ngModel',
          link: function (scope, elem, attrs, ctrl) {
            var val = function (value) {
              if (typeof value === 'undefined' || value === 0) {
                ctrl.$pristine = true
              }
              var num = Number((value * SATOSHI_UNIT).toFixed(0)) // 1.1 = 110000000
              var totalBalance = Number(scope.send.totalBalance * SATOSHI_UNIT)
              var remainingBalance = ((totalBalance - num) / SATOSHI_UNIT)
              scope.send.remainingBalance = isNaN(remainingBalance) ? totalBalance / SATOSHI_UNIT : remainingBalance

              if (typeof num === 'number' && num > 0) {
                if (num > Number.MAX_SAFE_INTEGER) {
                  ctrl.$setValidity('validAmount', false)
                } else {
                  ctrl.$setValidity('validAmount', true)
                }
              } else {
                ctrl.$setValidity('validAmount', false)
              }
              return value
            }
            ctrl.$parsers.unshift(val)
            ctrl.$formatters.unshift(val)
          }
        }
      }
    ])
})()
