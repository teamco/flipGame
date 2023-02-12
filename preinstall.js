const rimraf = require('rimraf').default;
const dir = './src/.umi';

rimraf(dir).then(() => {
  console.log(`Directory: ${dir} deleted successfully`);
});
