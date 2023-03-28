

const Advertise = () => {
    return (
        <>
            <section
                data-aos="zoom-in"
                data-aos-offset="200"
                data-aos-delay="1"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                className="grid grid-cols-2 sm:grid-cols-1 bg-fixed pt-28 pb-32 sm:pt-2 sm:pb-10 md:pb-14 md:pt-2"
            >
                <div className="z-20 relative">
                    <img
                        className="h-96 sm:h-60 w-full"
                        src="../../../../../advertise/advertise.jpg"
                        alt="advertised product"
                    />
                </div>
                <div className="z-20 sm:p-4 relative flex items-center">
                    <div className="space-y-3">
                        <h2 className="text-6xl sm:text-4xl uppercase text-success font-bold">
                            Summer <span>Offer</span>
                        </h2>
                        <h3 className="text-6xl  sm:text-4xl uppercase text-gray-800">
                            50% OFF
                        </h3>
                        <h4 className="text-3xl sm:text-2xl text-primary">
                            Lenovo
                        </h4>
                        <p className="text-lg text-primary">
                            This is awesome offer for almost free
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Advertise;
