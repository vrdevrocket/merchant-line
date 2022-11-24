import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MinutesFilled } from "../icon";

interface IProps {
    item: string;
    showImage: (url: string) => void;
    removeImage: (url: string) => void;
}

export const SortableItem = (props: IProps) => {
    const { item, showImage, removeImage } = props;
    const { setNodeRef, transform } = useSortable({
        id: item,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div className="img-wrap" ref={setNodeRef} style={style} onClick={() => showImage(item)}>
            <span
                style={{ position: "absolute", right: "-8px", top: "-11px", zIndex: 10 }}
                onClick={() => removeImage(item)}
            >
                <MinutesFilled />
            </span>
            <img src={item} />
        </div>
    );
};
