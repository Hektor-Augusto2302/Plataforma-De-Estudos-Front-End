const CardStats = ({ title, count }) => {
    return (
        <div className="card bg-dark d-flex flex-column justify-content-center align-items-center"
            style={{ width: "10rem", height: "10rem", margin: "0 1rem" }}
        >
            <div className="card-body d-flex flex-column align-items-center justify-content-between">
                <span className=""><i className="bi bi-bar-chart-line-fill"></i></span>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{count}</p>
            </div>
        </div>
    );
}

export default CardStats;