import './QuestionsController.css';
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import useCheckAnswer from '../../../hooks/useCheckAnswer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useDeleteQuestion } from '../../../hooks/useDeleteQuestion';
import { useLikeQuestion } from '../../../hooks/useLikeQuestion';
import Background from '../../../assets/img/background2.png';

const QuestionsController = ({ questions, onQuizReset }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();
    const { checkAnswer, isLoading } = useCheckAnswer();
    const { deleteQuestion } = useDeleteQuestion();
    const { likeQuestion, likedQuestions } = useLikeQuestion();

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

    const handleEditClick = (question) => {
        navigate(`/admin/questoes/${question._id}`, { state: { question } });
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta questão?')) {
            await deleteQuestion(id);
            onQuizReset();
        }
    };

    const handleLikeClick = async (id) => {
        await likeQuestion(id);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
    };

    const isQuestionLiked = likedQuestions.includes(currentQuestion._id);

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const margin = 10;
        let yPosition = margin;

        const addBackgroundImage = (doc, imgData) => {
            doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        };

        const img = new Image();
        img.src = Background;
        img.onload = () => {
            addBackgroundImage(doc, img.src);

            doc.text('Simulado de História do Brasil', margin, yPosition);
            yPosition += 10;

            questions.forEach((question, questionIndex) => {
                const questionLines = doc.splitTextToSize(`${questionIndex + 1}. ${question.question}`, 180);

                if (yPosition + questionLines.length * 10 > pageHeight - margin) {
                    doc.addPage();
                    addBackgroundImage(doc, img.src);
                    yPosition = margin;
                }

                doc.text(questionLines, margin, yPosition);
                yPosition += questionLines.length * 10;

                const alternativesLetters = ['a', 'b', 'c', 'd'];

                question.alternatives.forEach((alt, altIndex) => {
                    const altText = `${alternativesLetters[altIndex]}. ${alt}`;
                    const altLines = doc.splitTextToSize(altText, 170);

                    if (yPosition + altLines.length * 10 > pageHeight - margin) {
                        doc.addPage();
                        addBackgroundImage(doc, img.src);
                        yPosition = margin;
                    }

                    doc.text(altLines, margin + 5, yPosition);
                    yPosition += altLines.length * 10;
                });

                yPosition += 10;
            });

            doc.save('simulado.pdf');
        };
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
                                            {user && user.role === 'admin' && (
                                                <>
                                                    <span className='me-2'>
                                                        <i className="bi bi-pencil-square" onClick={() => handleEditClick(currentQuestion)}></i>
                                                    </span>
                                                    <span className='me-2'>
                                                        <i className="bi bi-trash3-fill" onClick={() => handleDeleteClick(currentQuestion._id)}></i>
                                                    </span>
                                                </>
                                            )}
                                            <span className={`me-2 ${isAnimating ? 'like-animation' : ''}`}>
                                                <i className={`bi bi-heart${isQuestionLiked ? '-fill' : ''}`} onClick={() => handleLikeClick(currentQuestion._id)}></i>
                                            </span>
                                            <span className='me-2'>
                                                <i className='bi bi-filetype-pdf' onClick={generatePDF}></i>
                                            </span>
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