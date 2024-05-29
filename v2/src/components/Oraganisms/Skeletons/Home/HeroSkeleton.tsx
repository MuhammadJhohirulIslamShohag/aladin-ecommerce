import LeftHero from "../../../Molecules/Skeletons/Hero/LeftHero";
import RightHero from "../../../Molecules/Skeletons/Hero/RightHero";

const HeroSkeleton = () => {
    return (
        <div className="container">
            <div className="gap-2 grid lg:grid-cols-12 grid-cols-1 ">
                <div className="lg:col-span-8 col-span-12">
                    <LeftHero />
                </div>
                <div className="lg:col-span-4 col-span-12">
                    <RightHero />
                </div>
            </div>
        </div>
    );
};

export default HeroSkeleton;
