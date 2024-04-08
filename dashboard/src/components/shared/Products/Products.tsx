
const Product = ({
    data
}: {
    data: IProduct[];
}) => {
   
    const ProductColumn = [
        {
            header: () => "Image",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {info.getValue() ? (
                        <>
                            {info.getValue().length > 0 &&
                                info
                                    .getValue()
                                    .map((img: any) => (
                                        <Image
                                            key={img.public_id}
                                            width={100}
                                            height={100}
                                            src={img.url && img.url}
                                            alt="Product image"
                                            className="w-10 h-10 p-1 inline-block rounded-full ring-2 ring-green-300"
                                        />
                                    ))}
                        </>
                    ) : (
                        <SiProducthunt className="w-18 h-16 p-1 rounded-full ring-2 ring-green-300" />
                    )}
                </span>
            ),
            accessorKey: "images",
        },
        {
            header: () => "Product",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {info.getValue() && info.getValue()}
                </span>
            ),
            accessorKey: "title",
        },
        {
            header: () => "Price",
            accessorKey: "price",
        },
        {
            header: () => "Category",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {info.getValue() && info.getValue().name}
                </span>
            ),
            accessorKey: "category",
        },
        {
            header: () => "Sub Category",
            cell: (info: any) => (
                <>
                    {info.getValue()?.length > 0 &&
                        info.getValue().map((sc: any) => (
                            <span className="min-w-max flex" key={sc._id}>
                                {sc.name}
                            </span>
                        ))}
                </>
            ),
            accessorKey: "subCategory",
        },
        {
            header: () => "Color",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {info.getValue()?.length > 0 &&
                        info.getValue().map((sc: any) => (
                            <span
                                key={sc._id}
                                className={`h-8 w-8 ${
                                    sc.name === "Red"
                                        ? "bg-red-600"
                                        : sc.name === "Green"
                                        ? `bg-success`
                                        : sc.name === "Orange"
                                        ? `bg-warning`
                                        : `bg-${sc.name.toLowerCase()}-600`
                                } border border-black border-opacity-10 rounded-full`}
                            ></span>
                        ))}
                </span>
            ),
            accessorKey: "colors",
        },
        {
            header: () => "Size",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {info.getValue()?.length > 0 &&
                        info
                            .getValue()
                            .map((sc: any) => (
                                <Fragment key={sc._id}>{sc.name}, </Fragment>
                            ))}
                </span>
            ),
            accessorKey: "sizes",
        },
        {
            header: () => "Brand",
            cell: (info: any) => (
                <span className="min-w-max flex">
                    {info.getValue() && info.getValue().name}
                </span>
            ),
            accessorKey: "brand",
        },
        {
            header: () => "Quantity",
            accessorKey: "quantity",
        },
        {
            header: () => "Sold",
            accessorKey: "sold",
        },
        {
            header: () => "Discount",
            cell: (info: any) => (
                <span>{info.getValue() && info.getValue()}%</span>
            ),
            accessorKey: "discount",
        },
        {
            header: () => "Shipping",
            accessorKey: "shipping",
        },
        {
            Header: "Actions",
            accessorKey: "slug",
            cell: (info: any) => {
                const slug = info.getValue();
                return (
                    <div className="flex space-x-2">
                        <h2 onClick={() => handleRemoveProduct(slug)}>
                            <MdDeleteOutline className="text-red-500 text-xl hover:text-red-700 transition-all cursor-pointer" />
                        </h2>
                        <label
                            htmlFor="my-custom-modal"
                            onClick={() =>
                                router.push(`/dashboard/admin/products/${slug}`)
                            }
                        >
                            <AiOutlineEdit className="text-green-400 text-lg  hover:text-green-700 transition-all cursor-pointer" />
                        </label>
                    </div>
                );
            },
        },
    ];


    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md bg-clip-border">
            <div className="flex justify-between px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        All Products
                    </h6>
                </div>
                <div>
                    
                </div>
            </div>
           
           
        </div>
    );
};

export default Product;
