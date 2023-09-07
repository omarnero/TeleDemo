module.exports = {
	arrowParens: "avoid",
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: "auto",
	htmlWhitespaceSensitivity: "css",
	insertPragma: false,
	jsxSingleQuote: false,
	printWidth: 80,
	proseWrap: "always",
	quoteProps: "as-needed",
	requirePragma: false,
	semi: true,
	singleAttributePerLine: false,
	singleQuote: false,
	tabWidth: 2,
	trailingComma: "all",
	useTabs: true,
	overrides: [
		{
			files: ["**/*.json"],
			options: {
				useTabs: false,
			},
		},
	],
	plugins: [require("prettier-plugin-tailwindcss")],
};
