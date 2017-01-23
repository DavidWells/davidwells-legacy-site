import React from 'react'
import { Route } from 'react-router'
import DynamicLayout from './phenomic'
import App from './app' /* Main entry of all requests */
import Blog from './pages/Blog' /* Blog for pagination views */

export default (
  <Route component={App}>
    <Route path='/blog/page/:page' component={Blog} />
    <Route path='access_token=:token' component={App} />
    <Route path='*' component={DynamicLayout} />
  </Route>
)
