/* wait ms milliseconds */
const timer = ms => new Promise(resolve => setTimeout(resolve, ms));

export {timer};
