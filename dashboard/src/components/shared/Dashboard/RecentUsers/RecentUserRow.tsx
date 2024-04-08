import { FaUserGraduate } from "react-icons/fa";

const RecentUserRow = ({ user }: any) => {
    const { name, image, email } = user;

    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td className="p-4">
                {image.url ? (
                    <img
                        src={image?.url}
                        alt="Apple Watch"
                        className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300"
                    />
                ) : (
                    <FaUserGraduate className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                )}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">{name}</td>

            <td className="px-6 py-4 font-semibold text-gray-900 ">{email}</td>
        </tr>
    );
};

export default RecentUserRow;
