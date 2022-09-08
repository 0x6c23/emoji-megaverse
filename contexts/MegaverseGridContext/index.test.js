import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import {MegaverseGridContext, MegaverseGridContextProvider} from './index.js';

const Component = () => {
  const {getEditorActive, getGridSize, getActiveEmojiBrush} = useContext(MegaverseGridContext);
  return (
      <>
        <span>Editor active: {getEditorActive() ? "true" : "false"}</span>
        <span>Rows: {getGridSize().rows}</span>
        <span>Cols: {getGridSize().cols}</span>
        <span>ActiveEmojiBrush: {getActiveEmojiBrush()}</span>
      </>
  )
}
const ComponentWithContext = () => (
    <MegaverseGridContextProvider>
      <Component />
    </MegaverseGridContextProvider>
);

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn().mockImplementation(original.useContext),
  };
});

describe('MegaverseGridContext', () => {
  it('provides context to child components', () => {
    const {
      getByText
    } = render(
        <ComponentWithContext />
    )

    expect(React.useContext).toHaveBeenCalledTimes(1);
    expect(React.useContext).toHaveReturnedWith({
      getActiveBrushOptions: expect.any(Function),
      getActiveEmojiBrush: expect.any(Function),
      getEditorActive: expect.any(Function),
      getEmojiAtPos: expect.any(Function),
      getEmojiMap: expect.any(Function),
      getGridSize: expect.any(Function),
      resetEmojiGrid: expect.any(Function),
      setActiveBrushOptions: expect.any(Function),
      setActiveEmojiBrush: expect.any(Function),
      setEditorActive: expect.any(Function),
      setEmojiAtPos: expect.any(Function),
      setEmojiMap: expect.any(Function),
      setGridSize: expect.any(Function),
    });

    expect(getByText("Editor active: false")).toBeTruthy()
    expect(getByText("Rows: 11")).toBeTruthy()
    expect(getByText("Cols: 11")).toBeTruthy()
    expect(getByText("ActiveEmojiBrush: COMETH")).toBeTruthy()
  })
})
