/**
 * Initialize analytics
 */
import { initializeVisitorID } from './visitor'
import initializeReferralData from './source/referrer'
import initializeParamData from './source/urlParams'

export default function InitializeAnalytics() {
  // Set Param Data
  initializeParamData()
  // Set IDs
  initializeVisitorID()
  // Set Refferer
  initializeReferralData()
}
