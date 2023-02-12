import { useRef,useState, useEffect } from "react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { ISubCategories } from "types/sub-category.type";
import NavigationSliderButton from "../../NavigationSliderButton/NavigationSliderButton";
import SectionTitle from "../../SectionTitle/SectionTitle";
import SubCategoryCard from "./SubCategory/SubCategoryCard";


const SubCategories = ({ subCategories }: {subCategories: ISubCategories[]}) => {
    const [subCategoriesData, setSubCategoriesData] = useState<ISubCategories[]>([])
    const swiperRef: any = useRef();

    useEffect(()=> {
        setSubCategoriesData(subCategories);
    }, [subCategories]);

    return (
        <section className="container py-14 sm:py-8">
            <SectionTitle title="Product By Sub Category " />

            <NavigationSliderButton swiperRef={swiperRef} isMobile={false} />

            <>
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className="sm:h-56"
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {subCategoriesData?.length > 0 ? (
                        <>
                            {subCategoriesData?.map((subCategory: any) => (
                                <SwiperSlide
                                    key={subCategory._id}
                                    style={{ height: "366px" }}
                                >
                                    <SubCategoryCard subCategory={subCategory} />
                                </SwiperSlide>
                            ))}
                        </>
                    ) : (
                        <h2 className="text-center text-xl text-primary">
                            There is no category
                        </h2>
                    )}
                </Swiper>
            </>

            <NavigationSliderButton swiperRef={swiperRef} isMobile={true} />
        </section>
    );
};

export default SubCategories;
