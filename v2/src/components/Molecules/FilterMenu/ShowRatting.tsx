import React from "react";
import Star from "../../Atoms/Star/Star";

interface ShowRattingProps {
    clickRating: (num: number) => void;
}

const ShowRatting: React.FC<ShowRattingProps> = ({ clickRating }) => {
    return (
        <div className="pl-4 pr-4">
            <Star numberOfStars={5} clickRating={clickRating} />
            <Star numberOfStars={4} clickRating={clickRating} />
            <Star numberOfStars={3} clickRating={clickRating} />
            <Star numberOfStars={2} clickRating={clickRating} />
            <Star numberOfStars={1} clickRating={clickRating} />
        </div>
    );
};

export default ShowRatting;
