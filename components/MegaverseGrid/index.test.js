import React, {useContext} from 'react';
import {
  render,
  fireEvent,
  within,
  screen, getAllByRole,
} from '@testing-library/react';

import {MegaverseGrid} from './index.js';

import {
  MegaverseGridContextProvider,
} from '/contexts/MegaverseGridContext/index.js';

const GridWithContext = (props) => (
    <MegaverseGridContextProvider>
      <MegaverseGrid {...props} />
    </MegaverseGridContextProvider>
);

describe('MegaverseGrid', () => {
  it('should render a table with 11 rows', () => {
    render(
        <GridWithContext emojiObject={{emoji: 'COMETH'}} />
    )
    const table = screen.getAllByRole('table');
    expect(table).toHaveLength(1)
    expect(screen.getAllByRole('row')).toHaveLength(11)
  })
})
