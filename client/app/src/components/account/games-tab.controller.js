;(function () {
  'use strict'

  /**
   * NOTE This component uses the entire AccountController yet: it's the first
   * step to refactor the `index.html`
   */

  angular
    .module('sthclient.components')
    .component('gamesTab', {
      templateUrl: 'src/components/account/templates/games-tab.html',
      bindings: {
        accountCtrl: '='
      },
      controller: GamesTabController
    })

  function GamesTabController ($scope) {
    this.$onInit = () => {
      this.ul = this.accountCtrl
    }
  }

})()
