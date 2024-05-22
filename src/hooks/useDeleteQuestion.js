import { useState } from 'react';
import api from '../utils/api';
import useFlashMessage from './useFlashMessage';

export const useDeleteQuestion = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const { setFlashMessage } = useFlashMessage();

    const deleteQuestion = async (id) => {
        setIsDeleting(true);

        try {
            const response = await api.delete(`/api/question/${id}`);
            setFlashMessage('Questão excluída com sucesso!', 'success');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.errors || 'Erro ao excluir a questão';
            setFlashMessage(errorMessage, 'error');
            throw error;
        } finally {
            setIsDeleting(false);
        }
    };

    return { deleteQuestion, isDeleting };
};