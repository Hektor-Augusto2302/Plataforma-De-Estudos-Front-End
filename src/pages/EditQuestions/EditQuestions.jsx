import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateQuestion } from '../../hooks/useUpdateQuestion';

const EditQuestions = () => {
    const { state } = useLocation();
    const { question } = state;
    const navigate = useNavigate();

    const [questionText, setQuestionText] = useState('');
    const [alternatives, setAlternatives] = useState('');
    const [correctAlternativeIndex, setCorrectAlternativeIndex] = useState(0);
    const [phase, setPhase] = useState('');

    const { updateQuestion, isUpdating } = useUpdateQuestion();

    useEffect(() => {
        if (question) {
            setQuestionText(question.question);
            setAlternatives(question.alternatives.join(', '));
            setCorrectAlternativeIndex(question.correctAlternativeIndex);
            setPhase(question.phase);
        }
    }, [question]);

    const handleEditQuestion = async (e) => {
        e.preventDefault();

        const updatedQuestion = {
            question: questionText,
            alternatives: alternatives.split(',').map(alt => alt.trim()),
            correctAlternativeIndex,
            phase,
        };

        try {
            await updateQuestion(question._id, updatedQuestion);
            navigate('/questoes');
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="container mt-5"
        >
            <div className="row justify-content-center">
                <div className="col-6 border-form">
                    <h1 className='mb-5 text-center'>Editar Questões:</h1>
                    <form onSubmit={handleEditQuestion}>
                        <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                            <div className={`container-form mb-5 ${questionText ? 'has-content' : ''}`}>
                                <textarea
                                    name="question"
                                    className="input-form"
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    required
                                />
                                <label className="label-form">Edite a pergunta</label>
                            </div>
                            <div className={`container-form mb-5 ${alternatives ? 'has-content' : ''}`}>
                                <input
                                    type="text"
                                    name="alternatives"
                                    className="input-form"
                                    value={alternatives}
                                    onChange={(e) => setAlternatives(e.target.value)}
                                    required
                                />
                                <label className="label-form">Edite as alternativas (separadas por vírgulas)</label>
                            </div>
                            <div className={`container-form mb-5 ${correctAlternativeIndex !== null ? 'has-content' : ''}`}>
                                <input
                                    type="number"
                                    name="correctAlternativeIndex"
                                    className="input-form"
                                    value={correctAlternativeIndex}
                                    onChange={(e) => setCorrectAlternativeIndex(Number(e.target.value))}
                                    required
                                />
                                <label className="label-form">Edite a alternativa correta (0-3)</label>
                            </div>
                            <div className={`container-form mb-5 ${phase ? 'has-content' : ''}`}>
                                <input
                                    type="text"
                                    name="phase"
                                    className="input-form"
                                    value={phase}
                                    onChange={(e) => setPhase(e.target.value)}
                                    required
                                />
                                <label className="label-form">Edite o período histórico</label>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <input
                                    type="submit"
                                    className="my-2 input-button"
                                    value="Editar Questão"
                                    disabled={isUpdating}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default EditQuestions;
