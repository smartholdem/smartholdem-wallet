;(function () {
  'use strict'

  /**
   * NOTE This component uses the entire AccountController yet: it's the first
   * step to refactor the `index.html`
   */

  angular
    .module('sthclient.components')
    .component('assetsTab', {
      templateUrl: 'src/components/account/templates/assets-tab.html',
      bindings: {
        accountCtrl: '='
      },
      controller: AssetsTabController
    })

  function AssetsTabController ($scope) {
    this.$onInit = () => {
      this.ul = this.accountCtrl
    }
  }

})()
