import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ code = '500', msg1 = 'Some thing went wrong :(.', msg2 = 'Internal Server Error' }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4 bg-white">
            <h1 className="text-6xl font-bold text-red-500">{code}</h1>
            <p className="mt-4 text-lg text-gray-600">
                {msg1}
            </p>
            <p className="mt-2 text-gray-500">
                {msg2}
            </p>
            <Link to="/"
                className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Go back to homepage
            </Link>
        </div>
    );
};

export default ErrorPage;
