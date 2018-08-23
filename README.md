# maqueta-pitazo
maqueta app react-native



## Code Style Guides and Linting

### Style Guides

(Eslint should automatically steer you towards these styles however it is not 100% reliable)
- [Airbnb's non-react javascript code style guide for non-jsx](https://github.com/airbnb/javascript)
- [Airbnb's React/JSX code style for JSX](https://github.com/airbnb/javascript/tree/master/react)
- [Implicit rules set forth by eslint-plugin-react-native]()
- Additionally, grouping of imports (eslint has problems catching this error):

```jsx
// First import react if it is a JSX file.
import React from 'react'

// then include global imports (react or not react related)
import { View } from 'react-native'

// then absolute imports
import MyComponent from '@myApp/myComponent'

// then relative imports
import Baz from '../Baz'
import Foo from './Foo'

// Each group must be alphabetized, groups can be divided into subgroups without breaking the larger group ordering
```

### Linting

`npm run lint`

Runs [Eslint](https://www.eslint.org/) (code correctness, linter, some style guidelines, uses plugins so as to preserve the airbnb style guides pointed out above)


### Fixing

`npm run lint:fix`

Runs Eslint's fixer mode (fixes automatically errors that are fixable by eslint). You should review the changes done by Eslint after it runs.

## Typechecking
`npm run typecheck`
Runs typescript in typecheck mode only. JSDoc comments are necessary for it to correctly infer types.
