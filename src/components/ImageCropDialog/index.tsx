import React, { useCallback, useMemo, useRef, useState } from "react";

import { ReactCrop } from "react-image-crop";

import { Dialog } from "@/enishi-ui/components/feedback/Dialog";
import { DialogActions } from "@/enishi-ui/components/feedback/DialogActions";
import { DialogContent } from "@/enishi-ui/components/feedback/DialogContent";
import { DialogHeader } from "@/enishi-ui/components/feedback/DialogHeader";
import { DialogTitle } from "@/enishi-ui/components/feedback/DialogTitle";
import { Button } from "@/enishi-ui/components/inputs/Button";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

import { getCroppedImage } from "@/components/ImageCropDialog/getCroppedImage";

import type { BaseProps } from "@/types/enishi";
import type { Crop } from "react-image-crop";

type Props = BaseProps<{
    open: boolean;
    onClose: () => void;
    onComplete: (file: Blob) => void;
    imageSource?: Blob | string;
}>;

export const ImageCropDialog: React.FC<Props> = ({ open, onClose, onComplete, imageSource, ...props }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        unit: "px"
    });
    const [imageName, setImageName] = useState<string>("");

    const src = useMemo(() => (imageSource instanceof Blob ? URL.createObjectURL(imageSource) : imageSource), [imageSource]);

    const onImageLoaded = useCallback<React.ReactEventHandler<HTMLImageElement>>((x) => {
        const size = Math.min(x.currentTarget.width, x.currentTarget.height);
        setImageName(x.currentTarget.name);
        setCrop({
            x: 0,
            y: 0,
            width: size,
            height: size,
            unit: "px"
        });
    }, []);
    const onSubmit = useCallback(() => {
        void (async () => {
            if (!imageRef.current) {
                console.error("uploaded image ref does not exists");
                onClose();
                return;
            }
            const croppedImageSource = await getCroppedImage(imageRef.current, crop, imageName);
            onComplete(croppedImageSource);
        })();
    }, [crop, imageName, onComplete, onClose]);

    return (
        <Dialog autoScrollable open={open} {...props}>
            <DialogHeader>
                <DialogTitle data-w-id="image-crop-dialog-title-field">画像の切り取り</DialogTitle>
            </DialogHeader>
            <DialogContent>
                <LinearLayout fullHeight gravity="center">
                    <ReactCrop aspect={1} crop={crop} minHeight={100} minWidth={100} onChange={setCrop}>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img alt="new image" onLoad={onImageLoaded} ref={imageRef} src={src} width="300px" />
                    </ReactCrop>
                </LinearLayout>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    キャンセル
                </Button>
                <Button colorTheme="primary" data-w-id="image-crop-dialog-submit-button" onClick={onSubmit} type="button">
                    作成
                </Button>
            </DialogActions>
        </Dialog>
    );
};
