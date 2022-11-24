import { ChromePicker } from "react-color";
import { useCallback, useState } from "react";
import { convertHexToRGB } from "@utils";
interface IProps {
    color: string;
    onClick?: (color?: string) => void;
    className?: string;
}

export const ComponentColorPicker = (props: IProps) => {
    const { color, onClick, className } = props;
    const { r, g, b } = convertHexToRGB(color);
    const [initColor, setColor] = useState<{
        hex: string;
        hsl: { a: string; h: string; l: string; s: string };
        rgb: { r: string; g: string; b: string; a: string };
    }>({
        hex: color,
        hsl: { a: "", h: "", l: "", s: "" },
        rgb: { r: `${r}`, g: `${g}`, b: `${b}`, a: "" },
    }); // need to add rgb and hex bc of alpha bar work well.
    const handlePicker = useCallback((color) => {
        setColor(color);
    }, []);
    const handleCompleteFun = useCallback((color) => {
        setColor(color);
        if (onClick) {
            onClick(color.hex);
        }
    }, []);
    return (
        <div className={className}>
            <ChromePicker
                onChange={handlePicker}
                onChangeComplete={handleCompleteFun}
                color={initColor.rgb}
            />
        </div>
    );
};
