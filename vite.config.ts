import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	define: {
		API_PATH: JSON.stringify('https://hoophub.azurewebsites.net/api/v1/')
	}
});