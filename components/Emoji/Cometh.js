import {Emoji} from './index.js';

/**
 * Cometh emoji
 * @param {?string} direction=down - direction this emoji should face
 */
const Cometh = ({
  direction = 'down',
}) => {
  const getClassName = () => {
    let classesString = '';

    switch (direction) {
      case 'up': {
        classesString += 'rotate-[120deg] ';
        break;
      }
      case 'left': {
        classesString += 'rotate-[48deg] ';
        break;
      }
      case 'right': {
        classesString += 'rotate-[230deg] ';
        break;
      }
      default: {
        break;
      }
    }
    return classesString;
  };

  return (
      <Emoji classes={ getClassName() } emoji={ 'COMETH' } />
  );
};

export {Cometh};
