;(function () {
  'use strict'

  angular
    .module('sthclient.components')
    .component('dashboard', {
      templateUrl: 'src/components/dashboard/templates/dashboard.html',
      bindings: {
        accountCtrl: '='
      },
      controller: [
        '$scope', '$mdToast', 'toastService', 'feedService', 'storageService', DashboardController
      ]
    })

  function DashboardController ($scope, $mdToast, toastService, feedService, storageService) {
    this.openExternal = url => {
      require('electron').shell.openExternal(url)
    }
  }

})()
