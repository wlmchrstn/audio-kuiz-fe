import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/landing/landing';
import StudentRegisterPage from '../pages/student-register/student-register';
import StudentPage from '../pages/student/student';
import StudentExamPage from '../pages/student-exam/student-exam';
import TeacherLoginPage from '../pages/teacher-login/teacher-login';
import TeacherRegisterPage from '../pages/teacher-register/teacher-register.js';
import TeacherPage from '../pages/teacher/teacher';
import ExamPage from '../pages/exam/exam';
import ExamEditPage from '../pages/exam-edit/exam-edit';
import Custom404 from '../pages/custom404/custom404';
import UserPage from '../pages/user/user';

const Router = () => {
    return (
        <Routes>
            <Route path={'/'} element={<LandingPage />} />
            <Route path={'/student-register'} element={<StudentRegisterPage />} />
            <Route path={'/student'} element={<StudentPage />} />
            <Route path={'/student/exam'} element={<StudentExamPage />} />
            <Route path={'/teacher-login'} element={<TeacherLoginPage />} />
            <Route path={'/teacher-register'} element={<TeacherRegisterPage />} />
            <Route path={'/teacher'} element={<TeacherPage />} />
            <Route path={'/exam/:id'} element={<ExamPage />} />
            <Route path={'/exam-edit/:id'} element={<ExamEditPage />} />
            <Route path={'/user'} element={<UserPage />} />
            <Route path={'*'} element={<Custom404 />} />
        </Routes>
    );
};

export default Router;
