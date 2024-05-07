import { useEffect, useState } from 'react';
import api from '../utils/api';

export const useGetQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get('/api/question/');
                setQuestions(response.data.questions);
                setIsLoading(false);
            } catch (err) {
                setError(err.message || 'Erro ao obter questões');
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    return { questions, isLoading, error };
};