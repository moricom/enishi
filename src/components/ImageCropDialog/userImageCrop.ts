import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

export const useImageCrop = ({
    type,
    imageInput,
    setImageInput,
    setResult
}: {
    type: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageInput: any;
    setImageInput: Dispatch<SetStateAction<unknown>>;
    setResult: Dispatch<SetStateAction<unknown>>;
}) => {
    const [crop, setCrop] = useState<{
        x: number | null;
        y: number | null;
        aspect: number;
        width: number;
        height: number;
    }>({
        x: null,
        y: null,
        aspect: 1 / 1,
        width: 300,
        height: 300
    });
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (image) {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const ctx = canvas.getContext("2d")!;

            ctx.drawImage(
                image,
                crop.x ? crop.x * scaleX : 0,
                crop.y ? crop.y * scaleY : 0,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL("image/jpeg");
            const [, base64] = base64Image.split(",");

            setResult(base64Image);
            setImageInput({ ...imageInput, type, base64 });
        }
    }, [crop, image, imageInput, setImageInput, setResult, type]);

    return [crop, setCrop, setImage];
};
