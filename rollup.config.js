import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const pkg = require('./package.json');

export default {
    input: 'src/components/index.ts',
    output: {
        dir: 'output',
        format: 'cjs'
    },
    plugins: [
        svelte(),
        resolve(),
        typescript()
    ],
};
