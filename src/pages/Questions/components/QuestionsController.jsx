import React, { useState } from 'react';
import useCheckAnswer from '../../../hooks/useCheckAnswer';

const QuestionsController = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);

    const { checkAnswer, isCorrect, isLoading } = useCheckAnswer();

    if (!questions || questions.length === 0) {
        return <div>Não há perguntas disponíveis.</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerClick = async (index) => {
        await checkAnswer(currentQuestion._id, index);
        setIsAnswered(true);
    };

    const handleNextQuestion = () => {
        setIsAnswered(false);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log("Fim das perguntas.");
        }
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
                                    <h5 className="card-title mb-5">{currentQuestion.question}</h5>
                                    <div className="card-text">
                                        <ul className="mt-3">
                                            {currentQuestion.alternatives.map((alt, index) => (
                                                <li className="mb-3" key={index}>
                                                    <button
                                                        className="btn btn-outline-primary"
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
                                            {isCorrect
                                                ? "Resposta correta!"
                                                : "Resposta incorreta."}
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
