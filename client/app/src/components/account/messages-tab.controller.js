;(function () {
  'use strict'

  /**
   * NOTE This component uses the entire AccountController yet: it's the first
   * step to refactor the `index.html`
   */

  angular
    .module('sthclient.components')
    .component('messagesTab', {
      templateUrl: 'src/components/account/templates/messages-tab.html',
      bindings: {
        accountCtrl: '='
      },
      controller: MessagesTabController
    })

  function MessagesTabController ($scope) {
    this.$onInit = () => {
      this.ul = this.accountCtrl
    }
  }

})()
