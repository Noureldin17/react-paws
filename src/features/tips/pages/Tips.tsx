import React, { useState } from 'react';
import VetConsultationModal from '../components/VetConsultationModal';
import ArticleCard from '../components/ArticleCard';

const articles = [
    {
        id: 1,
        title: 'How to Keep Your Pet Healthy',
        content: 'Learn the basics of maintaining your pet\'s health, including regular check-ups and proper nutrition.',
    },
    {
        id: 2,
        title: 'Understanding Pet Behavior',
        content: 'Explore common pet behaviors and how to respond to them to build a stronger bond with your pet.',
    },
    {
        id: 3,
        title: 'Grooming Tips for Pets',
        content: 'Discover how to keep your pet clean and well-groomed with simple, effective grooming techniques.',
    },
];

const Tips = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <section id="tips" className="p-8 bg-gray-100">
            <h2 className="text-3xl font-bold text-[#E58D54] mb-4">Pet Care Tips</h2>
            <p className="text-gray-700 mb-8">Explore helpful tips and articles to take better care of your pets.</p>

            {/* Articles Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleCard key={article.id} title={article.title} content={article.content} />
                ))}
            </div>

            {/* Consultation Button */}
            <div className="mt-10 text-center">
                <button
                    onClick={handleOpenModal}
                    className="bg-[#E58D54] hover:bg-[#D07A48] text-white font-bold py-2 px-6 rounded"
                >
                    Contact a Vet
                </button>
            </div>

            {/* Vet Consultation Modal */}
            <VetConsultationModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </section>
    );
};

export default Tips;
