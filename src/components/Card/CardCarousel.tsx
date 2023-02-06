import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const CardCarousel = ({ images, title }: { images: any; title: string }) => {
    return (
        <Carousel showArrows={false} infiniteLoop showThumbs={false}>
            {images &&
                images.length > 0 &&
                images.map((image: any) => (
                    <Image
                        className="h-full w-full"
                        alt={title}
                        width="0"
                        height="0"
                        src={image.url}
                        key={image.public_id}
                    />
                ))}
        </Carousel>
    );
};

export default CardCarousel;
