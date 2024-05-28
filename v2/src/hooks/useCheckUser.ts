"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserInfo } from "@/store/user/users";

const useCheckUser = () => {
    const user = getUserInfo();
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("redirect");

    useEffect(() => {
        if (!user?.user && !user?.token?.accessToken) {
            router.push(search || "/auth/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, router]);
};

export default useCheckUser;
