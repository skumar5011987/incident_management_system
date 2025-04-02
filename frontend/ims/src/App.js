
// import './App.css';
import { AuthProvider } from './context/authContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { ForgetPasswordForm } from './components/forgetPassword';
import { Dashboard } from './components/dashboard';
import PrivateRoute from './middleware/privateRoute';
import { ForgetPasswordConfirmForm } from './components/forgetPasswordConfirm';
import IncidentCreate from './components/createIncident';
import IncidentUpdate from './components/updateIncident';
import { IncidentDetails } from './components/incident';
// import LoginSignUpForm from './components/loginSignUpForm';
import AuthForm from './components/auth';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* <Route path='/' element={<LoginSignUpForm />} /> */}
        <Route path='/' element={<AuthForm />} />
        <Route path='/forgot-password' element={<ForgetPasswordForm />} />
        <Route path='/forget-password-confirm' element={<ForgetPasswordConfirmForm />} />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path='/incident/new' element={
          <PrivateRoute>
            <IncidentCreate />
          </PrivateRoute>
        } />
        <Route path="/incident/:incident_id/edit" element={
          <PrivateRoute>
            <IncidentUpdate />
          </PrivateRoute>
        } />
        <Route path="/incident/:incident_id/view" element={
          <PrivateRoute>
            <IncidentDetails />
          </PrivateRoute>
        } />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
