import { useState } from 'react';
import { useCreateQuestion } from '../../hooks/useCreateQuestion';
import { motion } from 'framer-motion';
import useFlashMessage from '../../hooks/useFlashMessage';

const RegisterQuestion = () => {

    const { createQuestion } = useCreateQuestion();
    const { setFlashMessage } = useFlashMessage();

    const [question, setQuestion] = useState('');
    const [alternatives, setAlternatives] = useState(['', '', '', '']);
    const [correctAlternativeIndex, setCorrectAlternativeIndex] = useState(0);
    const [phase, setPhase] = useState('');

    const handleQuestion = async (e) => {
        e.preventDefault();

        if (
            isNaN(correctAlternativeIndex) ||
            correctAlternativeIndex < 0 ||
            correctAlternativeIndex >= alternatives.length
        ) {
            setFlashMessage('Índice da alternativa correta inválido', 'error');
            return;
        };

        const questionData = {
            question,
            alternatives: alternatives.split(',').map((alt) => alt.trim()),
            correctAlternativeIndex: parseInt(correctAlternativeIndex),
            phase,
        };

        try {
            await createQuestion(questionData);
            setFlashMessage(`Questão criada com sucesso!`, 'success');
        } catch (error) {
            console.error('Erro ao criar a questão:', error);
        };
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
                    <h1 className='mb-5 text-center'>Registrar Questões:</h1>
                    <form onSubmit={handleQuestion}>
                        <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                            <div className={`container-form mb-5 ${question ? 'has-content' : ''}`}>
                                <textarea
                                    type="text"
                                    name="question"
                                    className="input-form"
                                    value={question || ""}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    required
                                />
                                <label className="label-form">Digite a pergunta</label>
                            </div>
                            <div className={`container-form mb-5 ${alternatives ? 'has-content' : ''}`}>
                                <input
                                    type="text"
                                    name="alternatives"
                                    className="input-form"
                                    value={alternatives || ""}
                                    onChange={(e) => setAlternatives(e.target.value)}
                                    required
                                />
                                <label className="label-form">Digite as alternativas</label>
                            </div>
                            <div className={`container-form mb-5 ${correctAlternativeIndex ? 'has-content' : ''}`}>
                                <input
                                    type="text"
                                    name="correctAlternativeIndex"
                                    className="input-form"
                                    value={correctAlternativeIndex || ""}
                                    onChange={(e) => setCorrectAlternativeIndex(e.target.value)}
                                    required
                                />
                                <label className="label-form">Digite a alternativa correta</label>
                            </div>
                            <div className={`container-form mb-5 ${phase ? 'has-content' : ''}`}>
                                <input
                                    type="text"
                                    name="phase"
                                    className="input-form"
                                    value={phase || ""}
                                    onChange={(e) => setPhase(e.target.value)}
                                    required
                                />
                                <label className="label-form">Qual o periodo historico</label>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <input
                                    type="submit"
                                    className="my-2 input-button"
                                    value="Registrar Questão"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default RegisterQuestion