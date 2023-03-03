import { IProfile } from "@/pages/dashboard/user/profile.types";

export type FileUploadPropsType = {
    values: IProfile;
    setValues: React.Dispatch<React.SetStateAction<IProfile>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
};
