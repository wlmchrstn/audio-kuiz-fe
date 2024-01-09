import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/landing/landing';
import TeacherLoginPage from '../pages/teacher-login/teacher-login';
import TeacherPage from '../pages/teacher/teacher';
import TeacherPasswordPage from '../pages/teacher-password/teacher-password';
import StudentPage from '../pages/student/student';
import StudentLoginPage from '../pages/student-login/student-login';
import StudentExamPage from '../pages/student-exam/student-exam';
import StudentExamResultPage from '../pages/student-exam-result/student-exam-result';
import ExamEditPage from '../pages/exam-edit/exam-edit';
import ExamResultPage from '../pages/exam-result/exam-result';
import AdminLoginPage from '../pages/admin-login/admin-login';
import AdminPage from '../pages/admin/admin';
import VerifyAccountPage from '../pages/verify-account/verify-account';
import Custom404 from '../pages/custom404/custom404';

const Router = () => {
  return (
    <Routes>
      <Route path={'/'} element={<LandingPage />} />
      <Route path={'/teacher-login'} element={<TeacherLoginPage />} />
      <Route path={'/teacher'} element={<TeacherPage />} />
      <Route path={'/teacher-password/:teacher_id'} element={<TeacherPasswordPage />} />
      <Route path={'/student-login'} element={<StudentLoginPage />} />
      <Route path={'/student'} element={<StudentPage />} />
      <Route path={'/student/exam/:exam_code'} element={<StudentExamPage />} />
      <Route path={'/student-result/:exam_result_id'} element={<StudentExamResultPage />} />
      <Route path={'/exam-edit/:id'} element={<ExamEditPage />} />
      <Route path={'/exam-result/:exam_result_id'} element={<ExamResultPage />} />
      <Route path={'/admin-login'} element={<AdminLoginPage />} />
      <Route path={'/admin'} element={<AdminPage />} />
      <Route path={'/verify-account/:id'} element={<VerifyAccountPage />} />
      <Route path={'*'} element={<Custom404 />} />
    </Routes>
  );
};

export default Router;
