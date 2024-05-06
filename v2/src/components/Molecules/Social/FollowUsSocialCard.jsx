import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import SocialMediaImage from "../../../assets/Image/social/1.jpg";

const FollowUsSocialCard = ({ handleImageClick, social, name, idx }) => {
    return (
        <div className="relative overflow-hidden border border-white/50 group cursor-pointer">
            <div className="before:absolute before:inset-0 before:bg-green-400 before:opacity-0 before:z-50 before:transition-all before:duration-700 group-hover:before:opacity-80"></div>
            <div
                onClick={() => handleImageClick(social, idx + 1)}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 group-hover:bottom-1/2 transition-all duration-700 text-white z-50"
            >
                <FaSearch className="text-white text-4xl" />
            </div>
            <Link to="/" className="block">
                <img
                    src={SocialMediaImage}
                    alt={name}
                    className="transition-transform duration-500 group-hover:scale-125"
                />
            </Link>
        </div>
    );
};

export default FollowUsSocialCard;
