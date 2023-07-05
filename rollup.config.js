import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import sveld from "sveld";

const pkg = require('./package.json');
const onwarn = (warning, _onwarn) =>
    warning.code === 'a11y-label-has-associated-control' ||
    _onwarn(warning);
export default {
    input: 'src/components/index.ts',
    output: {
        dir: 'output',
        format: 'cjs'
    },
    plugins: [
        svelte({onwarn}),
        resolve(),
        typescript(),
        sveld()
    ],
};
