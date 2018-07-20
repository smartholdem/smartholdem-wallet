;(function () {
  'use strict'

  angular.module('sthclient.services')
    .service('neoApiService', ['$q', '$http', NeoApiService])

  function NeoApiService ($q, $http) {
    const sth = require(require('path').resolve(__dirname, '../node_modules/sthjs'))
    const baseUrl = 'https://neoscan.io/api/main_net/v1'

    /*
      returns {"unclaimed": <value>, "address":"<address>"}
    */
    function getUnClaimed (address) {
      const deferred = $q.defer()
      $http.get(baseUrl + '/get_unclaimed/' + address)
        .then(r => r.status === 200 && r.data ? deferred.resolve(r.data) : deferred.reject('Error'))
        .catch(err => deferred.reject(err))
      return deferred.promise
    }

    function doesAddressExist (address) {
      // we use the getunclaimed call, because it's fast, if the address exists (i.e. has any transactions), the address is returned
      // we check if it's a real address (and not "not found") and return the result
      return getUnClaimed(address)
        .then(r => isValidAddress(r.address))
        .catch(() => false)
    }

    function isValidAddress (address) {
      // since NEO addresses are the same as STH addresses, we can use the sth validateAddress method ;)
      // however we have to "hardcode the version", since it's not "network dependant" (e.g. devNet has another version)
      return sth.crypto.validateAddress(address, 0x3f)
    }

    return {
      doesAddressExist: doesAddressExist
    }
  }
})()
