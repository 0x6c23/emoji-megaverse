import {getValidJson} from './index';

describe('getValidJson', () => {
  it('should return a valid json object given a valid json string', async () => {
    expect(getValidJson('{"foo":"bar"}')).toMatchObject({foo: 'bar'})
  })
  it('should return false given an invalid json string', async () => {
    expect(getValidJson('{foo:bar}')).toBe(false)
  })
  it('should return false given a falsey value', async () => {
    expect(getValidJson(null)).toBe(false)
  })
  it('should return the same object given a valid json object', async () => {
    const testObject = { foo: "bar" }
    expect(getValidJson(testObject)).toBe(testObject)
  })

})
