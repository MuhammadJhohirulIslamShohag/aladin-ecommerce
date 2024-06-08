"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/store/user/users";

const useCheckUser = () => {
    const user = getUserInfo();
    const router = useRouter();

    useEffect(() => {
        if (!user?.user && !user?.token?.accessToken) {
            router.push("/auth/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, router]);
};

export default useCheckUser;
