import { useState, useEffect } from "react";
import { ISubCategories } from "types/sub-category.type";
import SectionTitle from "../../SectionTitle/SectionTitle";
import SubCategoryCard from "./SubCategory/SubCategoryCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

const SubCategories = ({
    subCategories,
}: {
    subCategories: ISubCategories[];
}) => {
    const [subCategoriesData, setSubCategoriesData] = useState<
        ISubCategories[]
    >([]);

    useEffect(() => {
        setSubCategoriesData(subCategories);
    }, [subCategories]);

    return (
        <section className="container py-14 sm:py-8">
            <SectionTitle title="Product By Sub Category " />
            <div className="mt-10">
                <Swiper
                    slidesPerView={1}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                    className="sm:h-64 h-[374px] md:h-[288px] sub_categories_swiper"
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
                            {subCategoriesData?.map((subCategory: ISubCategories) => (
                                <SwiperSlide
                                    key={subCategory._id}
                                    style={{ height: "366px" }}
                                >
                                    <SubCategoryCard
                                        subCategory={subCategory}
                                    />
                                </SwiperSlide>
                            ))}
                        </>
                    ) : (
                        <h2 className="text-center text-xl text-primary">
                            There is no sub-category
                        </h2>
                    )}
                </Swiper>
            </div>
        </section>
    );
};

export default SubCategories;
