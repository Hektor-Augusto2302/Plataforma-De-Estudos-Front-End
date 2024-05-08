import './Questions.css';
import { useState, useEffect } from 'react';
import { useGetQuestions } from '../../hooks/useGetQuestions';
import QuestionsController from './components/QuestionsController';

const Questions = () => {
    const [selectedPhase, setSelectedPhase] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const { questions, isLoading, error } = useGetQuestions();

    useEffect(() => {
        if (selectedPhase) {
            if (selectedPhase === 'todos') {
                setFilteredQuestions(questions);
            } else {
                const phaseQuestions = questions.filter((q) => q.phase === selectedPhase); // Filtra por fase
                setFilteredQuestions(phaseQuestions);
            }
        }
    }, [selectedPhase, questions]);

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-10">
                    <form className="mt-5 title-history d-flex flex-column flex-md-row justify-content-center align-items-center">
                        <h3 className="me-3 text-center">Escolha o período histórico para fazer o simulado:</h3>
                        <select
                            className="form-select form-width-select"
                            value={selectedPhase}
                            onChange={(e) => setSelectedPhase(e.target.value)}
                        >
                            <option value="">Selecione um período...</option>
                            <option value="todos">Todos</option>
                            <option value="Era Napoleônica">Era Napoleônica</option>
                            <option value="Independência do Brasil">Independência do Brasil</option>
                            <option value="Era da Vacina">Era da Vacina</option>
                            <option value="Época da Escravidão">Época da Escravidão</option>
                        </select>
                    </form>
                </div>
                <div className="col-12 col-md-10 mt-5">
                    {isLoading ? (
                        <div>Carregando perguntas...</div>
                    ) : error ? (
                        <div>Erro ao carregar perguntas: {error}</div>
                    ) : selectedPhase === '' ? (
                        <div>Por favor, selecione um período para fazer as perguntas.</div>
                    ) : (
                        <QuestionsController questions={filteredQuestions} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Questions;