import React from 'react';
import { render } from 'react-dom';

import QuizTool from './QuizTool';

const getProps = () => {
    if(window.QUIZ_POLL_DATA) {
        const { questions } = window.QUIZ_POLL_DATA;
        return {
            questions
        };
    }
}
{
    render(<QuizTool {...getProps()} />, document.getElementById('app'));
}
