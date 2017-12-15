'use strict'

describe('feedService', function () {

  let feedService

  beforeEach(() => {
    module('sthclient.services')

    inject($injector => {
      feedService = $injector.get('feedService')
    })
  })

  describe('fetchBlogEntries', function () {
    it('fetches and parses the SmartHoldem.io feed URL', function () {
      const stub = sinon.stub(feedService, 'fetchAndParse').resolves('OK')
      feedService.fetchBlogEntries()
      expect(stub.firstCall.args[0]).to.eql('https://SmartHoldem.io/feed')
    })
  })
})
