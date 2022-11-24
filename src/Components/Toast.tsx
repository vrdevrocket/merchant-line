import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { closeToast, selectToast, useAppSelector } from "@redux";

export const ComponentToast = () => {
    //page hooks
    const toast = useAppSelector(selectToast).toast;
    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(closeToast());
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: toast.vertical || "top",
                    horizontal: toast.horizontal || "right",
                }}
                open={toast.open}
                autoHideDuration={toast.autoHideDuration}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={toast.type} variant={toast.variant}>
                    {toast.message}
                </Alert>
            </Snackbar>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                limit={1}
            />
        </>
    );
};
