import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/admins/dashboard");
    }, []);

    return <div></div>;
};

export default Login;
