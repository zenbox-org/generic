import { AbsolutePathSchema } from './AbsolutePath'
import { testSamples } from 'zenbox-util/jest/testSamples'

testSamples(AbsolutePathSchema, [
  '/arst',
  '/arst/arst',
  '/arst/arst%20',
], [
  'arst',
  '/arst asrt',
  'arst/arst',
])
