;(function () {
  'use strict'

  angular.module('sthclient.services')
    .service('feedService', [FeedService])

  function FeedService () {
    return {
      /**
       * Fetches and parses the RSS of an URL
       */
      fetchAndParse (url) {
        const rssParser = require('rss-parser')

        return new Promise((resolve, reject) => {
          rssParser.parseURL(url, (err, parsed) => {
            err ? reject(err) : resolve(parsed)
          })
        })
      },

      /**
       * RSS of SmartHoldem.io
       */
      fetchBlogEntries () {
        const rssUrl = 'https://community.smartholdem.io/category/1.rss?uid=1&token=21930113-18b9-499d-9c68-60625e1827ce'
        return this.fetchAndParse(rssUrl).then(parsed => parsed.feed.entries)
      }
    }
  }

})()
