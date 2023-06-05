import { useEffect } from "react";

// JWT
import jwt_decode from "jwt-decode";

// Redux
import { useDispatch } from "react-redux";
import { signInGoogle } from "../../redux/actions/usersActions";

const GoogleAuthComponent = () => {
    const dispatch = useDispatch();
    function handleCallbackResponse(response) {
        const userObject = jwt_decode(response.credential);

        const {
            given_name: name,
            family_name: lastname,
            email: email,
        } = userObject;
        const extractedData = { name, lastname, email };
        dispatch(signInGoogle(extractedData));
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id:
                "255049858573-qm7dl82tt6j3bj837067gb83snm2ihup.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
            theme: "outline",
            size: "large",
        });
    }, []);

    return (
            <div className="w-full">
                <div id="signInDiv" style={{ borderRadius: '25px', overflow: 'hidden' }}></div>
            </div>
    );
};

export default GoogleAuthComponent;
