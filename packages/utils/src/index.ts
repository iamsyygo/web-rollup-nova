/**
 * lodash lose tree-shaking when import the whole lodash package.
 * https://github.com/rollup/rollup/issues/691
 * https://github.com/lodash/babel-plugin-lodash
 */

import debounce from 'lodash/debounce'

// import { debounce } from 'lodash-es'

// import _ from 'lodash-es'

export interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

export default debounce
