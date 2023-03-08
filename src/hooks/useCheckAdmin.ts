import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useCheckAdmin = () => {
    const { state } = useStoreContext();
    const { user } = state;
    console.log(user, "check out user");

    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
        } else if (user.role !== "admin") {
            router.push("/");
        }
    }, []);
};

export default useCheckAdmin;
