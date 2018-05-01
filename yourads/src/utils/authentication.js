import { AsyncStorage } from 'react-native';

const AUTHENTICATION_STORAGE_KEY = 'YourAdsState:Authentication_Key';
const AUTHENTICATION_STORAGE_PROFILE = 'YourAdsState:Authentication_Profile';

export function getAuthenticationToken() {
  return AsyncStorage.getItem(AUTHENTICATION_STORAGE_KEY);
}

export async function setAuthenticationToken(token) {
  return AsyncStorage.setItem(AUTHENTICATION_STORAGE_KEY, token);
}

export async function clearAuthenticationToken() {
  return AsyncStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
}

export async function getAuthenticationProfile() {
  return AsyncStorage.getItem(AUTHENTICATION_STORAGE_PROFILE);
}

export async function setAuthenticationProfile(profile) {
  return AsyncStorage.setItem(AUTHENTICATION_STORAGE_PROFILE, profile);
}

export async function clearAuthenticationProfile() {
  return AsyncStorage.removeItem(AUTHENTICATION_STORAGE_PROFILE);
}
