import { useState } from 'react';
import api from '../utils/api';

export const useGetQuestionsByPhase = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getQuestionsByPhase = async (phase) => {
        setIsLoading(true);

        try {
            const response = await api.get(`/api/questions/byPhase?phase=${phase}`);
            setQuestions(response.data.questions);
            setIsLoading(false);
        } catch (err) {
            setError(err.message || 'Erro ao obter questões por fase');
            setIsLoading(false);
        }
    };

    return { questions, isLoading, error, getQuestionsByPhase };
};
