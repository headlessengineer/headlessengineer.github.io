import '@testing-library/jest-dom';
import { expect } from 'vitest';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const axeMatchers = require('vitest-axe/matchers');
expect.extend(axeMatchers);
