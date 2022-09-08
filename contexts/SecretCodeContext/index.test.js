import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import {SecretCodeContext, SecretCodeContextProvider} from './index.js';

const Component = () => {
  const {getIsActive} = useContext(SecretCodeContext);
  return (
      <>
        <span>Secret active: {getIsActive() ? "true" : "false"}</span>
      </>
  )
}
const ComponentWithContext = () => (
    <SecretCodeContextProvider>
      <Component />
    </SecretCodeContextProvider>
);

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn().mockImplementation(original.useContext),
  };
});

describe('SecretCodeContext', () => {
  it('provides context to child components', () => {
    const {
      getByText
    } = render(
        <ComponentWithContext />
    )

    expect(React.useContext).toHaveBeenCalledTimes(1);
    expect(React.useContext).toHaveReturnedWith({
      getIsActive: expect.any(Function),
      setIsActive: expect.any(Function),
    });

    expect(getByText("Secret active: false")).toBeTruthy()
  })
})
