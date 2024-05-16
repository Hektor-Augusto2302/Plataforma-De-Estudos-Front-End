import { useEffect, useState } from 'react';
import api from '../utils/api';

export const useGetQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
            }

            try {
                const response = await api.get('/api/question/');
                setQuestions(response.data.questions || []);
                setIsLoading(false);
            } catch (err) {
                setError(err.message || 'Erro ao obter questões');
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const getUserStats = (currentUserId) => {
        let correctCount = 0;
        let incorrectCount = 0;

        questions.forEach(question => {
            question.userAnswers.forEach(answer => {
                if (answer.userId === currentUserId) {
                    if (answer.isCorrect) {
                        correctCount++;
                    } else {
                        incorrectCount++;
                    }
                }
            });
        });

        return { correctCount, incorrectCount };
    };

    return { questions, isLoading, error, getUserStats };
};