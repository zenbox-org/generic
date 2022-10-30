import { ContactSchema } from './Contact'
import { testSamples } from 'zenbox-util/jest/testSamples'

testSamples(ContactSchema, [
  'https://www.instagram.com/example/',
  'skype://example',
  'tel://+17406399740',
  'mailto:example@example.com',
], [
  'example',
])
