import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SubscriptionForm = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [wasSubmitting, setWasSubmitting] = useState(false);

    const subscribe = async () => {
        setWasSubmitting(true);
        try {
            const response = await axios.post(
                "https://tu-api.com/subscriptions",
                {
                    email: email,
                }
            );

            if (response.data.success) {
                setMessage("¡Gracias por suscribirte!");
                setEmail("");
                setWasSubmitting(false);
            } else {
                setMessage("Hubo un problema. Por favor, inténtalo de nuevo.");
                setWasSubmitting(false);
            }
        } catch (error) {
            setMessage("Hubo un problema. Por favor, inténtalo de nuevo.");
            setWasSubmitting(false);
        }
    };

    return (
        <div className="w-full h-[calc(100vh-_3rem)] flex flex-col justify-center items-center">
            <div className="floatBox w-96">
                {wasSubmitting && message ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                        <div className="floatBox p-8 w-2/6">
                            <div className="mb-4 text-2xl font-semibold">
                                {message}
                            </div>
                            <div className="text-normal mb-6">
                                Revisa tu correo electrónico para las últimas
                                novedades
                            </div>
                            <button
                                onClick={() => setMessage(null)}
                                className="w-32 px-4 text-lg py-2 rounded-xl bg-green-600 hover:bg-green-400 focus:outline-none transition-colors duration-300"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl text-center mb-8">
                            Suscríbete a nuestras novedades
                        </h2>
                        <div className="flex flex-col my-2">
                            <label
                                htmlFor="email"
                                className="block my-1 font-semibold"
                            >
                                Email:
                            </label>
                            <input
                                className="input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Introduce tu correo electrónico"
                                required
                            />
                            <button
                                onClick={subscribe}
                                className="btnPrimary mt-4"
                                disabled={!email}
                            >
                                Suscríbete
                            </button>
                        </div>
                        <div className="flex flex-col mt-8">
                            <div className="text-center flex-row my-">
                                Volver al{" "}
                                <Link className="link" to="/">
                                    home
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SubscriptionForm;
