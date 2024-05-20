import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const EditQuestions = () => {

    const [question, setQuestion] = useState('');
    const [alternatives, setAlternatives] = useState(['', '', '', '']);
    const [correctAlternativeIndex, setCorrectAlternativeIndex] = useState(0);
    const [phase, setPhase] = useState('');

    const { id } = useParams();

    console.log('ID da questão:', id);

    const handleEditQuestion = async (e) => {
        e.preventDefault();
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
                            <div className={`container-form mb-5 ${question ? 'has-content' : ''}`}>
                                <textarea
                                    type="text"
                                    name="question"
                                    className="input-form"
                                    value={question || ""}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    required
                                />
                                <label className="label-form">Edite a pergunta</label>
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
                                <label className="label-form">Edite as alternativas</label>
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
                                <label className="label-form">Edite a alternativa correta</label>
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
                                <label className="label-form">Edite o periodo historico</label>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <input
                                    type="submit"
                                    className="my-2 input-button"
                                    value="Editar Questão"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default EditQuestions