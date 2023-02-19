import React, { useState, useEffect } from "react";
import {
    getAllSubCategories,
    createSubCategory,
    deleteSubCategory,
} from "@/api/sub-categories";
import SubCategoryTable from "@/components/Dashboard/Admin/SubCategoryTable/SubCategoryTable";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { ISubCategories } from "types/sub-category.type";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { getListOfCategory } from "@/api/category";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const AllSubCategory = () => {
    const [subCategoryName, setSubCategoryName] = useState("");
    const [subCategories, setSubCategories] = useState<ISubCategories[]>([]);
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        getAllCategories();
        allSubCategories();
    }, []);

    const getAllCategories = async () => {
        getListOfCategory().then((res) => {
            setCategories(res.data);
        });
    };
    const allSubCategories = async () => {
        getAllSubCategories().then((res) => {
            setSubCategories(res.data);
        });
    };

    const searched = (keyword: any) => (c: any) =>
        c.name.toLowerCase().includes(keyword);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        createSubCategory(user!.token, subCategoryName, parentCategory)
            .then((res) => {
                toast.success(`${res.data.name} Sub-Category Created!`);
                allSubCategories();
                setParentCategory("");
                setSubCategoryName("");
                setLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error(`Sub-Category Creating is Failed!`);
                }
                setLoading(false);
            });
    };

    const handleRemoveSubCategory = async (slug: string) => {
        if (
            window.confirm(
                `Are You Sure? To Remove ${slug.toUpperCase()} Sub-Category!`
            )
        ) {
            deleteSubCategory(user!.token, slug)
                .then((res) => {
                    toast.success(`${res.data.name} Sub-Category Deleted!`);
                    setLoading(false);
                    allSubCategories();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error(`Sub-Category Removing is Failed!`);
                    }
                    setLoading(false);
                });
        }
    };

    return (
        <DashboardLayout>
            <div className="px-20 mt-5">
                <SubCategoryTable
                    subCategories={subCategories}
                    handleRemoveSubCategory={handleRemoveSubCategory}
                />
            </div>
        </DashboardLayout>
    );
};

export default dynamic(() => Promise.resolve(AllSubCategory), { ssr: false });
