const { ConfigPlugin, withMainApplication } = require("@expo/config-plugins");
const ANDROID_IMPORT_CLEVERTAP = 'com.clevertap.android.sdk.ActivityLifecycleCallback';
const ANDROID_IMPORT_CLEVERTAP_ACTIVITY_HELPER = 'com.clevertap.android.sdk.CleverTapAPI';
const CLEVERTAP_ONCREATE_INIT = `
    CleverTapAPI.setDebugLevel(3);
    ActivityLifecycleCallback.register(this);
`;

function addJavaImports(javaSource, javaImports) {
    const lines = javaSource.split('\n');
    const lineIndexWithPackageDeclaration = lines.findIndex((line) => line.match(/^package .*;$/));
    for (const javaImport of javaImports) {
      if (!javaSource.includes(javaImport)) {
        const importStatement = `import ${javaImport}`;
        lines.splice(lineIndexWithPackageDeclaration + 1, 0, importStatement);
      }
    }
    return lines.join('\n');
}

function addOnCreate(javaSource, javaInsert) {
    const lines = javaSource.split('\n');
    const onCreateIndex = lines.findIndex((line) => line.match(/override fun onCreate\(\) \{/));
    lines.splice(onCreateIndex + 1, 0, javaInsert);
    return lines.join('\n');
}

const withCLEVERTAPSDK = (config) => {
    return withMainApplication(config, (config) => {
       
            let content = config.modResults.contents;
            content = addJavaImports(content, [ANDROID_IMPORT_CLEVERTAP, ANDROID_IMPORT_CLEVERTAP_ACTIVITY_HELPER]);
            content = addOnCreate(content, CLEVERTAP_ONCREATE_INIT);
            config.modResults.contents = content;
        
        return config;
    });
};

module.exports = withCLEVERTAPSDK;

