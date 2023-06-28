module.exports = {
  'env': {
    'browser': true, 
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['error', 2, {'SwitchCase': 1, 'MemberExpression': 1,
      ignoredNodes: [
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
      ],}],
    'quotes': ['error', 'single'],
    '@typescript-eslint/camelcase': 0,
    'semi': [2, 'always'],
    "object-curly-spacing": ["error", "always"],
    // 'import/order': [
    //   'error',
    //   {
    //     groups: [
    //       ['builtin', 'external']
    //     ],
    //     'newlines-between': 'always'
    //   }
    // ],
    // 'import/newline-after-import': ['error', {'count': 2}],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'prefix': ['I']
      },
      {
        'selector': 'enum',
        'format': ['PascalCase'],
        'prefix': ['E']
      },
      {
        'selector': 'typeAlias',
        'format': ['PascalCase'],
        'prefix': ['T']
      },
      {
        'selector': 'enumMember',
        'format': ['UPPER_CASE']
      }
    ],
  }
};
