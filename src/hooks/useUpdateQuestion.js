import { useState } from 'react';
import api from '../utils/api';
import useFlashMessage from './useFlashMessage';

export const useUpdateQuestion = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const { setFlashMessage } = useFlashMessage();

    const updateQuestion = async (id, updatedQuestion) => {
        setIsUpdating(true);

        try {
            const response = await api.put(`/api/question/update/${id}`, updatedQuestion);
            setFlashMessage('Questão atualizada com sucesso!', 'success');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.errors || 'Erro ao atualizar a questão';
            setFlashMessage(errorMessage, 'error');
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateQuestion, isUpdating };
};