import React from 'react';

const Tags = () => {
    const tags = [
        {text: "text", red: 255, green: 0, blue: 0},
        {text: "text", red: 0, green: 255, blue: 0},
    ];
    return (
        <div className="flex flex-wrap">
        {tags.map((tag, index) => (
            <span 
            key={index} 
            className="text-white font-bold py-1 px-3 rounded-full mr-2 mb-2"
            style={{
                backgroundColor: `rgb(${tag.red}, ${tag.green}, ${tag.blue})`
            }}
            >
            {tag.text}
            </span>
        ))}
        </div>
    );
};

export default Tags;
