;(function () {
  'use strict'

  /**
   * NOTE This component uses the entire AccountController yet: it's the first
   * step to refactor the `index.html`
   */

  angular
    .module('sthclient.components')
    .component('marketBox', {
      templateUrl: 'src/components/dashboard/market-box.html',
      bindings: {
        accountCtrl: '='
      },
      controller: MarketController
    })

  function MarketController ($scope) {
    this.$onInit = () => {
      this.ul = this.accountCtrl
    }
  }

})()
