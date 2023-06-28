const chokidar = require('chokidar')

const esbuild = require('esbuild');

async function buildCJS(options = {}) {
  const outfile = options.outDir ? `${options.outDir}/index.cjs.js` : 'dist/index.cjs.js';
  return esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node12',
    format: 'cjs',
    outfile
  });
}


async function buildESM(options = {}) {
  const outfile = options.outDir ? `${options.outDir}/index.esm.js` : 'dist/index.esm.js';
  return esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'neutral',
    format: 'esm',
    outfile,
  });
}


async function buildUMD(options = {}) {
  const outfile = options.outDir ? `${options.outDir}/index.umd.js` : 'dist/index.umd.js';
  return esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'browser',
    format: 'iife',
    globalName: 'MyLib',
    outfile
  });
}



if (process.argv.includes('--watch')) {
  chokidar.watch('src/**/*.ts').on('change', () => {
    console.log('Rebuilding...')
    buildUMD();
  });
}

if (process.argv.includes('--publish')) {
  const options = {
    outDir: '.',
  }
  const promises = [buildCJS(options), buildESM(options), buildUMD(options)];
  Promise.all(promises).then(() => {
    console.log('Build finished')
  });
} else {
  buildUMD();
}
