import { store } from '../redux/store'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps }) {
  return   <SessionProvider session={pageProps.session}>
  <Provider store={store}>
    <ToastContainer />
  <Component {...pageProps} />
  </Provider>
  </SessionProvider>
}
