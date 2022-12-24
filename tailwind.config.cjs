/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['Kalam', 'sans-serif'],
				handwritten: ['"Gloria Hallelujah"', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
