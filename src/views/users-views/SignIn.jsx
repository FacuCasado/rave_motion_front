/* =======================================================
    VIEW SignIn - "/signin" - Vista para iniciar sesión

    styles:
    A un lado el form y al otro una imagen o mockup del home
    email, password || ingresar con Google) 

    * Redirecciona al UserTickets
    
*/

// React router dom
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useToggle } from "../../hooks/useToggle";

// React icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// React redux
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/usersActions";

// Google button
import GoogleLogin from "./GoogleLogin";
import { useEffect } from "react";

// Validation schemas
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("El mail no es valido.")
        .required("Este campo es requerido."),
    password: Yup.string().required("Este campo es requerido."),
});

const SignIn = ({ signIn, userSignError, isLogin }) => {
    // Show password
    const [isPasswordShow, toggleShowPassword] = useToggle();

    // App login
    const initialValues = {
        email: "",
        password: "",
    };

    const navigate = useNavigate();
    useEffect(() => {
        isLogin && navigate("/");
    }, [isLogin, navigate]);

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        signIn({ email: values.email, password: values.password });

        setSubmitting(false);
        resetForm();
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col w-96 py-8 px-4 bg-secondaryLight dark:bg-secondary rounded-xl border border-secondaryBorderLight dark:border-secondaryBorder">
                <h2 className="text-4xl text-center mb-8">Bienvenido!</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting, touched, errors, values }) => (
                        <Form className="">
                            {userSignError &&
                                (!touched.email || !values.email) && (
                                    <div className="flex justify-center flex-row my-1">
                                        <span className="errorMessage">
                                            {userSignError}
                                        </span>
                                    </div>
                                )}
                            {/* email */}
                            <div className="flex flex-col my-2">
                                <label
                                    htmlFor="email"
                                    className="block my-1 font-semibold"
                                >
                                    mail:
                                </label>
                                <Field
                                    className={
                                        touched.email && errors.email
                                            ? "inputError"
                                            : touched.email && !errors.email
                                            ? "inputSuccess"
                                            : "input"
                                    }
                                    type="text"
                                    placeholder="Tu email"
                                    name="email"
                                    autoComplete="false"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="span"
                                    className="errorMessage"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col my-2">
                                <label
                                    htmlFor="password"
                                    className="block my-1 font-semibold"
                                >
                                    Contraseña:
                                </label>
                                <div className="relative w-full">
                                    <Field
                                        className={
                                            touched.password && errors.password
                                                ? "inputError"
                                                : touched.password &&
                                                  !errors.password
                                                ? "inputSuccess"
                                                : "input"
                                        }
                                        type={
                                            isPasswordShow ? `text` : `password`
                                        }
                                        name="password"
                                        placeholder="Tu contraseña"
                                    />

                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <button
                                            onClick={toggleShowPassword}
                                            type="button"
                                        >
                                            {isPasswordShow ? (
                                                <AiFillEyeInvisible
                                                    size="1.5rem"
                                                    color="#c026d3"
                                                    // color="#18181b"
                                                />
                                            ) : (
                                                <AiFillEye
                                                    size="1.5rem"
                                                    color="#c026d3"
                                                    // color="#18181b"
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <ErrorMessage
                                    name="password"
                                    component="span"
                                    className="errorMessage"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col mt-4">
                                <Link
                                    className="text-center text-sm mb-2 link"
                                    to="/changepassword"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                                <button
                                    type="submit"
                                    className="btnPrimary"
                                    disabled={isSubmitting}
                                >
                                    Iniciar sesión
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-text">
                                    OR
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>

                {/* Google */}

                <div className="flex justify-center mx-auto">
                    <GoogleLogin />
                </div>

                {/* Links */}
                <div className="flex flex-col mt-8">
                    <div className="text-center flex-row my-1">
                        ¿No tenes cuenta?{" "}
                        <Link className="link" to="/signup">
                            Registrate.
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
        userSignError: state.userSignError,
        isLogin: state.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (userData) => dispatch(signIn(userData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
