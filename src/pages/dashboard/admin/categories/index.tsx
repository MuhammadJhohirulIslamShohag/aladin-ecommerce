import { getListOfCategory, deleteCategory } from "@/api/category";
import CategoryTable from "@/components/Dashboard/Admin/CategoryTable/CategoryTable";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { GetServerSideProps } from "next";
import React,{useEffect, useState} from "react";
import toast from "react-hot-toast";
import { ICategories } from "types/category.type";

const AllCategory = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<ICategories[]>([]);
    // step1
    const [keyword, setKeyword] = useState("");
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        handleShowCategory();
    }, []);

    // search filter
    // const filtering = categories.filter(category => category.name.toLowerCase().includes(keyword));
    const searched = (keyword:any) => (c:any) => c.name.toLowerCase().includes(keyword);

    const handleShowCategory = () =>
        getListOfCategory().then((res) => {
            setCategories(res.data);
        });


    const handleRemoveCategory = async (slug:string) => {
        if (window.confirm("Are You Sure?, Want to Delete Category!")) {
            deleteCategory(user!.token, slug)
                .then((res) => {
                    toast.success(`${res.data.name} is deleted!`);
                    handleShowCategory();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error("Category Deleting Failed!");
                    }
                });
        }
    };
    return (
        <DashboardLayout>
            <div className="px-20 mt-5">
                <CategoryTable categories={categories} handleRemoveCategory={handleRemoveCategory}/>
            </div>
        </DashboardLayout>
    );
};

export default AllCategory;

