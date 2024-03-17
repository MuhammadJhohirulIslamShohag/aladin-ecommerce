import axios from "axios";

export const createPaymentIntent = async (
    token: string,
    isCouponed: boolean
) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/stripe/create-payment-intent`,
        { isCouponed },
        {
            headers: {
                token,
            },
        }
    );
};
