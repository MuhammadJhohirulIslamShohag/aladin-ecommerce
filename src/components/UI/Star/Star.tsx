import React from "react";
import StarRatings from "react-star-ratings";

type StarType = {
    clickRating: (numberOfStars: number) => void;
    numberOfStars: number;
};
const Star = ({ clickRating, numberOfStars }: StarType) => {
    return (
        <>
            <StarRatings
                starRatedColor="red"
                changeRating={() => clickRating(numberOfStars)}
                numberOfStars={numberOfStars}
                starEmptyColor="red"
                starDimension="20px"
                starSpacing="2px"
            />
            <br />
        </>
    );
};

export default Star;
