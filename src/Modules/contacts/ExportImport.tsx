import { useTranslation } from "react-i18next";
import { ChangeEvent, useRef, useState } from "react";
import { Avatar } from "antd";

import {
    ComponentDrawer,
    IconExport,
    IconImport,
    SharedButtonDefault,
    ComponentInfoBox,
} from "@components";
import { contactAPI } from "@api";
import { saveFile, showErrorMessage, useNotify } from "@utils";
import { enumDrawerPlacement, enumPlacement, enumTypeFetchList } from "@configs";
import { selectApp, useAppSelector } from "@redux";

interface IProps {
    visible: boolean;
    handleClose: () => void;
    callbackGetList: (type: enumTypeFetchList) => void;
}

enum enumImportStep {
    STEP_ONE = 1,
    STEP_TWO = 2,
}

export const ModuleExportImport = (props: IProps) => {
    //hooks
    const { visible, handleClose, callbackGetList } = props;
    const { success, error } = useNotify();
    const inputFile = useRef(null);
    //page hook
    const { t } = useTranslation();
    const app = useAppSelector(selectApp);
    // page states
    const [step, setStep] = useState<enumImportStep>(enumImportStep.STEP_ONE);

    // variables
    const srcImgTemplate = "/file_template.jpg";

    const closeForm = () => {
        setStep(enumImportStep.STEP_ONE);
        handleClose();
    };

    const switchImportStep = (step: enumImportStep) => {
        setStep(step);
    };

    const downloadTemplate = async () => {
        try {
            const fileName = t("page.import_file_template") + ".xlsx";
            const res = await contactAPI.downloadTemplate();
            saveFile({ data: res.data, fileName: fileName }, () =>
                success(t("message.download_file_success"))
            );
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
        }
    };

    const clickFile = () => {
        //@ts-ignore
        inputFile.current.click();
    };

    const importFile = async (e: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        if (e?.currentTarget?.files[0] && e.currentTarget.files[0].size <= 10000000) {
            try {
                const file = e.currentTarget.files[0];
                const formData = new FormData();
                //@ts-ignore
                formData.append("file", file);
                await contactAPI.importContact(formData);
                callbackGetList(enumTypeFetchList.duplicate);
                success(t("message.import_successfully"));
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.error"));
            }
        } else error("*" + t("validation.file_max_size_10"));
    };

    const exportFile = async () => {
        try {
            const fileName = t("page.file_list_contact") + ".xlsx";
            const res = await contactAPI.exportContact();
            saveFile({ data: res.data, fileName: fileName }, () =>
                success(t("message.export_list_contact_success"))
            );
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
        }
    };

    const openImg = () => {
        window.open(srcImgTemplate);
    };

    return (
        <ComponentDrawer
            title={
                <span>
                    {t("page.import_export")}
                    <ComponentInfoBox
                        videoUrl={"abc"}
                        title={t("page.box_info.import_title")}
                        body={[
                            t("page.box_info.import_body_1"),
                            t("page.box_info.import_body_2"),
                            t("page.box_info.import_body_3"),
                        ]}
                        footerTitle={t("page.box_info.import_footer")}
                        footer={t("page.box_info.import_footer_body")}
                        placement={enumPlacement.BOTTOM}
                    />
                </span>
            }
            visible={visible}
            handleClose={closeForm}
            handleSubmit={closeForm}
            placement={app.mobile ? enumDrawerPlacement.BOTTOM : enumDrawerPlacement.RIGHT}
            customButton={
                step === enumImportStep.STEP_TWO ? (
                    <SharedButtonDefault
                        style={{
                            color: "black",
                            width: 110,
                            background: "white",
                            borderColor: "black",
                            fontSize: 16,
                            padding: 14,
                            fontWeight: 600,
                            height: 49,
                        }}
                        text={t("page.back")}
                        type="default"
                        size="default"
                        onClick={() => switchImportStep(enumImportStep.STEP_ONE)}
                        className="default-btn"
                    />
                ) : undefined
            }
        >
            {step === enumImportStep.STEP_ONE ? (
                <div className="page-import-export">
                    <div
                        className={"field-import"}
                        onClick={() => switchImportStep(enumImportStep.STEP_TWO)}
                    >
                        <IconImport />
                        <div className="title">{t("page.csv_excel_import")}</div>
                        <div className="text">{t("page.export_a_csv_file_or_excel")}</div>
                    </div>
                    <div className="field-export" onClick={exportFile}>
                        <IconExport />
                        <div className="title">{t("page.export_customer_list")}</div>
                        <div className="text">{t("page.export_as_csv_file_or_excel")}</div>
                    </div>
                </div>
            ) : (
                <div className="page-import-step-2">
                    <SharedButtonDefault
                        text={t("page.download_file_template")}
                        type="default"
                        size="default"
                        className="btn-download-template"
                        onClick={downloadTemplate}
                    />
                    <div style={{ cursor: "pointer" }} onClick={openImg}>
                        <Avatar
                            src={srcImgTemplate}
                            style={{ width: "100%", height: "auto" }}
                            shape="square"
                        />
                    </div>
                    <SharedButtonDefault
                        text={t("page.import_file")}
                        type="default"
                        size="default"
                        className="btn-import-file"
                        onClick={clickFile}
                    />
                    <input
                        ref={inputFile}
                        style={{ display: "none" }}
                        onChange={importFile}
                        className="input-import"
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls, .csv"
                    />
                </div>
            )}
        </ComponentDrawer>
    );
};
