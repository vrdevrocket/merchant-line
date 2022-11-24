import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { GlobalStyles } from "@components";
import { theme } from "@utils";
import { store, persistor } from "@redux";
import { ModuleMain } from "@modules";
import "@translations/i18n";

function App() {
    return (
        <Provider store={store}>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
                <PersistGate loading={null} persistor={persistor}>
                    <ModuleMain />
                </PersistGate>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
