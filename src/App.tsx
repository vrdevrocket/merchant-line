import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { GlobalStyles } from "@components";
import { theme } from "@utils";
import { store, persistor } from "@redux";
import { ModuleMain } from "@modules";
import "@translations/i18n";
import { requestFirebaseNotificationPermission } from "./firebaseInit";
import { fireBaseAPI } from "./API/fireBase";

// import "./assets/styled.less";

requestFirebaseNotificationPermission()
    .then((firebaseToken) => {
        // eslint-disable-next-line no-console
        // console.log("firebaseToken", firebaseToken);
        const userInfo = store.getState().auth?.userInfo;

        if (userInfo?._id && typeof firebaseToken === "string") {
            if (userInfo?.notifSetting?.channels?.adminPanel)
                fireBaseAPI.saveToken(userInfo._id, { notiToken: firebaseToken });
            else fireBaseAPI.saveToken(userInfo._id, { notiToken: "" });
        }
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.log("err", err);
    });

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
