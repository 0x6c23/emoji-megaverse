import React, {useContext} from 'react';
import {
  render,
  fireEvent,
  screen
} from '@testing-library/react';
import {EmojiButton} from './index.js';
import {
  MegaverseGridContextProvider,
} from '/contexts/MegaverseGridContext/index.js';

const ButtonWithContext = (props) => (
    <MegaverseGridContextProvider>
      <EmojiButton {...props} />
    </MegaverseGridContextProvider>
);

const mockCanonicalClickHandler = {
  onClick: jest.fn(() => null),
};

describe('Emoji Button', () => {
  it('should render the correct emoji image given the string', () => {
    const { getByAltText } = render(
        <ButtonWithContext emojiObject={{emoji: 'COMETH'}} />
    )

    const image = getByAltText('emoji-image');
    expect(image.src).toContain('cometh');
  })

  it('should should trigger an onClick event when the button is clicked', () => {
    render(
        <ButtonWithContext emojiObject={{emoji: 'COMETH'}} clickHandler={mockCanonicalClickHandler.onClick} />
    )
    const button = screen.getByTestId('emoji-button');
    fireEvent.click(button);
    expect(mockCanonicalClickHandler.onClick).toHaveBeenCalledTimes(1);
  })

})
