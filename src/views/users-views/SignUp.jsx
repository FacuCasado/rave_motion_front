/* =======================================================
    VIEW SignUp - "/signup" - Vista para registrase

    styles:
    A un lado el form (form por pasos) y al otro una imagen o mockup del home
    1er form (email, password, passwordConfirm || registrarse con Google) 
    2do form (firstName, lastName, documentType, document)
    3er form (birthDay, address)


    * Redirecciona al Sign In
    
*/

// React router dom
import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";

// React Redux
import { connect } from "react-redux";

// Actions
import {
    removeSignUserError,
    setSignUpStep,
} from "../../redux/actions/usersActions";
// Google button
import GoogleLogin from "./GoogleLogin";

// Components
import SignUpForm1 from "../../components/SignUpForm1";
import SignUpForm2 from "../../components/SignUpForm2";
import SignUpForm3 from "../../components/SignUpForm3";

const SignUp = ({ signUpStep, setSignUpStep }) => {
    // User data
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        documentType: "",
        document: "",
    });

    // Step 1 =====================================
    const setFormData1 = ({ email, password }) => {
        setUserData({ ...userData, email: email, password: password });
        setSignUpStep(2);
    };

    // Step 2 (fistName, lastName, documentType and document)
    const setFormData2 = ({ firstName, lastName, documentType, document }) => {
        setUserData({
            ...userData,
            firstName: firstName,
            lastName: lastName,
            documentType: documentType,
            document: document,
        });
        setSignUpStep(3);
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col w-96 py-8 px-4 bg-secondaryLight dark:bg-secondary rounded-xl border border-secondaryBorderLight dark:border-secondaryBorder">
                {/* Cabezera */}

                {/* Indicador de paso */}
                <div className="grid grid-cols-3 my-2 gap-2 h-3">
                    <div
                        className={`step ${signUpStep !== 1 && `opacity-50`}`}
                    ></div>
                    <div
                        className={`step ${signUpStep !== 2 && `opacity-50`}`}
                    ></div>
                    <div
                        className={`step ${signUpStep !== 3 && `opacity-50`}`}
                    ></div>
                </div>

                {/* Forms */}
                {signUpStep === 1 && <SignUpForm1 callBack={setFormData1} />}

                {signUpStep === 2 && <SignUpForm2 callBack={setFormData2} />}

                {signUpStep === 3 && <SignUpForm3 userData={userData} />}

                {/* Google button */}

                {signUpStep === 1 && (
                    <>
                        {/* Divider */}
                        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                            <p className="mx-4 mb-0 text-center font-semibold dark:text-text">
                                OR
                            </p>
                        </div>

                        <GoogleLogin />
                    </>
                )}

                {/* Links */}
                <div className="flex flex-col mt-8">
                    <div className="text-center flex-row my-1">
                        Ya tenes una cuenta?{" "}
                        <Link className="link" to="/signin">
                            Inicia sesión.
                        </Link>
                    </div>
                    <div className="text-center flex-row my-">
                        Volver al{" "}
                        <Link className="link" to="/">
                            home.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        signUpStep: state.signUpStep,
        userSignError: state.userSignError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeSignUserError: () => dispatch(removeSignUserError()),
        setSignUpStep: (step) => dispatch(setSignUpStep(step)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
