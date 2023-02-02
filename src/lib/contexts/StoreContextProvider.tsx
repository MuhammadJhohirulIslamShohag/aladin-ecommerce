/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useReducer,
} from "react";
import {
    sendSignInLinkToEmail,
    signInWithEmailLink,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    updatePassword,
    User,
    GoogleAuthProvider,
} from "firebase/auth";
import { ActionConfigType, StoreContextType } from "./StoreContext.type";
import {
    storeReducer,
    initialState,
} from "../states/storeReducer/storeReducer";
import firebaseApp from "../config/firebase/firebase.config";
import { StoreActionType } from "../states/storeReducer/storeReducer.type";

const StoreContext = createContext<StoreContextType | null>(null);
const auth = getAuth(firebaseApp);

export const useStoreContext = () => {
    return useContext(StoreContext) as StoreContextType;
};

const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);
    const [loading, setLoading] = useState(true);
    console.log(state.user, "up");
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const idTokenResult = await currentUser.getIdTokenResult();
                //  to add data from window local storage to the initial state
                if (typeof window !== "undefined") {
                    if (window.localStorage.getItem("accountInfo")) {
                        // checking already carts to the window localStorage
                        let accountInfoFromLocalStorage: string | null =
                            window.localStorage.getItem("accountInfo");
                        if (accountInfoFromLocalStorage !== null) {
                            dispatch({
                                type: StoreActionType.LOGGED_IN_USER,
                                payload: JSON.parse(
                                    accountInfoFromLocalStorage
                                ),
                            });
                        }
                    } else {
                        dispatch({
                            type: StoreActionType.LOGGED_IN_USER,
                            payload: {
                                ...state.user,
                                token: idTokenResult.token,
                                fullName: currentUser.displayName,
                                email: currentUser.email,
                            },
                        });
                    }
                }
            } else {
                dispatch({
                    type: StoreActionType.LOGOUT_USER,
                    payload: null,
                });
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const sendForSignInLinkToEmail = (
        email: string,
        actionCodeSettings: ActionConfigType
    ) => {
        setLoading(true);
        return sendSignInLinkToEmail(auth, email, actionCodeSettings);
    };

    const createUser = (email: string, location: string) => {
        setLoading(true);
        return signInWithEmailLink(auth, email, location);
    };

    const userProfileUpdate = (profile: any) => {
        setLoading(true);
        return updateProfile(auth.currentUser as User, profile);
    };
    const loginWithEmailAndPassword = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const registerAndLoginWithProvider = (provider: GoogleAuthProvider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };
    const forgotPassword = (
        email: string,
        actionCodeSettings: ActionConfigType
    ) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email, actionCodeSettings);
    };

    const updateThePassword = (newPassword: string) => {
        setLoading(true);
        if (auth.currentUser !== null) {
            return updatePassword(auth.currentUser, newPassword);
        }
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const values = {
        state,
        dispatch,
        auth,
        setLoading,
        loading,
        sendForSignInLinkToEmail,
        userProfileUpdate,
        createUser,
        logOut,
        loginWithEmailAndPassword,
        registerAndLoginWithProvider,
        forgotPassword,
        updateThePassword,
    };
    return (
        <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
    );
};

export default StoreContextProvider;
