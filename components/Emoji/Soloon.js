import {Emoji} from './index.js';

/**
 * Soloon emoji
 * @param {?string} color=white - color of this emoji
 */
const Soloon = ({
  color = 'white',
}) => {
  const getStyles = () => {
    const styleObj = {};

    switch (color) {
      case 'red': {
        styleObj.filter = 'grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)';
        break;
      }
      case 'blue': {
        styleObj.filter = 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(177deg) saturate(600%) contrast(0.7)';
        break;
      }
      case 'purple': {
        styleObj.filter = 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(232deg) saturate(600%) contrast(0.7)';
        break;
      }
      case 'white':
      default: {
        styleObj.filter = 'grayscale(100%) brightness(100%) sepia(0%) hue-rotate(0deg) saturate(600%) contrast(1.05)';
        break;
      }
    }
    return styleObj;
  };

  return (
      <Emoji style={ getStyles() } emoji={ 'SOLOON' } />
  );
};

export {Soloon};
