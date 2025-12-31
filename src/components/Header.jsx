import React from 'react';

function Header() {
    return (
        <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-50 shadow-2xl">
            <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-50 to-amber-200">
                        History Pedia
                    </h1>
                </div>
                <p className="text-center mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-amber-200 font-light tracking-wide">
                    Jelajahi Sejarah dengan AI
                </p>
            </div>
        </header>
    );
}

export default Header;