import { useAuth } from '../../hooks/useAuth';
import { useGetQuestions } from '../../hooks/useGetQuestions';
import './Home.css';

const Home = () => {
    const { isLoading, error, getUserStats } = useGetQuestions();
    const { user } = useAuth();

    const currentUserId = user ? user._id : null;

    const { correctCount, incorrectCount } = getUserStats(currentUserId);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div className="home">
            <h1>Home</h1>
            <div>
                <h2>Estatísticas do Usuário</h2>
                <p>Questões Respondidas Corretamente: {correctCount}</p>
                <p>Questões Respondidas Incorretamente: {incorrectCount}</p>
            </div>
        </div>
    );
}

export default Home