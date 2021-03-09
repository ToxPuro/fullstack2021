import React from 'react';
import Part from './Part'

const Content = ({parts}) => {
    const sum = (total,curr) => total+curr.exercises
    const total= parts.reduce(sum,0)
    return (
        <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
        <b>total of {total} exercises</b>
        </div>
    );
};

export default Content;