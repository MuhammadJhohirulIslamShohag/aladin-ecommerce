import FeaturedSubCategory from "../../Molecules/Home/FeaturedSubCategory";
import SectionTitle from "../../Molecules/SectionTitle";
import featuredCategoryData from "./../../../data/featuredCategoryData";

const FeaturedSubCategories = () => {
    return (
        <div className="container mx-auto px-6">
            <SectionTitle title={"Sub Category"} />

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-2 gap-y-4 mt-8">
                {/* all featured category item in this div */}
                {featuredCategoryData.map((featuredItem) => (
                    <FeaturedSubCategory data={featuredItem} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedSubCategories;
