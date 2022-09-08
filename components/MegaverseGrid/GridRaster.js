import React from 'react';
import {GridRasterField} from './GridRasterField.js';

/**
 * Use rows and cols to draw a grid of GridRasterField
 * @param {number} rows - number of grid rows
 * @param {number} cols - number of grid cols
 * @param {function(number, number): undefined} changeEmoji - click handler function to change emoji at x,y
 */
const GridRaster = ({
  rows,
  cols,
  changeEmoji,
}) => {
  return (
      <table>
        <tbody>
        { Array.from({length: rows}, (_, x) => (
            <tr
                key={ `row-${ x }` } className={ 'select-none' }>
              { Array.from({length: cols}, (_, y) => (
                  <td key={ `field-${ x }-${ y }` }>
                    <GridRasterField
                        x={ x } y={ y }
                        clickHandler={ () => changeEmoji(x, y) } />
                  </td>
              )) }
            </tr>
        )) }
        </tbody>
      </table>
  );
};

export {GridRaster};
