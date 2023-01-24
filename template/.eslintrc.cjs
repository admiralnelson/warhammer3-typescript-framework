module.exports = {
    extends: ['plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    "rules": {
        "@typescript-eslint/ban-types": [
            "error",
            {
              "types": {
                // add a custom message to help explain why not to use it
                "Array": "Because Typescript to Lua doesn't support it. Use [] instead, example number[] or Lord[]",
                "Map": "Some Map constrcut such as .foreach is not supported. Use LuaMap<K, V> instead, however you are allowed to use new Map construct and cast it to LuaMap<> if you need to pass it around to other functions",
                "RegExp": "Regex is not supported yet.",
              },
              "extendDefaults": true
            }
        ],
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-unused-vars" : "off"
      },
  };