
import {drawDiagonalCross} from './index';

const arrResponse = [
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ],
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ],
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ],
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ],
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ],
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ],
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ],
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ],
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'POLYANET' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ],
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ],
  [
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' },
    { emoji: 'SPACE' }
  ]
]

/* can not test other functions since API is down after finishing the challenge */
describe('drawDiagonalCross', () => {
  it('should return a 2d array', async () => {
    expect.assertions(2);
    await expect(drawDiagonalCross()).resolves.toEqual([])
    await expect(drawDiagonalCross(11, 11)).resolves.toEqual(arrResponse)
  })
})
