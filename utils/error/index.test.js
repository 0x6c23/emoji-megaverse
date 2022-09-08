import {throwIfNotSuccessful} from './index';

describe('throwIfNotSuccessful', () => {
  it('should throw an error with the provided message if res is undefined', async () => {
    try {
      await throwIfNotSuccessful(undefined, 'UNKNOWN ERROR')
    } catch(e) {
      expect(e.message).toBe("UNKNOWN ERROR")
    }
  })

  it('should throw an error with the provided message if res has no property \'ok\' ', async () => {
    try {
      await throwIfNotSuccessful({}, 'UNKNOWN ERROR')
    } catch(e) {
      expect(e.message).toBe("UNKNOWN ERROR")
    }
  })

  it('should throw an error with the provided message if res.ok === false ', async () => {
    try {
      await throwIfNotSuccessful({ ok: false }, 'UNKNOWN ERROR')
    } catch(e) {
      expect(e.message).toBe("UNKNOWN ERROR")
    }
  })

})
