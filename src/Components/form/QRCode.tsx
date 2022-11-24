import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Tooltip } from "antd";

import { SharedButtonSub, SharedInput, IconCopy, IConDown, StyledCard } from "../";
import { copyText, downloadImage } from "@utils";

interface IProps {
    qrCodeLink: string;
    isCopy: { status: boolean; value: number };
    reUpdateState: (value: number) => void;
}

export const ComponentQRCode = memo((props: IProps) => {
    //hook
    const { t } = useTranslation();

    //props
    const { qrCodeLink, isCopy, reUpdateState } = props;

    const handleCopyText = useCallback(() => {
        const textCopy = `<img src="${qrCodeLink}" />`;
        copyText(textCopy, () => reUpdateState(2));
    }, [qrCodeLink]);

    const downLoadQR = useCallback(() => {
        downloadImage(qrCodeLink, "QR-code");
    }, [qrCodeLink]);

    return (
        <StyledCard>
            <div className="title">{t("page.qr_code")}</div>
            <div className="ground_qrcode">
                {/* <QRCode id="qrcode" value={qrCode} size={width < 767 ? 100 : 200} /> */}
                <div className="image">
                    <img src={qrCodeLink} />
                </div>
                {/* <a href={qrCodeLink} download target="_blank"> */}
                <StyledDownloadButton
                    type="Gray"
                    size="small"
                    onClick={downLoadQR}
                    text={
                        <>
                            <IConDown style={{ marginRight: "12px" }} />
                            {t("page.download")}
                        </>
                    }
                    htmlType="button"
                />
                {/* </a> */}
            </div>
            <div className="group_link">
                <SharedInput
                    styleParent={{ flex: 1 }}
                    value={`<img src="${qrCodeLink}" />`}
                    disable={true}
                />
                <Tooltip
                    title={
                        isCopy.status && isCopy.value === 2
                            ? t("message.copied")
                            : t("message.copy")
                    }
                >
                    <div className="copy" onClick={handleCopyText}>
                        <IconCopy />
                    </div>
                </Tooltip>
            </div>
            <div className="desc_link">{t("page.desc_qr_code")}</div>
        </StyledCard>
    );
});

const StyledDownloadButton = styled(SharedButtonSub)`
    padding: 6px 12px;
    font-size: 16px;
    margin-left: 16px;
`;
