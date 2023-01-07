/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				handwritten: ['"Gloria Hallelujah"', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
