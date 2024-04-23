/**
 * lodash lose tree-shaking when import the whole lodash package.
 * https://github.com/rollup/rollup/issues/691
 * https://github.com/lodash/babel-plugin-lodash
 */
import debounce from 'lodash/debounce';
export default debounce;
