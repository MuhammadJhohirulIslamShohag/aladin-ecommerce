"use client";

import { getUserInfo } from "@/store/user/users";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useCheckAdmin = () => {
    const user = getUserInfo();

    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
        } else if (user.role !== "admin") {
            router.push("/");
        }
    }, [user, router]);
};

export default useCheckAdmin;
