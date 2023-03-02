export interface ICurrentUser {
    fullName: string | null;
    email: string | null;
    image?: {
        url: string | null;
        public_id: string;
    };
}
