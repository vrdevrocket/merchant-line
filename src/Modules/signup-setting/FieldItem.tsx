import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { IconPen, IconTrash, IconDrag } from "@components";
import { IFieldSignUp } from "@interfaces";

interface IProps {
    itemJson: string;
    EditFieldItem: (index: number) => void;
    index: number;
    handleDeleteFieldItem: (index: number) => void;
}

export const ModuleFieldItem = (props: IProps) => {
    //props
    const { itemJson, index, EditFieldItem, handleDeleteFieldItem } = props;
    // hooks
    const { t } = useTranslation();
    // variable
    const item: IFieldSignUp = JSON.parse(itemJson);
    //dnd
    const { attributes, listeners, setNodeRef, transform } = useSortable({
        id: itemJson,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div className="field-item-title">{item.fieldName}</div>
            <div className="field-item-input">
                <Select
                    placeholder={t("page.choose_option")}
                    mode={item.multiple ? "multiple" : undefined}
                >
                    {item.options?.map((item2, index2) => (
                        <Select.Option key={index2} value={item2.tag}>
                            {item2.optionName}
                        </Select.Option>
                    ))}
                </Select>
                <div className="icon " onClick={() => EditFieldItem(index)}>
                    <IconPen size={21} />
                </div>
                <div className="icon" onClick={() => handleDeleteFieldItem(index)}>
                    <IconTrash size={21} />
                </div>
                <div className="icon" {...attributes} {...listeners}>
                    <IconDrag />
                </div>
            </div>
        </div>
    );
};
