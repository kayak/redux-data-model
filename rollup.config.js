const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const filesize = require('rollup-plugin-filesize');
const typescript = require('rollup-plugin-typescript2');
const dts = require('rollup-plugin-dts').default;

module.exports = (props, pkg) => ([{
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: { compilerOptions: { declaration: false } },
      clean: true,
    }),
    resolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
    commonjs(),
    filesize(),
  ],
  ...props,
},
{
  input: 'src/index.ts',
  output: [{ file: pkg.typings, format: 'es' }],
  plugins: [dts()],
}
]);
