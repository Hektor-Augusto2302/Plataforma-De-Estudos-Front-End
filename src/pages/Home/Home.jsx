import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGetQuestions } from '../../hooks/useGetQuestions';
import { motion } from 'framer-motion';
import Chart from 'chart.js/auto';
import CardStats from './components/CardStats';
import './Home.css';

const Home = () => {
    const { isLoading, error, getUserStats } = useGetQuestions();
    const { user } = useAuth();
    const currentUserId = user ? user._id : null;

    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const chartRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            const { correctCount, incorrectCount } = await getUserStats(currentUserId);
            setCorrectCount(correctCount);
            setIncorrectCount(incorrectCount);
        };

        fetchData();
    }, [currentUserId, getUserStats]);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        if (correctCount !== 0 || incorrectCount !== 0) {
            createPieChart(correctCount, incorrectCount);
        }
    }, [correctCount, incorrectCount]);

    const createPieChart = (correctCount, incorrectCount) => {
        const ctx = document.getElementById('pieChart');
        const pieChartData = {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                label: 'Estatísticas',
                data: [correctCount, incorrectCount],
                backgroundColor: [
                    'rgb(0, 250, 154)',
                    'rgb(178, 34, 34)'
                ],
                hoverOffset: 4
            }]
        };

        const pieChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };

        const newChart = new Chart(ctx, {
            type: 'doughnut',
            data: pieChartData,
            options: pieChartOptions
        });

        chartRef.current = newChart;
    };

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="container mt-5"
        >
            <div className="d-flex justify-content-center">
                <CardStats title="Acertos" count={correctCount} />
                <CardStats title="Erros" count={incorrectCount} />
            </div>
            <div className="d-flex justify-content-center mt-3">
                <canvas id="pieChart" width="400" height="400"></canvas>
            </div>
        </motion.div>
    );
}

export default Home;