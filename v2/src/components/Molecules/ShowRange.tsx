import React from "react";
import RangeSlider from "../Atoms/RangeSlider/RangeSlider";

interface ShowRangeProps {
    priceChangeHandler: (values: number[]) => void;
}

const ShowRange: React.FC<ShowRangeProps> = ({ priceChangeHandler }) => {
    return (
        <div className="pt-6" id="filter-section-0">
            <div className="space-y-4">
                <div className="flex items-center">
                    <RangeSlider
                        onAfterChange={(v: number[]) => priceChangeHandler(v)}
                        className="w-64 h-8"
                        min={0}
                        max={3000}
                        defaultValue={[100, 2000]}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShowRange;
