import Image from "next/image";
import moment from "moment";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";

const ReviewList = ({ ratings }: any) => {
    const { star, postedBy } = ratings;
    return (
        <div className="grid grid-cols-10 mb-5">
            <div>
                {postedBy.image && postedBy && postedBy.image.url ? (
                    <Image
                        className="w-10 h-10 rounded-full"
                        src={postedBy.image.url}
                        alt={postedBy.name}
                        width={40}
                        height={40}
                    />
                ) : (
                    <Image
                        className="w-10 h-10 rounded-full"
                        src={"/docs/images/people/profile-picture-5.jpg"}
                        alt={postedBy.name}
                        width={40}
                        height={40}
                    />
                )}
            </div>
            <div className="col-span-6 border-b-2">
                <p className="font-bold text-primary capitalize">
                    {postedBy.name}
                </p>
                <ul className="flex mb-2">
                    {Array.from(Array(5).keys()).map((rating: number) => (
                        <li key={rating}>
                            <BsFillStarFill
                                className={`${
                                    star > rating
                                        ? "text-orange-400"
                                        : "text-gray-200"
                                }
                        h-4 w-4 flex-shrink-0`}
                            />
                        </li>
                    ))}
                    <span className="ml-1 text-blue-400 relative -top-1">
                        {/* {postedBy?.createdAt && moment(postedBy?.createdAt).fromNow()} */}
                    </span>
                </ul>
                <p className="mb-2 font-light text-primary">
                    This is my third Invicta Pro Diver. They are just fantastic
                    value for money. This one arrived yesterday and the first
                    thing I did was set the time, popped on an identical strap
                    from another Invicta and went in the shower with it to test
                    the waterproofing.... No problems.
                </p>
            </div>
        </div>
    );
};

export default ReviewList;
