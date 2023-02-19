import { SiProducthunt } from "react-icons/si";
import Image from "next/image";

export const ProductColumn = [
    {
        header: () => "Image",
        cell: (info: any) => (
            <span>
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
                                        className="w-18 h-16 p-1 rounded-full ring-2 ring-green-300"
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
        accessorKey: "title",
    },
    {
        header: () => "Price",
        accessorKey: "price",
    },
    {
        header: () => "Category",
        accessorKey: "category.name",
    },
    {
        header: () => "Brand",
        accessorKey: "brand",
    },
    {
        header: () => "Quantity",
        accessorKey: "quantity",
    },
    {
        header: () => "Shipping",
        accessorKey: "shipping",
    },
];
