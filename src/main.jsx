import React from 'react'
import ReactDOM from 'react-dom/client'
import RouteFile from './Routes'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto Mono','Nunito Sans'],
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <RouteFile />
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>
)
