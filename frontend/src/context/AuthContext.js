import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthContextProvider(props) {
    const [currentUser, setCurrentUser] = useState({ loggedIn: null });
    const [isLoading, setIsLoading] = useState(false);

    // user authorization
    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8000/user")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setCurrentUser({ loggedIn: true, ...data[0] });
            setIsLoading(false);
        });
    }, []);

    const value = {
        currentUser,
        setCurrentUser,
    };

    return (
        <AuthContext.Provider value={value}>
        {!isLoading && props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
