import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';

export default {  
    input: 'src/index.js',  
    output: [ 
        {
            file: 'public/index.js',
            format: 'iife',
            sourcemap: true,
            name: 'App',
        }
    ],
    plugins: [
        resolve(),
        commonjs({ extensions: [ '.js', '.msj', ] }),
        scss(),
    ],
};