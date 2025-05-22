// components/LoadingOverlay.jsx
import React from 'react';

const LoadingOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>
);

export default LoadingOverlay;
