import React from 'react';

/**
 * ProblemPanel component to display interview problem.
 * @param {Object} problem - Problem object with title and description.
 */
function ProblemPanel({ problem }) {
    return (
        <div className="problem-panel">
            <h2 className="problem-title">{problem.title}</h2>
            <div className="problem-description">
                {problem.description}
            </div>
        </div>
    );
}

export default ProblemPanel;
