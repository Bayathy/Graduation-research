import reactPlugin from "@eslint-react/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import simpleImport from "eslint-plugin-simple-import-sort";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import globals from "globals";
import url from "node:url";
import tseslint from "typescript-eslint";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default tseslint.config(
	{
		ignores: [
			"eslint.config.mjs",
			"eslint.config.js",
			"node_modules/",
			".next",
		],
	},
	{
		plugins: {
			["@typescript-eslint"]: tseslint.plugin,
			["import"]: fixupPluginRules(importPlugin),
			["simple-import-sort"]: simpleImport,
			["react"]: reactPlugin,
			["tailwindcss"]: tailwindPlugin,
		},
	},

	eslint.configs.recommended,
	...tailwindPlugin.configs["flat/recommended"],
	...tseslint.configs.recommended,
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tseslint.parser,
			globals: {
				...globals.es2020,
				...globals.node,
			},
			parserOptions: {
				allowAutomaticSingleRunInference: true,
				project: ["tsconfig.json", "packages/*/tsconfig.json"],
				tsconfigRootDir: __dirname,
				warnOnUnsupportedTypeScriptVersion: false,
			},
		},
		rules: {
			"import/consistent-type-specifier-style": "error",
			"import/first": "error",
			"import/newline-after-import": "error",
			"import/no-absolute-path": "error",
			"import/no-amd": "error",
			"import/no-default-export": "error",
			"import/no-duplicates": "error",
			"import/no-extraneous-dependencies": [
				"error",
				{
					devDependencies: true,
					peerDependencies: true,
					optionalDependencies: false,
				},
			],
			"import/no-named-default": "error",
			"import/no-named-export": "off",
			"import/no-self-import": "error",
			"import/prefer-default-export": "off",
			"simple-import-sort/imports": "error",
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		...reactPlugin.configs.recommended,
	},
);
