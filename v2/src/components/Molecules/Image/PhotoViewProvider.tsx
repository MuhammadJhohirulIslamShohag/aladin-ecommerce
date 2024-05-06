import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface PhotoViewProviderProps {
    imageURL: string;
    name: string;
}

const PhotoViewProvider: React.FC<PhotoViewProviderProps> = ({
    imageURL,
    name,
}) => {
    return (
        <PhotoProvider>
            <PhotoView src={imageURL}>
                <Image src={imageURL} alt={name} width={100} height={100} />
            </PhotoView>
        </PhotoProvider>
    );
};

export default PhotoViewProvider;
