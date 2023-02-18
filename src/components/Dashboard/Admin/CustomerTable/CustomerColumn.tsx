import { FaUserGraduate } from "react-icons/fa";
import Image from "next/image";

export const CustomerColumn = [
    {
        header: () => "Username",
        accessorKey: "username",
    },
    {
        header: () => "Profile",
        cell: (info: any) => (
            <span>
                {info.getValue() ? (
                    <Image
                        width={100}
                        height={100}
                        src={info.getValue()}
                        alt="Apple Watch"
                        className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300"
                    />
                ) : (
                    <FaUserGraduate className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                )}
            </span>
        ),
        accessorKey: "image.url",
    },
    {
        header: () => "Name",
        accessorKey: "name",
    },
    {
        header: () => "Email",
        accessorKey: "email",
    },
    {
        header: () => "Country",
        cell: (info: any) => (
            <span>
                {info.getValue() ? (
                   `${info.getValue()}`
                ) : "null"}
            </span>
        ),
        accessorKey: "address.country",
    },
    {
        header: () => "Role",
        accessorKey: "role",
    },
];
