import * as templatesTable from "../pages/templatesTable"

export const appCookies = [
  'CONSUMER_DOSSIER_TIERS',
  'CS',
  'DEFAULT_ACCOUNT',
  'DOSSIER_DELIVERY_CREDITS',
  'DOSSIER_PLAN_START_TIMESTAMP',
  'EMAIL',
  'ENTERPRISE_DOSSIER',
  'FULLNAME',
  'INSTITUTIONS',
  'ISLOGGEDIN',
  'LOGIN_TIME',
  'PID',
  'PORTFOLIO_USER',
  'PRODUCTS',
  'PROFILE_PHOTOS',
  'REFERRER',
  '_interfolio_session',
  'ahoy_visit',
  'ahoy_visitor',
  'ajs_anonymous_id'
];

export function createUUID() {
  return 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function checkURLcontains(termToVerify: string, time: number = 0) {
  cy.location('pathname', { timeout: time }).should('include', termToVerify)
}