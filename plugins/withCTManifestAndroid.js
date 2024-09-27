const { AndroidConfig, withAndroidManifest } = require("@expo/config-plugins");
const { addMetaDataItemToMainApplication, getMainApplicationOrThrow } = AndroidConfig.Manifest;

function setCustomConfigAsync(
  config,
  androidManifest
) {

  const mainApplication = getMainApplicationOrThrow(androidManifest);

  addMetaDataItemToMainApplication(
    mainApplication,
    // value for `android:name`
    "CLEVERTAP_ACCOUNT_ID",
    // value for `android:value`
    "TEST-RZ5-4WZ-9W7Z"
  );
  addMetaDataItemToMainApplication(
    mainApplication,
    // value for `android:name`
    "CLEVERTAP_TOKEN",
    // value for `android:value`
    "TEST-104-512"
  );
  // copy paste the  addMetaDataItemToMainApplication method and any other manifest attributes can be added
  
    return androidManifest
  }
module.exports = function withAndroidApplicationAttributes(config, attributes) {
  return withAndroidManifest(config, (config) => {
  
    config.modResults = setCustomConfigAsync(config, config.modResults);
    return config;
  });
};