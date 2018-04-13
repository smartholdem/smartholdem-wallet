;(function () {
  'use strict'

  angular.module('sthclient.services')
    .service('utilityService', ['SATOSHI_UNIT', 'STH_LAUNCH_DATE', UtilityService])

  // this service should not have any dependencies to other services!
  function UtilityService (SATOSHI_UNIT, STH_LAUNCH_DATE) {
    function satoshiToSTH (amount, keepPrecise, numberOfDecimals) {
      if (!amount) {
        return 0
      }

      let sth = amount / SATOSHI_UNIT

      if (!keepPrecise) {
        sth = numberToFixed(sth)
      }

      if (typeof numberOfDecimals !== 'number') {
        return sth
      }

      if (typeof sth === 'number') {
        return sth.toFixed(numberOfDecimals)
      }

      // if we have a string, 'toFixed' won't work, so we use our custom implementation for that
      return numberStringToFixed(sth, numberOfDecimals)
    }

    function sthToSatoshi (amount, numberOfDecimals) {
      if (!amount) {
        return 0
      }

      const sth = amount * SATOSHI_UNIT
      return typeof numberOfDecimals !== 'number' ? sth : sth.toFixed(numberOfDecimals)
    }

    function numberStringToFixed (sth, numberOfDecimals) {
      if (typeof sth !== 'string' || typeof numberOfDecimals === 'undefined') {
        return sth
      }

      const splitted = sth.split('.')

      if (numberOfDecimals === 0) {
        return splitted[0]
      }

      const decimals = splitted[1] || []
      let newDecimals = ''
      for (let i = 0; i < numberOfDecimals; i++) {
        if (i < decimals.length) {
          newDecimals += decimals[i]
        } else {
          newDecimals += '0'
        }
      }

      return splitted[0] + '.' + newDecimals
    }

    function dateToSmartHoldemStamp (date) {
      if (!date) {
        return null
      }

      date = new Date(date.toUTCString())

      const timestamp = parseInt((date.getTime() - STH_LAUNCH_DATE.getTime()) / 1000)
      return timestamp < 0 ? null : timestamp
    }

    function sthStampToDate (sthRelativeTimeStamp) {
      if (typeof sthRelativeTimeStamp !== 'number' || sthRelativeTimeStamp < 0) {
        return null
      }

      const sthLaunchTime = parseInt(STH_LAUNCH_DATE.getTime() / 1000)

      return new Date((sthRelativeTimeStamp + sthLaunchTime) * 1000)
    }

    function createRefreshState (successMessage, errorMessage) {
      const stateObject = {}

      stateObject.states = []

      stateObject.isRefreshing = false

      stateObject.create = () => {
        const state = { isFinished: false, hasError: false }
        stateObject.states.push(state)
        return state
      }

      stateObject.shouldRefresh = () => {
        if (stateObject.isRefreshing) {
          return false
        }

        stateObject.isRefreshing = true
        return true
      }

      stateObject.updateRefreshState = (toastService) => {
        const areAllFinished = stateObject.states.every(state => state.isFinished)
        const hasAnyError = stateObject.states.some(state => state.hasError)

        if (!areAllFinished) {
          return
        }

        stateObject.isRefreshing = false
        stateObject.states = []

        if (!toastService) {
          return
        }

        if (!hasAnyError) {
          toastService.success(successMessage, 3000)
        } else {
          toastService.error(errorMessage, 3000)
        }
      }

      return stateObject
    }

    function numberToFixed (x) {
      let e
      if (Math.abs(x) < 1.0) {
        e = parseInt(x.toString().split('e-')[1])
        if (e) {
          x *= Math.pow(10, e - 1)
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2)
        }
      } else {
        e = parseInt(x.toString().split('+')[1])
        if (e > 20) {
          e -= 20
          x /= Math.pow(10, e)
          x += (new Array(e + 1)).join('0')
        }
      }
      return x
    }

    return {
      satoshiToSTH: satoshiToSTH,
      sthToSatoshi: sthToSatoshi,
      numberStringToFixed: numberStringToFixed,

      dateToSmartHoldemStamp: dateToSmartHoldemStamp,
      sthStampToDate: sthStampToDate,

      createRefreshState: createRefreshState
    }
  }
})()
