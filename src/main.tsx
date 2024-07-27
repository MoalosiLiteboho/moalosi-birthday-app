import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from "@nextui-org/react";
import {Toaster} from "sonner";
import Home from "@/pages/home.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NextUIProvider>
            <Home />
            <Toaster
                richColors
                position='bottom-center'
                visibleToasts={2}
                theme='light'
            />
        </NextUIProvider>
    </React.StrictMode>,
);
