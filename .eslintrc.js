module.exports = {
	extends: ["prettier", "airbnb-base"],
	root: true,
	parser: "babel-eslint",
	plugins: ["import", "babel", "prettier"],
	settings: {
		"import/resolver": {
			node: {
				moduleDirectory: ["node_modules", "/"]
				// paths: ["src"]
			}
		}
	},
	env: {
		es2021: true,
		node: true
	},
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module"
	},
	rules: {
		"import/extensions": 0,
		"import/prefer-default-export": 0,
		"comma-dangle": ["error", "never"],
		quotes: [2, "double", { avoidEscape: true }],
		"no-tabs": 0,
		indent: [2, "tab"],
		"no-console": 0,
		"no-unused-vars": 1,
		"global-require": 0,
		"no-return-await": 2,
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
				singleQuote: false,
				trailingComma: "none",
				semi: true,
				bracketSpacing: true,
				jsxBracketSameLine: true,
				printWidth: 80,
				tabWidth: 2,
				useTabs: true
			}
		]
	}
};
