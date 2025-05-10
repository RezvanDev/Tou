import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Globe } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      
      // Перенаправление после успешного входа
      if (redirectTo) {
        navigate(`/${redirectTo}`);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Ошибка при входе. Проверьте ваши данные.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-beige-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center">
            <Globe className="w-10 h-10 text-terracotta-500" />
            <span className="ml-2 text-2xl font-montserrat font-bold">
              <span className="text-blue-500">Guide</span>
              <span className="text-terracotta-500">Uz</span>
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Вход в аккаунт
          </h2>
          <p className="mt-2 text-gray-600">
            Войдите, чтобы продолжить бронирование и управлять своими экскурсиями
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                Забыли пароль?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Еще нет аккаунта?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-600 font-medium">
              Зарегистрируйтесь
            </Link>
          </p>
        

        
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;