import { useState } from 'react';
import api from '../utils/api';
import useFlashMessage from './useFlashMessage';

export const useUpdateProfile = () => {
    const { setFlashMessage } = useFlashMessage();
    const [isUpdating, setIsUpdating] = useState(false);

    const updateProfile = async (userId, profileData) => {
        setIsUpdating(true);

        try {
            const response = await api.put(`/api/users/${userId}`, profileData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setFlashMessage('Perfil atualizado com sucesso!', 'success');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.errors || 'Erro ao atualizar o perfil';
            setFlashMessage(errorMessage, 'error');
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateProfile, isUpdating };
};
