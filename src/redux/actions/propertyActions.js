import _ from 'lodash';
import { addDays, differenceInDays, format } from 'date-fns'
import initialState from '../reducers/initialState'

export const STORE_DATA = 'STORE_DATA';
export const MAX_OF_ALL_CUM_RISK_SCORES = 'MAX_OF_ALL_CUM_RISK_SCORES';
export const CALCULATE_CAT_CLAIMS_RISK_SCORE = 'CALCULATE_CAT_CLAIMS_RISK_SCORE';
export const CALCULATE_COV_A_RISK_SCORE = 'CALCULATE_COV_A_RISK_SCORE';
export const CALCULATE_CUMULATIVE_RISK = 'CALCULATE_CUMULATIVE_RISK';
export const CALCULATE_DEDUCTIBLE_LIMIT_RISK_SCORE = 'CALCULATE_DEDUCTIBLE_LIMIT_RISK_SCORE';
export const CALCULATE_DWELLING_RISK_SCORE = 'CALCULATE_DWELLING_RISK_SCORE';
export const CALCULATE_GARAGE_RISK_SCORE = 'CALCULATE_GARAGE_RISK_SCORE';
export const CALCULATE_LIABILITY_CLAIMS_RISK_SCORE = 'CALCULATE_LIABILITY_CLAIMS_RISK_SCORE';
export const CALCULATE_LIABILITY_LIMIT_RISK_SCORE = 'CALCULATE_LIABILITY_LIMIT_RISK_SCORE';
export const CALCULATE_NON_CAT_CLAIMS_RISK_SCORE = 'CALCULATE_NON_CAT_CLAIMS_RISK_SCORE';
export const CALCULATE_OCCUPATION_RISK_SCORE = 'CALCULATE_OCCUPATION_RISK_SCORE';
export const CALCULATE_PROTECTION_CLAIMS_RISK_SCORE = 'CALCULATE_PROTECTION_CLAIMS_RISK_SCORE';
export const CALCULATE_ROOF_RISK_SCORE = 'CALCULATE_ROOF_RISK_SCORE';
export const CALCULATE_ROOF_TYPE_RISK_SCORE = 'CALCULATE_ROOF_TYPE_RISK_SCORE';
export const CALCULATE_RISK_SCORE = 'CALCULATE_RISK_SCORE';
export const CALCULATE_SIDING_RISK_SCORE = 'CALCULATE_SIDING_RISK_SCORE';
export const CALCULATE_SMART_DWELLING_RISK_SCORE = 'CALCULATE_SMART_DWELLING_RISK_SCORE';
export const CALCULATE_SQFT_RISK_SCORE = 'CALCULATE_SQFT_RISK_SCORE';
export const CALCULATE_VIDEO_AND_SMART_DWELLING_RISK_SCORE = 'CALCULATE_VIDEO_AND_SMART_DWELLING_RISK_SCORE';
export const CALCULATE_WATER_LOSS_RISK_SCORE = 'CALCULATE_WATER_LOSS_RISK_SCORE';
export const LOADING = 'LOADING';
export const REFERRAL_DATA = 'REFERRAL_DATA';
export const REFERRAL_LOADING = 'REFERRAL_LOADING';
export const RESET_BUTTON_STATE = 'RESET_BUTTON_STATE';
export const UPDATE_UNDERWRITING_ACTIONS = 'UPDATE_UNDERWRITING_ACTIONS';




export const calculateCumulativeRisk = (riskScoresObj) => {


  const riskProperties = ['occupantsRisk', 'occupationRisk', 'dwellingRisk', 'roofRisk', 'roofTypeRisk', 'sidingRisk', 'slopeRisk', 'garageRisk', 'squareFootRisk', 'covARisk', 'catClaimRisk', 'nonCatClaimRisk', 'liabilityClaimRisk', 'protectionRisk', 'waterLossPrevRisk', 'smartHomeRisk', 'videoHomeRisk', 'otherPoliciesRisk', 'liabilityLimitRisk', 'deductibleRisk', 'priorInsuranceRisk'];

  const riskScores = _.pick(riskScoresObj, riskProperties);
  const riskScoresValues = Array.from(Object.values(riskScores));

  let sum = 0;
  let arrLength = 0;
  riskScoresValues.forEach(item => {

    if (item) {
      sum += parseFloat(item);
      arrLength += 1;
    }
    return sum / arrLength;
  })

  return {
    type: CALCULATE_CUMULATIVE_RISK,
    payload: sum / arrLength
  }
}

export const calculateRiskScore = (cumulativeRisk, maxOfAllCumulativeRisk) => {
  return {
    type: CALCULATE_RISK_SCORE,
    payload: cumulativeRisk / (Math.max(cumulativeRisk, maxOfAllCumulativeRisk))
  }
}

export const loadAllCumRiskScores = (data) => {
  const allCumRiskScores = data.map(policy => {
    return _.get(policy, '[Cum_risk]', null)
  });

  return {
    type: MAX_OF_ALL_CUM_RISK_SCORES,
    payload: Math.max(...allCumRiskScores),
  }
}

export const loadExcelData = (data, policyId) => {
  const payload = data.map(item => {
    return {
      policyId: _.get(item, '[Policy Number]', '-'),
      submissionID: _.get(item, '[Submission ID]', '-'),
      policyOwnerFullName: _.get(item, '[Policy Owner full name]', 'N/A'),
      effectiveDate: _.get(item, '[Policy Effective Date]', '2018-07-22'),
      streetAddress: _.get(item, '[Address_street]', ''),
      cityAddress: _.get(item, '[Address_city]', ''),
      stateAddress: _.get(item, '[Address_state]', ''),
      pinAddress: _.get(item, '[Address_pin]', ''),
      occupation: _.get(item, '[Occupation]', ''),
      occupationRisk: _.get(item, '[Occupation Risk]', ''),
      occupantsRisk: _.get(item, '[Occupants Risk]', ''),
      dwellingRisk: _.get(item, '[Dwelling risk]', ''),
      roofRisk: _.get(item, '[Roof risk]', ''),
      roofTypeRisk: _.get(item, '[Roof type risk]', ''),
      sidingRisk: _.get(item, '[Siding risk]', ''),
      slopeRisk: _.get(item, '[Slope risk]', ''),
      garageRisk: _.get(item, '[Garage risk]', ''),
      squareFootRisk: _.get(item, '[Square foot risk]', ''),
      covARisk: _.get(item, '[Cov A risk]', ''),
      catClaimRisk: _.get(item, '[Cat claim risk]', ''),
      nonCatClaimRisk: _.get(item, '[Noncatclaim risk]', ''),
      liabilityClaimRisk: _.get(item, '[Liability claim Risk]', ''),
      protectionRisk: _.get(item, '[Protection risk]', ''),
      waterLossPrevRisk: _.get(item, '[Water Loss prev Risk]', ''),
      smartHomeRisk: _.get(item, '[Smart Home risk]', ''),
      videoHomeRisk: _.get(item, '[Video home risk]', ''),
      otherPoliciesRisk: _.get(item, '[Other policies risk]', ''),
      liabilityLimitRisk: _.get(item, '[Liability limit risk]', ''),
      deductibleRisk: _.get(item, '[Deductible Risk]', ''),
      priorInsuranceRisk: _.get(item, '[Prior Insurance Risk]', ''),
      riskScore: _.get(item, '[Norm_risk]', 0),
      priorInsurance: _.get(item, '[Prior Insurance]', ""),
      otherPolicies: _.get(item, '[Other Policies in Household]', ''),
      coverageA: _.get(item, '[Cov A Limits ($)]', ''),
      liabilityLimit: _.get(item, '[Liability Limits]', ''),
      // deductibleLimit: _.get(item, '[Deductible]', '0'),
      deductibleLimit: _.get(item, '[Deductible]', 0) < 1 ? `${_.get(item, '[Deductible]', 0) * 100}` : `${_.get(item, '[Deductible]', 0)}`,
      deductibleToken: _.get(item, '[Deductible]', 0) < 1 ? `percent` : `currency`,
      ageOfDwelling: _.get(item, '[Age of dwelling(Yrs)]', ''),
      ageOfRoof: _.get(item, '[Age of roof(yrs)]', ''),
      roofType: _.get(item, '[Roof type]', ''),
      siding: _.get(item, '[Siding]', ''),
      garage: _.get(item, '[Garage]', ''),
      dwellingSqft: _.get(item, '[Dwelling Square foot]', ''),
      waterLossPrevention: _.get(item, '[Water Loss Prevention Device]', ''),
      smartDwelling: _.get(item, '[Smart Home]', ''),
      videoAndSmartDwelling: _.get(item, '[Video & Smart Home]', ''),
      catClaims: `${item['# of CAT claims (in 3 yrs.)']}`,
      nonCatClaims: `${item['# of Non-CAT claims (in 3 yrs.)']}`,
      liabilityClaims: `${item['# of Liability claims (in 3 yrs.)']}`,
      protectionClass: _.get(item, '[Protection Class]', ''),
      conditionConcerns: _.get(item, '[Property Condition Concerns]', ''),
      ratingConcerns: _.get(item, '[Rating Concerns]', ''),
      liabilityConcerns: _.get(item, '[Liability Concern]', ''),
      climateRisk: _.get(item, '[Climate Risk ]', ''),
      underwritingComments: '',
      underwritingActions: ''
    }
  });
  const filterPolicy = payload.filter(item => item.policyId === policyId.trim());

  console.log("Filter Policy object ====> " + JSON.stringify(filterPolicy));

  return {
    type: STORE_DATA,
    payload: filterPolicy,
    cumulativeRiskParams: Array.from(Object.values(filterPolicy[0]).slice(9, 30)),

  }
};


export const loadReferralData = (data, prevReferralData) => {

  const daysPendingArr = [];

  const effectiveDates = data.slice(0, 10).map((datum, index) => {
    const randEffectiveDate = addDays(new Date(), Math.round(Math.random() * 10));
    daysPendingArr.push(differenceInDays(randEffectiveDate, new Date()));
    return format(randEffectiveDate, "M/d/yyyy");
  });

  const referredDates = data.slice(0, 10).map((datum, index) => {
    const randRefferredDate = addDays(new Date(), -(Math.round(Math.random() * 10)));
    return format(randRefferredDate, "M/d/yyyy");
  });



  const payload = data.map((item, index) => {


    return {
      id: index,
      submissionId: _.get(item, '[Submission ID]', '-'),
      policyId: _.get(item, '[Policy Number]', '-'),
      effectiveDate: prevReferralData.length ? prevReferralData.effectiveDate[index] : effectiveDates[index],
      dateReferred: prevReferralData.length ? prevReferralData.dateReferred[index] : referredDates[index],
      daysToReview: prevReferralData.length ? prevReferralData.daysToReview[index] :  daysPendingArr[index],
      status: _.get(item, '[Status]', 'N/A'),


    }
  });
  const filterRefferalByDateDesc = payload.sort((a, b) => new Date(a.effectiveDate) - new Date(b.effectiveDate));
  return {
    type: REFERRAL_DATA,
    payload: filterRefferalByDateDesc.slice(0, 100),
    rawObj: data
  }
};

export const loading = value => {
  return {
    type: LOADING,
    payload: value
  }
};


export const referralLoading = value => {
  return {
    type: REFERRAL_LOADING,
    payload: value
  }
};

export const calculateOccupationRisk = (variable, occupation) => {

  let occupationRisk;

  if (occupation === 'Clerk') {
    occupationRisk = .0116;
  } else if (occupation === 'Driver') {
    occupationRisk = .0066;
  } else if (occupation === 'Manager') {
    occupationRisk = .0033;
  } else if (occupation === 'Other') {
    occupationRisk = .0033;
  } else if (occupation === 'Teacher') {
    occupationRisk = .087;
  }


  return {
    type: CALCULATE_OCCUPATION_RISK_SCORE,
    payload: occupation,
    riskScore: occupationRisk,
    variable: variable
  }
}

export const calculateCovARisk = (variable, coverageALimit) => {

  const covALimit = coverageALimit.slice(0,1) === '$' ? parseInt(coverageALimit.slice(1)) : parseInt(coverageALimit);
  let covARisk;

  if (covALimit <= 500000) {
    covARisk = .0033;
  } else if (covALimit > 500000 && covALimit <= 600000) {
    covARisk = .0087;
  } else if (covALimit > 600000 && covALimit <= 700000) {
    covARisk = .0116;
  } else if (covALimit > 700000 && covALimit <= 800000) {
    covARisk = .0066;
  } else if (covALimit > 800000) {
    covARisk = .0258;
  }


  return {
    type: CALCULATE_COV_A_RISK_SCORE,
    payload: covALimit,
    riskScore: covARisk,
    variable: variable
  }
}

export const calculateLiabilityLimitRisk = (variable, liabilityLimit) => {

  const liabLimit = parseInt(liabilityLimit);
  let liabilityLimitRisk;

  if (liabLimit === 3000000) {
    liabilityLimitRisk = .0063;
  } else if (liabLimit === 2000000) {
    liabilityLimitRisk = .0104;
  } else if (liabLimit === 1000000) {
    liabilityLimitRisk = .0079;
  } else if (liabLimit === 500000) {
    liabilityLimitRisk = .0025;
  }


  return {
    type: CALCULATE_LIABILITY_LIMIT_RISK_SCORE,
    payload: liabLimit,
    riskScore: liabilityLimitRisk,
    variable: variable
  }
}

export const calculateDeductibleLimitRisk = (variable, deductibleLimit) => {

  const deductLimit = parseInt(deductibleLimit);
  let deductibleLimitRisk;

  if (deductLimit === 1000) {
    deductibleLimitRisk = .0061;
  } else if (deductLimit === 2000) {
    deductibleLimitRisk = .0114;
  } else if (deductLimit === 3000) {
    deductibleLimitRisk = .0107;
  } else if (deductLimit === 4000) {
    deductibleLimitRisk = .0053;
  } else if (deductLimit === 1) {
    deductibleLimitRisk = .0075;
  } else if (deductLimit === 2) {
    deductibleLimitRisk = .0086;
  }


  return {
    type: CALCULATE_DEDUCTIBLE_LIMIT_RISK_SCORE,
    payload: deductLimit,
    riskScore: deductibleLimitRisk,
    variable: variable
  }
}

export const calculateDwellingRisk = (variable, ageOfDwelling) => {

  const dwellingAge = parseInt(ageOfDwelling);
  let dwellingRisk;

  if (dwellingAge <= 5) {
    dwellingRisk = .0025;
  } else if (dwellingAge <= 10) {
    dwellingRisk = .0079;
  } else if (dwellingAge <= 19) {
    dwellingRisk = .0104;
  } else if (dwellingAge >= 20) {
    dwellingRisk = .0063;
  }


  return {
    type: CALCULATE_DWELLING_RISK_SCORE,
    payload: dwellingAge,
    riskScore: dwellingRisk,
    variable: variable
  }
}

export const calculateRoofRisk = (variable, ageOfRoof) => {

  const roofAge = parseInt(ageOfRoof);
  let roofRisk;

  if (roofAge <= 5) {
    roofRisk = .0025;
  } else if (roofAge <= 10) {
    roofRisk = .0080;
  } else if (roofAge <= 19) {
    roofRisk = .0135;
  } else if (roofAge >= 20) {
    roofRisk = .0106;
  }


  return {
    type: CALCULATE_ROOF_RISK_SCORE,
    payload: roofAge,
    riskScore: roofRisk,
    variable: variable
  }
}

export const calculateRoofTypeRisk = (variable, roofType) => {

  let roofTypeRisk;

  if (roofType === 'Comp Shingle') {
    roofTypeRisk = .0025;
  } else if (roofType === 'Gravel') {
    roofTypeRisk = .0080;
  } else if (roofType === 'Metal') {
    roofTypeRisk = .0136;
  } else if (roofType === 'Other') {
    roofTypeRisk = .0025;
  } else if (roofType === 'Slate') {
    roofTypeRisk = .0117;
  } else if (roofType === 'Tile') {
    roofTypeRisk = .0184;
  } else if (roofType === 'Wood') {
    roofTypeRisk = .0241;
  }


  return {
    type: CALCULATE_ROOF_TYPE_RISK_SCORE,
    payload: roofType,
    riskScore: roofTypeRisk,
    variable: variable
  }
}

export const calculateSidingRisk = (variable, siding) => {

  let sidingRisk;

  if (siding === 'Metal (Aluminum or Steel)') {
    sidingRisk = .0079;
  } else if (siding === 'Other') {
    sidingRisk = .0025;
  } else if (siding === 'Stucco') {
    sidingRisk = .0116;
  } else if (siding === 'Vinyl Siding') {
    sidingRisk = .0025;
  } else if (siding === 'Wood') {
    sidingRisk = .0136;
  }


  return {
    type: CALCULATE_SIDING_RISK_SCORE,
    payload: siding,
    riskScore: sidingRisk,
    variable: variable
  }
}

export const calculateGarageRisk = (variable, garageType) => {

  let garageRisk;

  if (garageType === 'Attached') {
    garageRisk = .0055;
  } else if (garageType === 'Detached') {
    garageRisk = .0140;
  } else if (garageType === 'No Garage') {
    garageRisk = .0000;
  }


  return {
    type: CALCULATE_GARAGE_RISK_SCORE,
    payload: garageType,
    riskScore: garageRisk,
    variable: variable
  }
}

export const calculateSqFtRisk = (variable, sqft) => {

  let sqftRisk;

  if (sqft <= 1000) {
    sqftRisk = .0025;
  } else if (sqft <= 3000) {
    sqftRisk = .0089;
  } else if (sqft <= 4000) {
    sqftRisk = .0104;
  } else if (sqft > 4000) {
    sqftRisk = .0063
  }


  return {
    type: CALCULATE_SQFT_RISK_SCORE,
    payload: sqft,
    riskScore: sqftRisk,
    variable: variable
  }
}

export const calculateWaterLossPreventionRisk = (variable, waterLossDeviceStatus) => {

  let waterLossRisk;

  if (waterLossDeviceStatus === 'Yes') {
    waterLossRisk = -0.005;
  } else if (waterLossDeviceStatus === 'No') {
    waterLossRisk = null;
  }


  return {
    type: CALCULATE_WATER_LOSS_RISK_SCORE,
    payload: waterLossDeviceStatus,
    riskScore: waterLossRisk,
    variable: variable
  }
}

export const calculateSmartDwellingRisk = (variable, smartDwellingStatus) => {

  let smartDwellingRisk;

  if (smartDwellingStatus === 'Yes') {
    smartDwellingRisk = -0.005;
  } else if (smartDwellingStatus === 'No') {
    smartDwellingRisk = null;
  }


  return {
    type: CALCULATE_SMART_DWELLING_RISK_SCORE,
    payload: smartDwellingStatus,
    riskScore: smartDwellingRisk,
    variable: variable
  }
}

export const calculateVideoAndSmartDwellingRisk = (variable, videoAndSmartDwellingStatus) => {

  let videoAndSmartDwellingRisk;

  if (videoAndSmartDwellingStatus === 'Yes') {
    videoAndSmartDwellingRisk = -0.005;
  } else if (videoAndSmartDwellingStatus === 'No') {
    videoAndSmartDwellingRisk = null;
  }


  return {
    type: CALCULATE_VIDEO_AND_SMART_DWELLING_RISK_SCORE,
    payload: videoAndSmartDwellingStatus,
    riskScore: videoAndSmartDwellingRisk,
    variable: variable
  }
}

export const calculateCatClaimsRisk = (variable, catClaimsNumber) => {


  let catClaimsRisk;

  if (catClaimsNumber === '0') {
    catClaimsRisk = .0272;
  } else if (catClaimsNumber === '1') {
    catClaimsRisk = .0328;
  } else if (catClaimsNumber === '2') {
    catClaimsRisk = .0928;
  } else if (catClaimsNumber === '3+') {
    catClaimsRisk = .1363;
  }


  return {
    type: CALCULATE_CAT_CLAIMS_RISK_SCORE,
    payload: catClaimsNumber,
    riskScore: catClaimsRisk,
    variable: variable
  }
}

export const calculateNonCatClaimsRisk = (variable, nonCatClaimsNumber) => {


  let nonCatClaimsRisk;

  if (nonCatClaimsNumber === '0') {
    nonCatClaimsRisk = .0272;
  } else if (nonCatClaimsNumber === '1') {
    nonCatClaimsRisk = .0329;
  } else if (nonCatClaimsNumber === '2') {
    nonCatClaimsRisk = .0928;
  } else if (nonCatClaimsNumber === '3+') {
    nonCatClaimsRisk = .1363;
  }


  return {
    type: CALCULATE_NON_CAT_CLAIMS_RISK_SCORE,
    payload: nonCatClaimsNumber,
    riskScore: nonCatClaimsRisk,
    variable: variable
  }
}

export const calculateLiabilityClaimsRisk = (variable, liabilityClaimsNumber) => {


  let liabilityClaimsRisk;

  if (liabilityClaimsNumber === '0') {
    liabilityClaimsRisk = .0272;
  } else if (liabilityClaimsNumber === '1') {
    liabilityClaimsRisk = .0329;
  } else if (liabilityClaimsNumber === '2') {
    liabilityClaimsRisk = .0928;
  } else if (liabilityClaimsNumber === '3+') {
    liabilityClaimsRisk = .1363;
  }


  return {
    type: CALCULATE_LIABILITY_CLAIMS_RISK_SCORE,
    payload: liabilityClaimsNumber,
    riskScore: liabilityClaimsRisk,
    variable: variable
  }
}

export const calculateProtectionClaimsRisk = (variable, protectionClaimsNumber) => {


  let protectionClaimsRisk;

  if (protectionClaimsNumber === '1') {
    protectionClaimsRisk = .0033;
  } else if (protectionClaimsNumber === '2') {
    protectionClaimsRisk = .0085;
  } else if (protectionClaimsNumber === '3') {
    protectionClaimsRisk = .0106;
  } else if (protectionClaimsNumber === '4') {
    protectionClaimsRisk = .0065;
  } else if (protectionClaimsNumber === '5') {
    protectionClaimsRisk = .0057;
  } else if (protectionClaimsNumber === '6') {
    protectionClaimsRisk = .0117;
  } else if (protectionClaimsNumber === '7') {
    protectionClaimsRisk = .0114;
  } else if (protectionClaimsNumber === '8') {
    protectionClaimsRisk = .0184;
  } else if (protectionClaimsNumber === '9') {
    protectionClaimsRisk = .09;
  } else if (protectionClaimsNumber === '10') {
    protectionClaimsRisk = .1;
  }


  return {
    type: CALCULATE_PROTECTION_CLAIMS_RISK_SCORE,
    payload: protectionClaimsNumber,
    riskScore: protectionClaimsRisk,
    variable: variable
  }
}

export const updateUnderwritingActions = (variable, action) => {

  return {
    type: UPDATE_UNDERWRITING_ACTIONS,
    payload: action,
    variable: variable
  }
}

export const updatePolicy = (variable, value) => {

  if (variable === 'occupation') {
    return calculateOccupationRisk(variable, value);
  }
  if (variable === 'coverageA') {
    return calculateCovARisk(variable, value);
  }
  if (variable === 'liabilityLimit') {
    return calculateLiabilityLimitRisk(variable, value);
  }
  if (variable === 'deductibleLimit') {
    return calculateDeductibleLimitRisk(variable, value);
  }
  if (variable === 'ageOfDwelling') {
    return calculateDwellingRisk(variable, value);
  }
  if (variable === 'ageOfRoof') {
    return calculateRoofRisk(variable, value);
  }
  if (variable === 'roofType') {
    return calculateRoofTypeRisk(variable, value);
  }
  if (variable === 'siding') {
    return calculateSidingRisk(variable, value);
  }
  if (variable === 'garage') {
    return calculateGarageRisk(variable, value);
  }
  if (variable === 'dwellingSqft') {
    return calculateSqFtRisk(variable, value);
  }
  if (variable === 'waterLossPrevention') {
    return calculateWaterLossPreventionRisk(variable, value);
  }
  if (variable === 'smartDwelling') {
    return calculateSmartDwellingRisk(variable, value);
  }
  if (variable === 'videoAndSmartDwelling') {
    return calculateVideoAndSmartDwellingRisk(variable, value);
  }
  if (variable === 'catClaims') {
    return calculateCatClaimsRisk(variable, value);
  }
  if (variable === 'nonCatClaims') {
    return calculateNonCatClaimsRisk(variable, value);
  }
  if (variable === 'liabilityClaims') {
    return calculateLiabilityClaimsRisk(variable, value);
  }
  if (variable === 'protectionClass') {
    return calculateProtectionClaimsRisk(variable, value);
  }
  if (variable === 'underwritingActions') {
    return updateUnderwritingActions(variable, value);
  }
}

export const resetButtonState = () => {
  return {
    type: RESET_BUTTON_STATE,
    payload: 'inactive',
  }
}