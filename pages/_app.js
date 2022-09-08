import '../styles/globals.css';
import {Toaster} from 'react-hot-toast';
import {withContexts} from '/contexts/utils/withContexts/index.js';

function App({Component, pageProps}) {
  return (
      <>
        <Toaster
            position="bottom-center"
        />
        <Component { ...pageProps } />
      </>
  );
}

export default withContexts(App);

