// eslint-disable-next-line no-undef
module.exports = {
  'transform': {
    '^.+\\.ts$': 'ts-jest'
  },
  'testRegex': 'spec.(t|j)s$',
  'coverageDirectory': './coverage/',
  'coverageReporters': ['json-summary', 'text', 'lcov'],
};
