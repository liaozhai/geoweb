import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import node from 'rollup-plugin-polyfill-node';
import babel from '@rollup/plugin-babel';
import alias from 'rollup-plugin-alias';

export default {  
    input: 'src/index.js',  
    output: [ 
        {
            file: 'public/index.js',
            format: 'iife',
            sourcemap: true,
            exports: 'auto',
            name: 'App',
            inlineDynamicImports: true,         
        }
    ],    
    plugins: [        
        alias({
            entries: [
                { find: 'geotiff', replacement: 'node_modules/geotiff/dist-browser/geotiff.js' }
            ]
        }),
        node({
            include: ['http', 'https', 'url', 'vm']
        }),        
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
        commonjs({
            extensions: [ '.js', '.msj', ],
            transformMixedEsModules: true
        }),
        scss(),
        babel(),
    ],
};