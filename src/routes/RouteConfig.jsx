import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Login from '../components/auth/Login';
import Layout from '../components/shared/Layout';
import Dashboard from '../components/dashboard/Dashboard';
import QuestionsBank from '../components/questionBank/QuestionsBank';
import ManualQuestions from '../components/ManualQuestions';
import AddManualQuestion from '../components/questionBank/AddManualQuestion';
import CurriculumUpdates from '../components/Curriculum/CurriculumUpdates';
import Poc from '../components/poc/Poc';
import CurriculumList from '../components/Curriculum/CurriculumList';
import RequireAuth from './RequireAuth';
import { setToken } from '../redux/slice/AuthSlice';
import GenerateQuestion from '../components/questionBank/GenerateQuestion';

const RouteConfig = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const sessionToken = localStorage.getItem("token");
        if (sessionToken && !token) {
            dispatch(setToken(sessionToken)); // Sync Redux with localStorage token
        }
    }, [dispatch, token]);

    return (
        <Router>
            <Routes>
                {/* Public Route (Login Page) */}
                <Route path="/" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/questionsbank" element={<QuestionsBank />} />
                        <Route path="/questionsbank/addmanual" element={<AddManualQuestion />} />
                        <Route path="/curriculum" element={<CurriculumList />} />
                        <Route path="/curriculum/curriculumupdates" element={<CurriculumUpdates />} />
                        <Route path="/poc" element={<Poc />} />
                        <Route path="/manualquestions" element={<ManualQuestions />} />
                        <Route path="/questionsbank/generate-question" element={<GenerateQuestion />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};


export default RouteConfig;
