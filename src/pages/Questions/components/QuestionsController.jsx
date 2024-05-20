import './QuestionsController.css';
import { useState } from 'react';
import useCheckAnswer from '../../../hooks/useCheckAnswer';
import { useNavigate } from 'react-router-dom';

const QuestionsController = ({ questions, onQuizReset }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const navigate = useNavigate();

    const { checkAnswer, isLoading } = useCheckAnswer();

    if (!questions || questions.length === 0) {
        return <div>Não há perguntas disponíveis.</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerClick = async (index) => {
        setSelectedOptionIndex(index);
        setIsAnswered(true);
        await checkAnswer(currentQuestion._id, index);
    };

    const handleNextQuestion = () => {
        setIsAnswered(false);
        setSelectedOptionIndex(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            onQuizReset();
        }
    };

    const handleEditClick = (questionId) => {
        navigate(`/admin/questoes/${questionId}`);
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 mb-3">
                    <div className="card bg-dark">
                        <div className="card-body">
                            {isLoading ? (
                                <div>Verificando resposta...</div>
                            ) : (
                                <>
                                    <div className='d-flex align-items-center justify-content-between mb-3'>
                                        <div></div>
                                        <div className='me-5 icons'>
                                            <span className='me-2' onClick={() => handleEditClick(currentQuestion._id)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </span>
                                            <span className='me-2'><i className="bi bi-trash3-fill"></i></span>
                                            <span className='me-2'><i className="bi bi-heart"></i></span>
                                        </div>
                                    </div>
                                    <h5 className="card-title mb-5">{currentQuestion.question}</h5>
                                    <div className="card-text">
                                        <ul className="mt-3 p-0 d-flex flex-column align-items-center">
                                            {currentQuestion.alternatives.map((alt, index) => (
                                                <li className="mb-3 alternatives-li" key={index}>
                                                    <button
                                                        className={`btn ${selectedOptionIndex === index
                                                            ? isAnswered
                                                                ? index === currentQuestion.correctAlternativeIndex
                                                                    ? 'btn-success'
                                                                    : 'btn-danger'
                                                                : ''
                                                            : isAnswered && index === currentQuestion.correctAlternativeIndex && selectedOptionIndex !== index
                                                                ? 'btn-success'
                                                                : 'btn-outline-primary'
                                                            } ${selectedOptionIndex === index ? 'btn-no-outline' : ''}`}
                                                        onClick={() => handleAnswerClick(index)}
                                                        disabled={isAnswered}
                                                    >
                                                        {alt}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {isAnswered && (
                                        <div>
                                            <button
                                                className="btn btn-primary mt-3"
                                                onClick={handleNextQuestion}
                                            >
                                                Próxima pergunta
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsController;