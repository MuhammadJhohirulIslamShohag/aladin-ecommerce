"use client";

import React from "react";
import Link from "next/link";

import { BsCalendarDate } from "react-icons/bs";
import { BiUserPlus } from "react-icons/bi";

import { IBlog } from "@/types/blog.types";

const Blog = ({ blog }: { blog: IBlog }) => {
    return (
        <div className="md:min-h-[513px] min-h-[465px] bg-base-100 shadow-lg md:mt-7 mt-4 mx-2">
            <figure className="lg:h-[250px]  md:h-[190px] h-[150px]">
                <picture>
                    <img
                        className="h-full w-full"
                        src={blog.image}
                        alt={blog.title}
                    />
                </picture>
            </figure>
            <div className="md:p-5 p-4 relative h-[233px]">
                <div>
                    <h2 className="font-medium text-base text-gray-800">
                        {blog?.title}
                    </h2>
                </div>
                <div className="flex lg:flex-row  flex-col py-2">
                    <div className="flex items-center text-success text-sm">
                        <BsCalendarDate />
                        <span className="ml-1">
                            {new Date(blog?.createdAt)
                                .toDateString()
                                .substr(4, 11)}
                        </span>
                    </div>
                    <div className="flex items-center lg:ml-3 ml-0 text-success">
                        <BiUserPlus />
                        <span className="ml-1 text-sm">
                            {blog?.publisherName}
                        </span>
                    </div>
                </div>
                <p className="text-gray-600">
                    {blog?.description?.length > 200
                        ? `${blog.description.slice(0, 200)} ...`
                        : blog?.description}
                </p>
                <div className="flex absolute bottom-0 justify-end text-gray-900 hover:text-green-400 transition-all">
                    <Link href={`${blog?.link}`}>Read More</Link>
                </div>
            </div>
        </div>
    );
};

export default Blog;
