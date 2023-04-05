import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	alias: {
		$app: '/node_modules/@sveltejs/kit/assets/app',
		$lib: '/src/lib',
	},
});
