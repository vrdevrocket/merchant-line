import styled from "styled-components";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Upload, Button, Row, Col, Modal } from "antd";
import { Skeleton } from "@mui/material";
import { UploadChangeParam } from "antd/lib/upload/interface";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    //@ts-ignore
} from "@dnd-kit/sortable";

import { merchantAPI } from "@api";

import { showErrorMessage, useNotify } from "@utils";
import { SortableItem } from "@modules";
import { PlaceholderPicture } from "@components";

interface IProps {
    images: Array<string>;
    handleGetImage: (images: Array<string>) => void;
    title?: string;
}

export const ModuleAttachImageUpload = memo((props: IProps) => {
    const { Dragger } = Upload;
    //page hook
    const { t } = useTranslation();
    const { error } = useNotify();
    // props
    const { handleGetImage, images, title } = props;

    // page state
    const [isVisible, setIsVisible] = useState(false);
    const [urlImg, setUrlImg] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChangeImage = async (e: UploadChangeParam) => {
        setIsLoading(true);
        const values = e.file;
        const formData = new FormData();
        //@ts-ignore
        formData.append("file", values);
        try {
            const res = await merchantAPI.uploadImage(formData);
            handleGetImage([...images, res.data.publicUrl]);
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
        } finally {
            setIsLoading(false);
        }
    };

    const showImage = (url: string) => {
        setUrlImg(url);
        setIsVisible(true);
    };

    const removeImage = (url: string) => {
        const index = images.findIndex((item) => item === url);
        images.splice(index, 1);
        handleGetImage([...images]);
    };

    // dnd
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const swapItem = (items: string[]) => {
                const oldIndex = items.findIndex((item) => item === active.id);
                const newIndex = items.findIndex((item) => item === over.id);
                return arrayMove(items, oldIndex, newIndex);
            };
            handleGetImage(swapItem(images));
        }
    };

    return (
        <>
            <div className="image-upload-title">
                <h4>{title || t("page.member_points.attach_images")} </h4>
                <p>{t("page.member_points.attach_images_desc")}</p>
            </div>

            <StyledContainer>
                <Modal
                    className="image-show-preview"
                    centered={true}
                    closable={false}
                    onCancel={() => setIsVisible(false)}
                    visible={isVisible}
                    cancelButtonDisabled={true}
                    footer={null}
                >
                    <img src={urlImg} alt="" />
                </Modal>
                <Dragger
                    className="upload-antd"
                    name="file"
                    multiple={false}
                    onChange={(e) => handleChangeImage(e)}
                    beforeUpload={() => false}
                    accept="image/png, image/jpeg"
                >
                    <StyledUploadButton className="btn-drag" type="default">
                        <PlaceholderPicture />
                        <p className="placeholder-text">{t("page.member_points.add_images")}</p>
                    </StyledUploadButton>
                </Dragger>
                {images.length > 0 && (
                    <Row type="flex" className="preview-field" gutter={12}>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={images.map((item) => item)}
                                strategy={rectSortingStrategy}
                            >
                                {images.map((item, index) => (
                                    <StyledCol key={index} md={6} sm={12}>
                                        <SortableItem
                                            item={item}
                                            showImage={showImage}
                                            removeImage={removeImage}
                                        />
                                    </StyledCol>
                                ))}
                                {isLoading && (
                                    <StyledCol md={6} sm={12}>
                                        <Skeleton
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 12,
                                            }}
                                            animation="wave"
                                            variant="rectangular"
                                        />
                                    </StyledCol>
                                )}
                            </SortableContext>
                        </DndContext>
                    </Row>
                )}
            </StyledContainer>
        </>
    );
});

const StyledContainer = styled.div`
    overflow: hidden;
    padding: 10px 0;
    position: relative;
    .ant-upload .ant-upload-btn {
        padding: 40px;
        background-color: #f7f7f8;
        p {
            font-size: 12px;
            text-align: center;
            color: #6c7084;
        }
    }
    .ant-upload-list-text {
        display: none;
    }
    .ant-upload.ant-upload-drag {
        border: 0;
    }
    .ant-upload {
        width: 100%;
        height: 184px;
        .ant-upload-drag-container {
            width: 100%;
            height: 100%;
            display: flex;
        }
    }
    .btn-drag {
        &:hover {
            color: white !important;
            background: #6c7084;
        }
    }
    .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
        border-color: #6c7084;
    }
    .ant-radio-wrapper {
        display: flex;
        align-items: center;
        height: 48px;
    }
    .preview-field {
        /* position: relative; */

        flex-flow: row;
        position: absolute;
        z-index: 90;
        top: 52px;
        left: 20px;
        .ant-col {
            padding: 0 !important;
            margin-right: 16px;
            width: 100px;
            height: 100px;
        }
        .ant-row-flex {
        }
        .img-wrap {
            /* overflow: hidden; */
            position: relative;
            cursor: pointer;
            height: 100%;
            border-radius: 10px;
            :hover {
                background-color: rgba(68, 61, 65, 0.45);
            }
            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
                object-position: center;
                border-radius: 10px;
            }
            .img-layer {
                position: absolute;
                z-index: 1;
                background-color: transparent;
                width: 100%;
                height: 100%;
                :hover {
                    background-color: rgba(68, 61, 65, 0.45);
                }
                :hover .icon {
                    display: block;
                    z-index: 100;
                }
                .icon {
                    display: none;
                }
                .icon-full-screen {
                    position: absolute;
                    left: 10px;
                    top: 10px;
                }
                .icon-delete {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                }
            }
        }
        .button-upload-preview {
            overflow: hidden;
            position: absolute;
            right: 20px;
            bottom: 14px;
            border: none;
            cursor: pointer;
            button {
                border: none;
                font-size: 14px;
                font-weight: 600;
                background-color: transparent !important;
                :hover,
                :active,
                :focus {
                    color: rgba(0, 0, 0, 0.65);
                }
            }
            input {
                position: absolute;
                z-index: 1;
                opacity: 0;
                cursor: pointer;
            }
        }
    }
    .ant-upload .ant-upload-btn {
        padding: 0;
        background-color: #fff;
        p {
            font-size: 12px;
            text-align: center;
            color: #6c7084;
        }
    }
    .btn-drag {
        &:hover {
            color: #6c7084 !important;
            background: #ffffff;
        }
    }
    .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
        border-color: #ffffff;
    }
    .drag-field {
        height: 100%;
    }
`;

const StyledUploadButton = styled(Button)`
    background: transparent;
    font-size: 30px;
    color: #6c7084;
    padding: 6px 16px;
    border-radius: 6px;
    border: 0.5px dashed #6c7084;
    margin: 0;
    height: 100%;
    width: 100%;
`;

const StyledCol = styled(Col)`
    width: 100%;
`;
