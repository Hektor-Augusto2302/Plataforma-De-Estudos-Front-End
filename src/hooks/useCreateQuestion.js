import { useState } from 'react';
import api from '../utils/api';
import useFlashMessage from './useFlashMessage';

export const useCreateQuestion = () => {
    const [isCreating, setIsCreating] = useState(false);
    const { setFlashMessage } = useFlashMessage();

    const createQuestion = async (questionData) => {
        setIsCreating(true);

        try {
            const response = await api.post('/api/question/create', questionData);
            setFlashMessage('Questão criada com sucesso!', 'success');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.errors || 'Erro ao criar a questão';
            setFlashMessage(errorMessage, 'error');
            throw error;
        } finally {
            setIsCreating(false);
        };
    };

    return { createQuestion, isCreating };
};
