import React from 'react';
import {
  render,
} from '@testing-library/react';

import {Emoji} from './Emoji.js';
import {Cometh} from './Cometh.js';
import {Polyanet} from './Polyanet.js';

describe('Emoji component', () => {
  it('should render an image component', () => {
    const { container } = render(
        <Emoji />
    )

    const imgTags = container.querySelectorAll('img');
    expect(imgTags.length).toBe(1);
  })

  it('applies the src attribute correctly', async () => {
    const { getByAltText } = await render(<Polyanet />);
    const image = getByAltText('emoji-image');
    expect(image.src).toContain('polyanet');
  });

  it('applies options correctly', async () => {
    const { container } = await render(<Cometh direction={'up'} />);
    expect(container.children[0].className).toContain('rotate-[120deg]')
  });
})
