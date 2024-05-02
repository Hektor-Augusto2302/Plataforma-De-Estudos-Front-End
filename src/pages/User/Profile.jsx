import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/UserContext';
import { uploads } from '../../utils/uploads';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [preview, setPreview] = useState(null);

    const { user } = useContext(Context);
    const { updateProfile, isUpdating } = useUpdateProfile();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user])

    const handleProfile = async (e) => {
        e.preventDefault();

        const profileData = new FormData();

        profileData.append('name', name);
        profileData.append('email', email);

        if (preview) {
            profileData.append('profileImage', preview);
        }

        if (password && confirmPassword) {
            profileData.append('password', password);
            profileData.append('confirmPassword', confirmPassword);
        }

        try {
            await updateProfile(user._id, profileData);
        } catch (error) {
            console.error("Erro ao atualizar o perfil:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(file);
        }
    };

    const profileImagePath = user && user.profileImage
        ? `${uploads}/users/${user.profileImage}`
        : '';

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-6 border-form">
                    <h1 className='mb-5 text-center'>Atualizar o perfil:</h1>
                    <div className="d-flex justify-content-center align-items-center">
                        <img
                            src={
                                preview
                                    ? URL.createObjectURL(preview)
                                    : profileImagePath
                            }
                            alt={user?.name || 'Profile Image'}
                            className='img-fluid img-profile mb-3'
                        />
                    </div>
                    <form onSubmit={handleProfile}>
                        <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                            <div className={`container-form mb-5 ${name ? 'has-content' : ''}`}>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-form"
                                    value={name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <label className="label-form">Nome</label>
                            </div>
                            <div className={`container-form mb-5 ${email ? 'has-content' : ''}`}>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-form"
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="label-form">E-mail</label>
                            </div>
                            <div className={`container-form mb-5 ${password ? 'has-content' : ''}`}>
                                <input
                                    type="password"
                                    name="password"
                                    className="input-form"
                                    value={password || ""}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="label-form">Senha</label>
                            </div>
                            <div className={`container-form mb-5 ${confirmPassword ? 'has-content' : ''}`}>
                                <input
                                    type="password"
                                    name="confirmPassowrd"
                                    className="input-form"
                                    value={confirmPassword || ""}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label className="label-form">Confirme a Senha</label>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <input
                                    type="submit"
                                    className="my-2 input-button"
                                    value="Atualizar"
                                    disabled={isUpdating}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile