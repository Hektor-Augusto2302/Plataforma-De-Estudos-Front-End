import { useEffect, useState } from 'react';
import api from '../utils/api';
import useFlashMessage from './useFlashMessage';

export const useLikeQuestion = () => {
    const [isLiking, setIsLiking] = useState(false);
    const [likedQuestions, setLikedQuestions] = useState(() => {
        const savedLikes = localStorage.getItem('likedQuestions');
        return savedLikes ? JSON.parse(savedLikes) : [];
    });

    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        localStorage.setItem('likedQuestions', JSON.stringify(likedQuestions));
    }, [likedQuestions]);

    const likeQuestion = async (id) => {
        setIsLiking(true);

        try {
            const response = await api.patch(`/api/question/like/${id}`);
            setLikedQuestions(prev => [...prev, id]);
            setFlashMessage('Questão curtida com sucesso!', 'success');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.errors || 'Erro ao curtir a questão';
            setFlashMessage(errorMessage, 'error');
            throw error;
        } finally {
            setIsLiking(false);
        }
    };

    return { likeQuestion, isLiking, likedQuestions };
};