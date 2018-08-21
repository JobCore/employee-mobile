module.exports = {
  "env": {
    "react-native/react-native": true,
  },
  // preserve order so react-native rules override non-native rules
  "extends": [
    // non-react-native code
    "airbnb",
    // bring everything from the plugin then disable specific rules as needed
    "plugin:react-native/all",
  ],
  // preserve order so react-native rules override non-native rules
  "plugins": [
    "react",
    "react-native",
  ],
  "rules": {
    "comma-dangle": [2, {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "never",
    }],
    "global-require": 0,
    "indent": ["error", 2, {
      "ImportDeclaration": "first",
    }],
    "max-len": ["error", 80, {
      "ignoreStrings": true,
      "ignoreUrls": true,
      // danlugo92: needed for jsDoc long comments involving typedef and import,
      // please respect the max line length in comments otherwise
      "ignoreComments": true,
      "ignoreTemplateLiterals": true,
    }],
    "implicit-arrow-linebreak": 0,
    "no-underscore-dangle": 0,
    "object-curly-newline": 0,
    "no-plusplus": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-no-bind": 0,
    "react/prefer-stateless-function": 2,
    // We won't use propTypes, we'll rely on typescript's typechecking
    "react/prop-types": 0,
    "semi": ["error", "never"],
  },
};
