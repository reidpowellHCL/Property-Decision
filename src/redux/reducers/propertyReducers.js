import {
  CALCULATE_CAT_CLAIMS_RISK_SCORE,
  CALCULATE_COV_A_RISK_SCORE,
  CALCULATE_CUMULATIVE_RISK,
  CALCULATE_DEDUCTIBLE_LIMIT_RISK_SCORE,
  CALCULATE_DWELLING_RISK_SCORE,
  CALCULATE_GARAGE_RISK_SCORE,
  CALCULATE_LIABILITY_CLAIMS_RISK_SCORE,
  CALCULATE_LIABILITY_LIMIT_RISK_SCORE,
  CALCULATE_NON_CAT_CLAIMS_RISK_SCORE,
  CALCULATE_OCCUPATION_RISK_SCORE,
  CALCULATE_PROTECTION_CLAIMS_RISK_SCORE,
  CALCULATE_RISK_SCORE,
  CALCULATE_ROOF_RISK_SCORE,
  CALCULATE_ROOF_TYPE_RISK_SCORE,
  CALCULATE_SIDING_RISK_SCORE,
  CALCULATE_SMART_DWELLING_RISK_SCORE,
  CALCULATE_SQFT_RISK_SCORE,
  CALCULATE_VIDEO_AND_SMART_DWELLING_RISK_SCORE,
  CALCULATE_WATER_LOSS_RISK_SCORE,
  LOADING,
  MAX_OF_ALL_CUM_RISK_SCORES,
  REFERRAL_DATA,
  REFERRAL_LOADING,
  STORE_DATA,
  UPDATE_UNDERWRITING_ACTIONS
} from '../actions/propertyActions';
import { initialState } from './initialState';

export default (state = initialState.property, action) => {
  switch (action.type) {
    case CALCULATE_CAT_CLAIMS_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            catClaimRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_COV_A_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            covARisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_CUMULATIVE_RISK:
      return {
        ...state,
        cumulativeRisk: action.payload
      }
    case CALCULATE_DEDUCTIBLE_LIMIT_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            deductibleRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_DWELLING_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            dwellingRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_GARAGE_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            garageRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_LIABILITY_CLAIMS_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            liabilityClaimRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_LIABILITY_LIMIT_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            liabilityLimitRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_NON_CAT_CLAIMS_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            nonCatClaimRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_OCCUPATION_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            occupationRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_PROTECTION_CLAIMS_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            protectionRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_ROOF_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            roofRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_ROOF_TYPE_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            roofTypeRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_RISK_SCORE:
      return {
        ...state,
        riskScore: action.payload
      }
    case CALCULATE_SIDING_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            sidingRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_SMART_DWELLING_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            smartHomeRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_SQFT_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            squareFootRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_VIDEO_AND_SMART_DWELLING_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            videoHomeRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case CALCULATE_WATER_LOSS_RISK_SCORE:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            waterLossPrevRisk: action.riskScore,
            [action.variable]: action.payload
          }
        ]
      }
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case MAX_OF_ALL_CUM_RISK_SCORES:
      return {
        ...state,
        loading: false,
        maxOfAllCumRiskScores: action.payload
      }
    case REFERRAL_DATA:
      return {
        ...state,
        rawObj: action.rawObj,
        referralData: action.payload,
        loading: false
      }
    case REFERRAL_LOADING:
      return {
        ...state,
        referralDataIsLoading: action.payload
      }
    case STORE_DATA:
      return {
        ...state,
        cumulativeRiskParams: action.cumulativeRiskParams,
        policies: action.payload,
        loading: false
      }
    case UPDATE_UNDERWRITING_ACTIONS:
      return {
        ...state,
        policies: [
          {
            ...state.policies[0],
            [action.variable]: action.payload
          }
        ]
      }
    default:
      return state;
  }
}