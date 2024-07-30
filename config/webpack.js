const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const filesToCopy = [
	// PSPDFKit files.
	{
		from: './node_modules/pspdfkit/dist/pspdfkit-lib',
		to: './pspdfkit-lib',
	},
	// Application CSS.
	{
		from: './src/index.css',
		to: './index.css',
	},
	// Example PDF.
	{
		from: './assets/document.pdf', 
		to: './document.pdf', 
	},
];

/**
 * webpack main configuration object.
 */
const config = {
	entry: path.resolve(__dirname, '../src/index.ts'),
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			// All files with a `.ts` or `.tsx` extension will be handled by `ts-loader`.
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),

		// Copy the WASM/ASM and CSS files to the `output.path`.
		new CopyWebpackPlugin({ patterns: filesToCopy }),
	],

	optimization: {
		splitChunks: {
			cacheGroups: {
				// Creates a `vendor.js` bundle that contains external libraries (including `pspdfkit.js`).
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true,
				},
			},
		},
	},
};

module.exports = config;