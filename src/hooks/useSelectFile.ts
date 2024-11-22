import { useCallback, useState } from "react";

export const useSelectFile = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const selectFiles = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
        const { files } = e.target;
        if (files === null) {
            return;
        }
        setSelectedFiles(Array.from(files));
    }, []);

    return <const>[selectedFiles, { selectFiles }];
};
