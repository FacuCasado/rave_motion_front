/* =======================================================
    VIEW PasswordChange - "/changepassword/2" - Vista para cambiar password

    * Solo se accede desde el enlace del email 

    styles:
    password y password repeat
*/
// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Hooks
import { useToggle } from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// React Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// Validation schemas
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Debe tener al menos 8 caracteres")
        .matches(
            /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
            "Debe tener al menos un número y no debe contener caracteres especiales."
        )
        .required("Este campo es requerido."),
    passwordConfirm: Yup.string()
        .required("Este campo es requerido.")
        .test(
            "password-match",
            "Las contraseñas no coinciden",
            function (value) {
                return this.parent.password === value;
            }
        ),
});

// Component ==============================================
const ChangePassword = () => {
    const [isPasswordShow, toggleShowPassword] = useToggle();
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Submit
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        setError("");
        const resetPasswordToken1 = localStorage.getItem("passwordtoken");
        axios
            .post(`${BACKEND_URL}/users/resetpassword/2`, {
                newPassword: values.password,
                resetPasswordToken1,
            })
            .then(() => {
                navigate("/signin");
            })
            .catch((error) => {
                setError(error.response.data.error);
            });
        resetForm();
        setSubmitting(false);
    };

    return (
        <div className="w-full h-[calc(100vh_-_3rem)] flex flex-col justify-center items-center">
            <div className="floatBox w-96">
                <h2 className="text-2xl text-center mb-8">
                    Cambiar contraseña
                </h2>
                <Formik
                    initialValues={{ password: "", passwordConfirm: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting, touched, errors, values }) => (
                        <Form>
                            {error && !values.password && (
                                <span className="errorMessage">{error}</span>
                            )}

                            <div className="flex flex-col my-2">
                                <label
                                    htmlFor="password"
                                    className="block my-1 font-semibold"
                                >
                                    Nueva Contraseña:
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
                                                />
                                            ) : (
                                                <AiFillEye
                                                    size="1.5rem"
                                                    color="#c026d3"
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

                            <div className="flex flex-col my-2">
                                <label
                                    htmlFor="passwordConfirm"
                                    className="block my-1 font-semibold"
                                >
                                    Confirmar Contraseña:
                                </label>
                                <Field
                                    className={
                                        touched.passwordConfirm &&
                                        errors.passwordConfirm
                                            ? "inputError"
                                            : touched.passwordConfirm &&
                                              !errors.passwordConfirm
                                            ? "inputSuccess"
                                            : "input"
                                    }
                                    type={isPasswordShow ? `text` : `password`}
                                    name="passwordConfirm"
                                    placeholder="Confirma tu contraseña"
                                />
                                <ErrorMessage
                                    name="passwordConfirm"
                                    component="span"
                                    className="errorMessage"
                                />
                            </div>

                            <div className="flex flex-col mt-4">
                                <button
                                    type="submit"
                                    className="btnPrimary"
                                    disabled={isSubmitting}
                                >
                                    Cambiar contraseña
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ChangePassword;
