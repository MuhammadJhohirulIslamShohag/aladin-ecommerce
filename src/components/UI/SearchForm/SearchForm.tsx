import React from "react";
import { FaSearch } from "react-icons/fa";
type SearchFormPropType = {
    className: string;
    placeholder: string;
};
const SearchForm = ({ className, placeholder }: SearchFormPropType) => {
    return (
        <form className={`items-center ${className} sm:w-11/12 relative`}>
            <input
                type="text"
                name="search"
                className="bg-primary border-primary text-white text-sm rounded-lg  focus:border-primary block w-full pl-6 p-3 placeholder:text-white sm:placeholder:text-[9px]"
                placeholder={placeholder}
                required
            />
            <button
                type="submit"
                className="inline-flex absolute top-0 right-0 items-center py-3 px-3 ml-2 text-sm font-medium text-white bg-primary rounded-lg border-2 border-primary focus:outline-none"
            >
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchForm;
