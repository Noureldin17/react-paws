import React from 'react';

interface ArticleCardProps {
    title: string;
    content: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, content }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold text-[#E58D54] mb-2">{title}</h3>
            <p className="text-gray-700">{content}</p>
        </div>
    );
};

export default ArticleCard;
