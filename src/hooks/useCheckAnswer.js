import { useState } from 'react';
import api from '../utils/api';

const useCheckAnswer = () => {
    const [isCorrect, setIsCorrect] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkAnswer = async (questionId, selectedAlternativeIndex) => {
        setIsLoading(true);
        try {
            const response = await api.post(`/api/question/check/${questionId}`, {
                selectedAlternativeIndex,
            });
            setIsCorrect(response.data.isCorrect);
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao verificar a resposta');
        } finally {
            setIsLoading(false);
        }
    };

    return { checkAnswer, isCorrect, isLoading, error };
};

export default useCheckAnswer;
