import './Questions.css';

const Questions = () => {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-10">
                    <form className='mt-5 title-history d-flex flex-column flex-md-row justify-content-center align-items-center'> {/* Flex para responsividade */}
                        <h3 className='me-3 text-center'>Escolha o período histórico para fazer o simulado:</h3>
                        <select className="form-select form-width-select" aria-label="Seleção de período">
                            <option value="todos" selected>Todos</option>
                            <option value="one">Um</option>
                            <option value="two">Dois</option>
                            <option value="three">Três</option>
                        </select>
                    </form>
                </div>
                <div className="col-12 col-md-10 mt-5">
                    <h1>Teste</h1>
                </div>
            </div>
        </div>
    );
};

export default Questions;