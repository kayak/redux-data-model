import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import dts from "rollup-plugin-dts";

export default (props, pkg) => ([{
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
    resolve(),
    commonjs(),
    typescript({
      typescript: require('typescript'), tsconfigOverride: { compilerOptions: { declaration: false } },
    }),
    filesize(),
  ],
  ...props,
},
{
  input: "src/index.ts",
  output: [{ file: pkg.typings, format: "es" }],
  plugins: [dts()],
}
]);
