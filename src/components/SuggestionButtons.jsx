import React from 'react';

const SuggestionButtons = ({ onSuggestionClick }) => {
  const suggestions = [
    { text: "قارن المشاريع", prompt: "قارن بين المشاريع من حيث النطاق الجغرافي والفئة المستهدفة والميزانية" },
    { text: "حلل المشروع", prompt: "قم بتحليل تفصيلي للمشروع من حيث نقاط القوة والضعف والفرص والتحديات" },
    { text: "قدم توصيات", prompt: "قدم توصيات لتحسين المشروع وزيادة أثره الاجتماعي" }
  ];

  return (
    <div className="suggestion-buttons" style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion.prompt)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.9rem',
            fontFamily: 'Arial, sans-serif'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#f0f0f0'}
        >
          {suggestion.text}
        </button>
      ))}
    </div>
  );
};

export default SuggestionButtons;
