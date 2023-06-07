/*=======================================================
VIEW About - "/about" - 

styles:
*/
// Hooks
import { useEffect } from "react";

// Assets
import { FaLinkedin, FaGithub } from "react-icons/fa";
import about from "../../assets/about.png";
import fondoabout from "../../assets/fondoabout.jpg";
import carlitos from "../../assets/team/carlitos.jpg";
import denis from "../../assets/team/denis.jpg";
import enma from "../../assets/team/enma.jpg";
import facut from "../../assets/team/facut.jpg";
import fran from "../../assets/team/fran.jpg";
import fsoltero from "../../assets/team/fsoltero.jpg";
import orne from "../../assets/team/orne.jpeg";

const About = () => {
    const nosotros = [
        {
            id: 1,
            nombre: "Denis Roldan",
            foto: denis,
            cargo: "Backend Developer",
            github: "https://github.com/denisrold",
            linkedin: "https://www.linkedin.com/in/denisrold/",
        },
        {
            id: 2,
            nombre: "Carlos Mosquera",
            foto: carlitos,
            cargo: "Backend Developer",
            github: "https://github.com/carlitosmunkstar",
            linkedin:
                "https://www.linkedin.com/in/carlos-andres-mosquera-barona-6520501b8/",
        },
        {
            id: 3,
            nombre: "Enmanuel Reyes",
            foto: enma,
            cargo: "Frontend Developer",
            github: "https://github.com/EnmaReyes",
            linkedin: "https://www.linkedin.com/in/enmanuel-reyes-61aaa2250/",
        },
        {
            id: 4,
            nombre: "Facundo Casado",
            foto: fsoltero,
            cargo: "Backend Developer",
            github: "https://github.com/FacuCasado",
            linkedin: "https://www.linkedin.com/in/facufcasado/",
        },
        {
            id: 5,
            nombre: "Facundo Torres",
            foto: facut,
            cargo: "Backend Developer",
            github: "https://github.com/Facutorress",
            linkedin: "https://www.linkedin.com/in/juanperez/",
        },
        {
            id: 6,
            nombre: "Francisco Yorlano",
            foto: fran,
            cargo: "Frontend Developer",
            github: "https://github.com/FranciscoYorlano",
            linkedin: "https://www.linkedin.com/in/francisco-yorlano/",
        },
        {
            id: 7,
            nombre: "Ornella Copula",
            foto: orne,
            cargo: "Frontend Developer",
            github: "https://github.com/ornecop",
            linkedin: "https://www.linkedin.com/in/ornella-c%C3%B3pula/",
        },
    ];

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const section = urlParams.get("section");
        if (section === "about") {
            const aboutSection = document.getElementById("about-section");
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    return (
        <div className="w-full min-h-screen">
            <div className="h-96 overflow-hidden relative">
                <img
                    className="w-full h-full object-cover"
                    src={fondoabout}
                    alt="background"
                />
            </div>

            {/* RAVE MOTION */}
            <div className="container mx-auto" id="about-section">
                <div className="ml-4 md:ml-16 mt-4 md:mt-16">
                    <img
                        className="w-full md:w-96 sm:w-52 "
                        src={about}
                        alt="logo"
                    />

                    <div className="hidden md:block">
                        <p className="text-3xl font-extralight mr-52">
                            Somos apasionados de la música electrónica, queremos
                            brindarte una experiencia única para que disfrutes
                            al máximo de los eventos más emocionantes del país
                        </p>
                    </div>

                    <div className="md:hidden">
                        <p>
                            Nos enfocamos en que disfrutes al máximo
                            <br /> de los mejores eventos del país
                        </p>
                    </div>
                </div>

                <div className="container mx-auto ">
                    <h1 className="flex justify-center text-6xl  text-pink-500 font-semibold mt-20 mb-20  ">
                        ¿QUÉ OFRECEMOS?
                    </h1>
                    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-20">
                        <div className="p-8 flex flex-col justify-center w-96 h-80  bg-secondaryLight dark:bg-secondary border border-secondaryBorderLight dark:border-secondaryBorder shadow-md rounded-md card group">
                            <h3 className="font-bold text-4xl text-center leading-36 relative top-16 block group-hover:invisible leading-snug">
                                Amplia selección de Eventos
                            </h3>
                            <p className="text-xl text-center leading-24 tracking-0 font-normal w-fit block mt-4 sm:mt-8 opacity-0 group-hover:opacity-100 relative -top-24 sm:bottom-16">
                                Trabajamos en colaboración con las principales
                                productoras de eventos para ofrecerte una amplia
                                selección de eventos
                            </p>
                        </div>

                        <div className="p-8 flex flex-col justify-center w-96 h-80 bg-secondaryLight dark:bg-secondary border  border-secondaryBorderLight dark:border-secondaryBorder shadow-md rounded-md card group">
                            <h3 className="font-bold text-4xl text-center leading-36 relative top-28 block group-hover:invisible leading-snug">
                                Compra <br /> segura y fácil
                            </h3>
                            <p className="text-xl text-center leading-24 tracking-0 font-normal w-fit block mt-4 sm:mt-8 opacity-0 group-hover:opacity-100 relative bottom-6 sm:bottom-14">
                                Puedes explorar los eventos, verificar la
                                disponibilidad de tickets en tiempo real y
                                realizar tu compra de manera rápida y sencilla.
                                Garantizamos transacciones seguras para
                                brindarte tranquilidad durante todo el proceso
                            </p>
                        </div>

                        <div className="p-8 flex flex-col justify-center w-96 h-80 bg-secondaryLight dark:bg-secondary border border-secondaryBorderLight dark:border-secondaryBorder shadow-md rounded-md card group">
                            <h3 className="font-bold text-4xl text-center leading-36 relative top-20 block group-hover:invisible leading-snug">
                                Experiencia premium
                            </h3>
                            <p className="text-xl text-center leading-24 tracking-0 font-normal w-fit block mt-4 sm:mt-8 opacity-0 group-hover:opacity-100 relative bottom-6 sm:bottom-14">
                                Queremos que tu experiencia sea inolvidable
                                desde el momento en que compras tu ticket hasta
                                que vives el evento. Trabajamos para ofrecerte
                                un servicio excepcional
                            </p>
                        </div>
                    </div>

                    <div>
                        <h1 className="flex justify-center text-6xl text-pink-500 font-semibold mt-24 mb-12">
                            ¿QUIENES SOMOS?
                        </h1>
                    </div>
                </div>

                {/* nosotros */}

                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8 md:gap-12 pt-8 sm:pt-16 mb-8 sm:mb-32">
                        {nosotros.map((compañero) => (
                            <div
                                className="h-auto sm:h-[15rem] max-w-[30rem] m-auto flex flex-wrap bg-secondaryLight dark:bg-secondary rounded-xl border border-secondaryBorderLight dark:border-secondaryBorder"
                                key={compañero.id}
                            >
                                <div className="flex flex-col sm:flex-row rounded-xl  rounded-l-xl">
                                    <img
                                        className="w-full sm:w-[15rem] rounded-l-xl bg-cover bg-bottom bg-no-repeat"
                                        src={compañero.foto}
                                        alt={compañero.nombre}
                                    />
                                    <div className="w-full sm:w-[20rem] py-4 px-6 flex flex-col justify-center">
                                        <div className="py-2">
                                            <h3 className="text-2xl uppercase font-semibold text-center sm:text-left">
                                                {compañero.nombre}
                                            </h3>
                                            <p className="font-extralight uppercase mt-2 mb-4 text-center sm:text-left">
                                                {compañero.cargo}
                                            </p>
                                            <div className="flex justify-center sm:justify-start">
                                                <p className="flex items-center">
                                                    <a
                                                        className="inline-flex items-center hover:text-pink-600"
                                                        href={compañero.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FaGithub className="mr-2 text-3xl" />
                                                    </a>
                                                </p>
                                                <p className="flex items-center mx-6">
                                                    <a
                                                        className="inline-flex items-center hover:text-pink-600"
                                                        href={
                                                            compañero.linkedin
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FaLinkedin className="mr-2 text-3xl" />
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
