import React, { useState } from 'react';
import { useStateContext } from 'contexts/ContextProvider';

const AuthenticationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useStateContext();
    const [showContactAdmin, setShowContactAdmin] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
    };

    const handleForgotPasswordClick = () => {
        setShowContactAdmin((prevState) => !prevState);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800">Войти в ваш аккаунт</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Имя пользователя</label>
                        <input
                            id="username"
                            type="text"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Введите ваше имя пользователя"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Введите ваш пароль"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Войти
                        </button>
                    </div>
                    <div className="text-sm text-center">
                        <button
                            type="button"
                            onClick={handleForgotPasswordClick}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Забыли пароль?
                        </button>
                        {showContactAdmin && (
                            <p className="text-xs text-gray-600 mt-2">Если у вас возникли проблемы со входом в систему, обратитесь к администратору.</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthenticationPage;
