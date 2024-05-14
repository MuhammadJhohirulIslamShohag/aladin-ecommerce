"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { getUserInfo } from "@/store/user/users";

const useCheckUser = () => {
    const user = getUserInfo();
    const router = useRouter();

    // useEffect(() => {
    //     if (!user) {
    //         router.push("/auth/login");
    //     } else if (user.role !== "user") {
    //         router.push("/");
    //     }
    // }, [user, router]);
};

export default useCheckUser;
