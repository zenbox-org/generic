import { testSamples } from 'libs/utils/jest/testSamples'
import { ContactSchema } from './Contact'

testSamples(ContactSchema, [
  'https://www.instagram.com/example/',
  'skype://example',
  'tel://+17406399740',
  'mailto:example@example.com',
], [
  'example',
])
