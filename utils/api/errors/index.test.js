import {withErrors} from './index';

const throwingHandler = async () => {
  throw "An error occurred"
}

describe('withErrors HOC', () => {
  it('should return an object instead of throwing an unhandled error', async () => {
      const wrapped = withErrors(throwingHandler)
     expect(await wrapped('test')).toMatchObject({ error: true, success: false, message: "An error occurred"})
  })
})
