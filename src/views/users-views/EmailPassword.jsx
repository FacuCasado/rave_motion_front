/* =======================================================
    VIEW PasswordChange - "/changepassword" - Vista para cambiar password
    
    styles:
    email 
    boton confirmar    
*/
// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// React Router Dom
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useState } from "react";

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schemas
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("El mail no es valido.")
        .required("Este campo es requerido."),
});

// Component ==============================================
const EmailPassword = () => {
    const [wasSumitting, setWasSumitting] = useState(false);
    const [error, setError] = useState("");

    // Submit
    const navigate = useNavigate();
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setError("");
        try {
            const response = await axios.post(
                `${BACKEND_URL}/users/resetpassword`,
                { email: values.email }
            );
            const passwordToken = response.data.resetPasswordToken;
            localStorage.setItem("passwordtoken", passwordToken);
            setWasSumitting(true);
        } catch (error) {
            setError(error.response.data.error);
        }
        resetForm();
        setSubmitting(false);
    };

    const handleModalCancel = () => {
        setWasSumitting(false);
    };

    return (
        <div className="w-full h-[calc(100vh_-_3rem)] flex flex-col justify-center items-center">
            <div className="floatBox w-96">
                {wasSumitting && !error ? (
                    <>
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primaryLight dark:bg-primary bg-opacity-80 dark:bg-opacity-90">
                            <div className="floatBox p-8  w-full lg:w-2/6">
                                <div className="mb-4 text-2xl font-semibold">
                                    Revisa tu email!
                                </div>
                                <div className="text-normal mb-6">
                                    Te enviamos las instrucciones para que
                                    puedas cambiar tu contraseña.
                                </div>
                                <div className="flex flex-row gap-6 justify-end">
                                    <button
                                        onClick={handleModalCancel}
                                        className="w-32 px-4 text-lg py-2 rounded-xl bg-green-600 hover:bg-green-400 focus:outline-none transition-colors duration-300"
                                    >
                                        Entendido
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl text-center mb-8">
                            Solicitar cambio de contraseña
                        </h2>
                        <Formik
                            initialValues={{ email: "" }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            {({ isSubmitting, touched, errors, values }) => (
                                <Form>
                                    {/* email */}
                                    <div className="flex flex-col my-2">
                                        <label
                                            htmlFor="email"
                                            className="block my-1 font-semibold"
                                        >
                                            Mail:
                                        </label>
                                        <Field
                                            className={
                                                touched.email && errors.email
                                                    ? "inputError"
                                                    : touched.email &&
                                                      !errors.email
                                                    ? "inputSuccess"
                                                    : "input"
                                            }
                                            type="text"
                                            placeholder="Tu mail"
                                            name="email"
                                            autoComplete="false"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="errorMessage"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <div className="flex flex-col mt-4">
                                        <button
                                            type="submit"
                                            className="btnPrimary"
                                            disabled={isSubmitting}
                                        >
                                            Solicitar cambio de contraseña
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <div className="flex flex-col mt-8">
                            <div className="text-center flex-row my-">
                                Volver al{" "}
                                <Link className="link" to="/">
                                    home
                                </Link>
                                .
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EmailPassword;
