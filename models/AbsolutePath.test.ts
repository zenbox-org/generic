import { AbsolutePathSchema } from './AbsolutePath'
import { testSamples } from 'libs/utils/jest/testSamples'

testSamples(AbsolutePathSchema, [
  '/arst',
  '/arst/arst',
  '/arst/arst%20',
], [
  'arst',
  '/arst asrt',
  'arst/arst',
])
