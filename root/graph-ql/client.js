// src/utils/graphql.js
import { ApolloClient } from 'apollo-client'
import fetch from 'node-fetch'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'

import { createHttpLink } from 'apollo-link-http'
// TODO: Move to main repo
import introspectionQueryResultData from './fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher })

export default ({ token = null }) => {
  if (!process.env.API_ENDPOINT) {
    // eslint-disable-next-line no-throw-literal
    throw 'API_ENDPOINT not set'
  }
  return new ApolloClient({
    // Provide the URL to the API server.
    link: createHttpLink({
      uri: process.env.API_ENDPOINT + '/api?token=' + token,
      fetch
    }),
    // Using a cache for blazingly
    // fast subsequent queries.
    cache
  })
}
