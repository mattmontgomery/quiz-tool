import React, { Component } from 'react';

const Answer = ({ onClick, text }) => {
    return <div onClick={onClick} style={{ cursor: 'pointer' }}>{text}</div>
};

export default class QuizTool extends Component {
    constructor(props = {}) {
        super(props);
        this.ingestFromDocument = ::this.ingestFromDocument;
        this.render = ::this.render;
        this.renderQuestion = ::this.renderQuestion;
        this.renderStatus = ::this.renderStatus;
        this.respond = ::this.respond;

        this.state = {
            responses: {}
        }
        if(Object.keys(props).length === 0) {
            this.quiz = this.ingestFromDocument();
        }
    }
    ingestFromDocument() {
    }
    respond(qNo, answer) {
        var ev = new CustomEvent('quiz-question-answered', { bubbles: true, detail: qNo, answer });
        this.elem.dispatchEvent(ev);
        this.setState({
            responses: {
                ...this.state.responses,
                [`${qNo}`]: answer
            }
        });
    }
    renderAnswer(answer = '', onClick = {}) {
        return (
            <div className="quiz__question-response">{answer}</div>
        );
    }
    renderQuestion({ text, answers = [], correctAnswer }, questionNo) {
        return (
            <div className="quiz__question">
                <strong>{text}</strong>
                <div className="quiz__question-responses">
                    {answers.map((a, idx) => <Answer key={idx} onClick={() => this.respond(questionNo, a)} text={a} />)}
                </div>
                <div style={{ backgroundColor: 'beige', padding: '1rem' }}>
                    { this.state.responses[questionNo] ? (this.state.responses[questionNo] === correctAnswer ? '😎' : '😑') : null }
                </div>
            </div>
        );
    }
    renderStatus() {
        const { responses } = this.state;
        const correct = Object.keys(responses).filter((qNo) => responses[qNo] === this.props.questions[qNo].correctAnswer)
        console.log(correct);
        if(Object.keys(responses).length === this.props.questions.length) {
            return <div>{'Complete'}{' '}{correct.length === this.props.questions.length ? '🔥' : '😿'}</div>;
        } else {
            return <div />;
        }
    }
    render() {
        return (
            <div className="quiz__questions" style={{ margin: '1rem'}} ref={e => this.elem = e}>
                {this.props.questions.map((q, idx) => (
                    <div key={idx}>{this.renderQuestion(q, idx)}</div>
                ))}
                <div style={{ padding: '1rem', 'backgroundColor': 'skyblue' }}>{this.renderStatus()}</div>
            </div>
        );
    }
}
