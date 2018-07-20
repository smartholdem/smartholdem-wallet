'use strict'
// const ledger = require('ledgerco')

let connected = false

setInterval(() => {
  /*
  ledger.comm_node.list_async().then((deviceList) => {
    connected = deviceList.length > 0
    process.send({connected: connected})
  })
  */
}, connected ? 1500 : 1000)

process.on('message', (message) => {
  if (message.quit) {
    process.exit()
  }
})
