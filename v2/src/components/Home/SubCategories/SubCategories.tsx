import { useState, useEffect } from "react";
import AOS from "aos";
import { ISubCategories } from "types/sub-category.type";
import SectionTitle from "../../SectionTitle/SectionTitle";
import SubCategoryCard from "./SubCategory/SubCategoryCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { getAllSubCategories } from "@/api/sub-categories";
import Loader from "@/components/Loader/Loader";

const SubCategories = () => {
    const [subCategoriesData, setSubCategoriesData] = useState<
        ISubCategories[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadingSubCategories();
    }, []);


    const loadingSubCategories = () => {
        setLoading(true)
        getAllSubCategories()
            .then((res) => {
                setSubCategoriesData(res.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    };

    return (
        <section
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="1"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out" className="container py-24 md:py-20 sm:py-12 "
        >
            <SectionTitle title="Product By Sub Category " />
            {loading ? (
                <Loader height={"h-[430px]"} />
            ) : (
                <div className="mt-10 sm:mt-5">
                    <Swiper
                        slidesPerView={1}
                        navigation={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
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
                                {subCategoriesData?.map(
                                    (subCategory: ISubCategories) => (
                                        <SwiperSlide
                                            key={subCategory._id}
                                            style={{ height: "366px" }}
                                        >
                                            <SubCategoryCard
                                                subCategory={subCategory}
                                            />
                                        </SwiperSlide>
                                    )
                                )}
                            </>
                        ) : (
                            <h2 className="text-center text-xl text-primary">
                                There is no sub-category
                            </h2>
                        )}
                    </Swiper>
                </div>
            )}

        </section>
    );
};

export default SubCategories;
