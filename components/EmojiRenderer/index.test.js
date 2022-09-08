import React from 'react';
import {
  render,
} from '@testing-library/react';
import {EmojiRenderer} from './index.js';

describe('Emoji Renderer - switch component', () => {
  it('should render the correct emoji image given the string', () => {
    const { getByAltText } = render(
        <EmojiRenderer emoji={'COMETH'} />
    )

    const image = getByAltText('emoji-image');
    expect(image.src).toContain('cometh');
  })

})
