import type { Writable } from "@/types/utils";
import type { Crop } from "react-image-crop";

export const getCroppedImage = async (sourceImage: HTMLImageElement, cropConfig: Crop, fileName: string): Promise<Blob> => {
    // Creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(
        sourceImage,
        cropConfig.x * scaleX,
        cropConfig.y * scaleY,
        cropConfig.width * scaleX,
        cropConfig.height * scaleY,
        0,
        0,
        cropConfig.width,
        cropConfig.height
    );

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            // Returning an error
            if (!blob) {
                reject(new Error("Canvas is empty"));
                return;
            }

            (<Writable<File>>(<unknown>blob)).name = fileName;
            resolve(blob);
        }, "image/jpeg");
    });
};
