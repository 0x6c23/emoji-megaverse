/* Catches unhandled API errors and returns a JSON object containing some information */
const withErrors = (handler) => {
  return async (req, res) => {
    return handler(req, res).catch((error) => {
      console.error(error);

      /* test case */
      if(req === 'test') {
        return {
          success: false, error: true, message: error.message || error,
        }
      }
      return res.status(500).
                 json({
                   success: false, error: true, message: error.message || error,
                 });
    });
  };
};

export {withErrors};
