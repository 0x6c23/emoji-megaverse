/**
 * If response not okay (status !== 200), try to parse an error message
 * from the response body - if present, throw new Error including this message,
 * otherwise throw with default error message
 * @param res
 * @param defaultErrorMessage
 */
const throwIfNotSuccessful = async (res, defaultErrorMessage) => {
  if(!res?.ok) {
    let message;
    try {
      const json = await res.json();
      if(json?.error && json?.message) {
        message = json.message;
        console.error(message);
      }
    } catch {
      message = defaultErrorMessage;
    }
    throw new Error(message)
  }
}

export {throwIfNotSuccessful}
