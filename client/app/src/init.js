;(function () {
  'use strict'

  angular.module('sthclient.filters', [])
  angular.module('sthclient.services', ['ngMaterial'])
  angular.module('sthclient.directives', [])
  angular.module('sthclient.accounts', ['ngMaterial', 'sthclient.services', 'sthclient.filters', 'sthclient.addons'])
  angular.module('sthclient.components', ['gettext', 'ngMaterial', 'sthclient.services', 'sthclient.accounts'])
  angular.module('sthclient.addons', [])
  angular.module('sthclient.constants', [])
})()
