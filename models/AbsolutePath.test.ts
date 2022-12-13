import { testSamples } from 'libs/utils/jest/testSamples'
import { AbsolutePathSchema } from './AbsolutePath'

testSamples(AbsolutePathSchema, [
  '/arst',
  '/arst/arst',
  '/arst/arst%20',
], [
  'arst',
  '/arst asrt',
  'arst/arst',
])
