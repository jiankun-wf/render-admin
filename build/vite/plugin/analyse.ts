import visualizer from 'rollup-plugin-visualizer';

export function configVisualizerConfig() {
  const isReport = process.env.REPORT;
  if (isReport) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin;
  }
  return [];
}
