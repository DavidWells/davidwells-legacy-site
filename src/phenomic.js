/**
 * Phenomic component that renders the correct
 * layout and markdown based on current URL route
 */
import React from 'react'
import { PageContainer } from 'phenomic'
import * as layouts from './layouts/index' // Page Layouts
import * as templates from './pages' // Page Layouts

const DynamicLayout = (props) => {
  return (
    <PageContainer
      {...props}
      defaultLayout={'Default'}
      layouts={{ ...layouts, ...templates }}
    />
  )
}

export default DynamicLayout
