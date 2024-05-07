import React, { useState } from 'react';

const QuestionsController = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    if (!questions || questions.length === 0) {
        return <div>Não há perguntas disponíveis.</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleNextQuestion = () => {
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
                            {currentQuestion ? (
                                <>
                                    <h5 className="card-title mb-5">{currentQuestion.question}</h5>
                                    <p className="card-text">
                                        <ul className='mt-3'>
                                            {currentQuestion.alternatives.map((alt, index) => (
                                                <li className='mb-3' key={index}>
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={handleNextQuestion}
                                                    >
                                                        {alt}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </p>
                                </>
                            ) : (
                                <div>Informações da questão não disponíveis</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsController;
