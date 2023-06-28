const chokidar = require('chokidar')

const esbuild = require('esbuild');

async function buildCJS() {
  return esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node12',
    format: 'cjs',
    outfile: 'dist/index.cjs.js',
  });
}


async function buildESM() {
  return esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'neutral',
    format: 'esm',
    outfile: 'dist/index.esm.js',
  });
}


async function buildUMD() {
  return esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'browser',
    format: 'iife',
    globalName: 'MyLib',
    outfile: 'dist/index.umd.js',
  });
}



if (process.argv.includes('--watch')) {
  chokidar.watch('src/**/*.ts').on('change', () => {
    console.log('Rebuilding...')
    buildUMD();
  });
}

if (process.argv.includes('--publish')) {
  const promises = [buildCJS(), buildESM(), buildUMD()];
  Promise.all(promises).then(() => {
    console.log('Build finished')
  });
} else {
  buildUMD();
}
