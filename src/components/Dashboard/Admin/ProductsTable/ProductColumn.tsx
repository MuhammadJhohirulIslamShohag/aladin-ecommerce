// import { SiProducthunt } from "react-icons/si";
// import Image from "next/image";
// import { AiOutlineEdit } from "react-icons/ai";
// import { MdDeleteOutline } from "react-icons/md";

// export const ProductColumn = [
//     {
//         header: () => "Image",
//         cell: (info: any) => (
//             <span>
//                 {info.getValue() ? (
//                     <>
//                         {info.getValue().length > 0 &&
//                             info
//                                 .getValue()
//                                 .map((img: any) => (
//                                     <Image
//                                         key={img.public_id}
//                                         width={100}
//                                         height={100}
//                                         src={img.url && img.url}
//                                         alt="Product image"
//                                         className="w-18 h-16 p-1 rounded-full ring-2 ring-green-300"
//                                     />
//                                 ))}
//                     </>
//                 ) : (
//                     <SiProducthunt className="w-18 h-16 p-1 rounded-full ring-2 ring-green-300" />
//                 )}
//             </span>
//         ),
//         accessorKey: "images",
//     },
//     {
//         header: () => "Product",
//         accessorKey: "title",
//     },
//     {
//         header: () => "Price",
//         accessorKey: "price",
//     },
//     {
//         header: () => "Category",
//         accessorKey: "category.name",
//     },
//     {
//         header: () => "Brand",
//         accessorKey: "brand",
//     },
//     {
//         header: () => "Quantity",
//         accessorKey: "quantity",
//     },
//     {
//         header: () => "Shipping",
//         accessorKey: "shipping",
//     },
//     {
//         Header: "Actions",
//         accessorKey: "shipping",
//         cell: (info: any) => {
//             const slug = info.getValue();
//             return (
//                 <div>
//                     <h2 onClick={() => handleRemoveProduct(slug)}>
//                         <MdDeleteOutline className="text-red-500 text-xl hover:text-red-700 transition-all cursor-pointer" />
//                     </h2>
//                     <label
//                         htmlFor="my-custom-modal"
//                         onClick={() => handleEditProduct(slug)}
//                     >
//                         <AiOutlineEdit className="text-green-400 text-lg  hover:text-green-700 transition-all cursor-pointer" />
//                     </label>
//                 </div>
//             );
//         },
//     },
// ];
