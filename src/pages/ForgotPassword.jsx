import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Enviar enlace de recuperación a: ${email}`);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
          Recover Password
        </h2>
        {submitted ? (
          <p className="text-center text-green-400">
            If the email exists, a recovery link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded text-white font-semibold hover:opacity-90 transition"
            >
              Send Recovery Link
            </button>
          </form>
        )}
        <p className="text-sm text-center mt-4">
          <Link to="/login" className="text-purple-400 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;