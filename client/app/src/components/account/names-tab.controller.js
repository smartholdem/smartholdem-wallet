;(function () {
  'use strict'

  /**
   * NOTE This component uses the entire AccountController yet: it's the first
   * step to refactor the `index.html`
   */

  angular
    .module('sthclient.components')
    .component('namesTab', {
      templateUrl: 'src/components/account/templates/names-tab.html',
      bindings: {
        accountCtrl: '='
      },
      controller: NamesTabController
    })

  function NamesTabController ($scope) {
    this.$onInit = () => {
      this.ul = this.accountCtrl
    }
  }

})()
