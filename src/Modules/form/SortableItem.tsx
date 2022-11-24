import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "antd";

interface IProps {
    item: string;
    showImage: (url: string) => void;
    removeImage: (url: string) => void;
}

export const SortableItem = (props: IProps) => {
    const { item, showImage, removeImage } = props;
    const { attributes, listeners, setNodeRef, transform } = useSortable({
        id: item,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div className="img-wrap" ref={setNodeRef} style={style}>
            <div className="img-layer">
                <Icon
                    style={{ color: "white", fontSize: 20 }}
                    className="icon icon-full-screen"
                    type="fullscreen"
                    onClick={() => showImage(item)}
                />
                <Icon
                    style={{ color: "white", fontSize: 20 }}
                    className="icon icon-delete"
                    type="delete"
                    theme="filled"
                    onClick={() => removeImage(item)}
                />
                <div className="drag-field" {...attributes} {...listeners}></div>
            </div>
            <img src={item} />
        </div>
    );
};
