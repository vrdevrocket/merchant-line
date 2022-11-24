export function useConvertBase64(dataURI: string) {
    const splitDataURI = dataURI.split(",");
    const byteString =
        splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
}

export type Base64 = string;
enum ContentTypeEnum {
    Xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}
interface SaveFileParams {
    data: Base64;
    contentType?: ContentTypeEnum;
    fileName: string;
}

const _base64ToBlob = (b64Data: Base64, contentType: string, sliceSize = 512): Blob => {
    const byteCharacters = atob(b64Data);
    const byteArrays: any = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i += 1) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
};

const saveFile = (
    { data, contentType = ContentTypeEnum.Xlsx, fileName }: SaveFileParams,
    mess: () => void
) => {
    if (typeof URL.createObjectURL === "undefined") {
        throw new Error("Browser is not supported");
    }
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(_base64ToBlob(data, contentType)));
    link.setAttribute("download", fileName);
    link.click();
    mess();
};

export { saveFile };
