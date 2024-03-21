import React from 'react';
import Link from 'next/link';

const NewsLetter = () => {
    return (
        <section
            className="container bg-white justify-evenly lg:flex lg:flex-row flex-col md:flex-col lg:py-10 pt-2 pb-3"
        >
            <div className="md:w-2/5 w-full">
                <h2 className="mb-4 text-5xl tracking-tight font-extrabold text-gray-700 sm:text-3xl ">Sign up for our newsletter</h2>
                <p className="mx-auto text-xl mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-lg ">Stay up to date with the announcements and exclusive discounts feel free to sign up with your email.</p>
            </div>
            <div className='lg:mt-10 mt-1 md:mt-3'>
                <form>
                    <div className="items-center mx-auto mb-3 md:space-y-4 max-w-screen-sm md:block flex space-y-0">
                        <div className="relative w-full">
                            <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                            </div>
                            <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 md:rounded-lg border border-gray-300 rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 " placeholder="Enter your email" type="email" id="email" required />
                            <div className="flex absolute inset-y-0 right-0 items-center pl-3 ">
                                <button type="submit" className="transition-all py-3 px-5 w-full text-sm font-medium text-center text-white rounded-r-lg border cursor-pointer bg-success border-primary-600 rounded-none  hover:bg-primary focus:ring-0 outline-none focus:outline-none focus:ring-success-300 ">Subscribe</button>
                            </div>
                        </div>

                    </div>
                    <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer">We care about the protection of your data. <Link href="/" className="font-medium text-primary-600  hover:underline">Read our Privacy Policy</Link>.</div>
                </form>
            </div>
        </section>
    );
};

export default NewsLetter;