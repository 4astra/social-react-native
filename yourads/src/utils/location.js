import { AsyncStorage } from 'react-native';

const loc = { // lat=10.43243&lng=105.43432
  "coords":
    { "speed": -1, "longitude": 105.43432, "latitude": 10.43243, "accuracy": 5, "heading": -1, "altitude": 0, "altitudeAccuracy": -1 },
  "timestamp": 1518144095769.74
};

const LOCATION_STORAGE_KEY = 'YourAdsState:Location';


/**
 * @author Hoat Ha
 * @desc Location Manager
 */

export async function getLocationInfo() {
  try {
    const value = AsyncStorage.getItem(LOCATION_STORAGE_KEY);
    return value;
  } catch (error) {
    return null;
  }
}

export async function setLocationInfo(token) {
  try {
    AsyncStorage.setItem(LOCATION_STORAGE_KEY, token);
  } catch (error) {
    // Error saving data
  }
}

export async function clearLocationInfo() {
  return AsyncStorage.removeItem(LOCATION_STORAGE_KEY);
}

export function defaultLoc() {
  return loc;
}
