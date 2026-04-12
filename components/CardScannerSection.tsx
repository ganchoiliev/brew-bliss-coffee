import React from 'react';
import CardScanner from './CardScanner';

const CardScannerSection: React.FC = () => {
    return (
        <section className="relative bg-[#150810] py-12">
            {/* Heading Section */}
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Stop Settling for
                    <br />
                    <span className="bg-gradient-to-r from-[#F472B6] via-[#FB7185] to-[#F472B6] bg-clip-text text-transparent">
                        Boring Coffee
                    </span>
                </h2>
                <p className="text-xl md:text-2xl text-[#C9A0A0] font-medium max-w-3xl mx-auto">
                    We scan the world's finest origins and reveal the hidden flavors in every bean — without the guesswork.
                </p>
            </div>

            {/* Card Scanner Component */}
            <CardScanner />
        </section>
    );
};

export default CardScannerSection;
