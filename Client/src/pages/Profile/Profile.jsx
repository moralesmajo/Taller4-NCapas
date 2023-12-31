import MobNavbar from '../../components/Navbars/MobNavbar';
import Sidebar from '../../components/Navbars/Sidebar';
import Titles from '../../components/Titles/Titles';
import { infoProfile, updateProfile } from '../../services/AuthServices';
import { useEffect, useState } from 'react';

export default function Profile() {
    const [profileData, setProfileData] = useState({
        username: "usuario",
        gmail: "correo@electronico.com",
        image: "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
    });

    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const [newImage, setNewImage] = useState("");
    const [updateError, setUpdateError] = useState(null);

    const getData = async () => {
        setLoading(true);
        try {
            const profileInfo = await infoProfile(token);
            setProfileData(profileInfo);
            setLoading(false);
        } catch (error) {
            console.error('An error occurred while getting profile info:', error);
        }
    }

    const updateImage = async () => {
        try {
            let response = await updateProfile(token, newImage);
            if (response) {
                console.log(response);
                getData();
                setNewImage("");
                setUpdateError("Foto de perfil actualizada");
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
            setUpdateError("No se pudo actualizar la foto de perfil");
        }
    }

    const handleInputChange = (event) => {
        setNewImage(event.target.value);
    };

    const handleModalClose = () => {
        // Hacer algo con el valor newImage al cerrar el modal (por ejemplo, enviarlo a la API)
        console.log('Nuevo valor de imagen:', newImage);
        if (newImage != '') {
            updateImage();
        }

    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="drawer lg:drawer-open bg-greenish-black">
            <input type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col max-h-screen">
                {/* Mobile navbar and music player bar */}
                <MobNavbar />

                {/* Contenido*/}
                <main className="lg:flex-1 h-screen lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
                    <Titles title='Mi Perfil' />
                    {/* Profile details */}
                    <section className='grid lg:grid-cols-2 w-full justify-center gap-14 lg:gap-0 lg:px-10 px-15 pb-10'>
                        <div className='flex flex-col items-center gap-8 w-56'>
                            <div className="avatar flex flex-col items-center">
                                <div className="w-40 lg:w-56 rounded-full border-2 border-gray">
                                    
                                    <img src={profileData.image || "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"} alt="Profile" />
                                </div>
                                {updateError && (
                                    <span className='text-light-blue text-sm imprima-700 italic pt-5'>{updateError}</span>
                                )}
                            </div>
                            <button className="btn btn-sm w-40 h-9 lg:w-56 imprima-400 text-white hover:text-white active:text-white bg-light-green hover:bg-darkest-green active:bg-dark-green border-none rounded-full" onClick={() => document.getElementById('my_modal_5').showModal()}>Editar foto</button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
                                <div className="modal-box bg-gray-900 ">
                                    <h3 className="font-bold text-lg">Ingrese nueva foto de perfil</h3>
                                    <input
                                        onChange={handleInputChange} type="text" placeholder="URL de la imagen" className="input input-bordered my-2 w-full " />
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button onClick={handleModalClose} className="btn">Aceptar</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>

                        </div>
                        <div className='flex flex-col justify-center items-center lg:items-start text-xl imprima-400 text-white lg:text-2xl lg:p-0'>
                            <a>{!loading ? profileData.username : 'Cargando...'}</a>
                            <a>{!loading ? profileData.gmail : ''}</a>
                        </div>
                    </section>
                </main>
            </div>

            {/* Sidebar on web */}
            <Sidebar />
        </div>
    )
}
