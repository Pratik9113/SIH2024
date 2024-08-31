import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../../context/StoreContext';
import { toast } from 'react-toastify';

const InfoSections = ({ id }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [apiEndPoint, setApiEndPoint] = useState('');
  const [navi, setNavi] = useState('');
  const { setToken, setEmail } = useContext(StoreContext);

  const handleClick = (value, endpoint, navigationPath) => {
    setModalContent(value);
    setShowLoginModal(true);
    setApiEndPoint(endpoint);
    setNavi(navigationPath);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div>
      <div className="bg-slate-100 flex justify-center py-5 text-4xl font-bold">
        <h1>Our Services</h1>
      </div>
      <div id={id} className="flex space-x-4 bg-slate-100 px-16">
        <Card
          img="https://img.freepik.com/free-vector/man-red-shirt-with-white-collar_90220-2873.jpg"
          name="Undertrial Prisoners"
          onClick={() => handleClick("Undertrial Prisoner", "http://localhost:3000/prisoner/login", "/utp")}
        />
        <Card
          img="https://img.freepik.com/premium-vector/blue-gold-sign-that-says-symbol-justice_1205884-833.jpg"
          name="Lawyers"
          onClick={() => handleClick("Lawyer", "http://localhost:3000/lawyer/login", "/lawyer")}
        />
        <Card
          img="https://img.freepik.com/free-photo/closeup-gavel-judgement-concept_53876-31913.jpg"
          name="Judges"
          onClick={() => handleClick("Judge", "http://localhost:3000/judge/login", "/judge")}
        />
      </div>

      {showLoginModal && (
        <LoginModal
          title={`${modalContent} Login`}
          onClose={handleCloseModal}
          apiEndPoint={apiEndPoint}
          navi={navi}
          setToken={setToken}
          setEmail={setEmail}
        />
      )}
    </div>
  );
};

const Card = ({ img, name, onClick }) => {
  return (
    <div
      className="flex-1 bg-[#03346E] text-white flex flex-col items-center justify-center h-96 transition duration-300 ease-in-out hover:scale-105 rounded-xl cursor-pointer"
      onClick={onClick}
    >
      <img
        src={img}
        alt={name}
        className="w-40 h-auto max-w-sm mb-6 rounded-lg"
      />
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="mb-6">You can login from here</p>
      <button
        className="bg-white text-[#2B4C65] py-2 px-4 rounded-full font-bold hover:bg-[#1c3449] hover:text-white"
      >
        {name}'s Login
      </button>
    </div>
  );
};

const LoginModal = ({ title, onClose, apiEndPoint, navi, setToken, setEmail }) => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const navigate = useNavigate();
  const [email_id, setEmail_id] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(apiEndPoint, { email_id, password }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status_code === 200) {
        const { token } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('email_id', email_id);
        setToken(token);
        setEmail(email_id);
        toast.success("Login successful!");
        onClose();
        navigate(navi);
      } else {
        toast.error(response.data.status || "Login failed.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="font-semibold">Email:</span>
            <input
              type="text"
              value={email_id}
              onChange={(e) => setEmail_id(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold">Password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-[#03346E] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#1f5291] transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoSections;
