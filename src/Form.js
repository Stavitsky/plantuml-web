import React, {Component} from 'react';
import './Form.css'
import DBManager from "./DBManager";
import TextArea from "./TextArea";

const HARDCODE = 'alice->bob';

class Form extends Component {
    onSubmit: (x: string) => void;
    blockId: number;
    dbManager: DBManager;
    text: string;
    destroy: (e: Event) => null;

    _text: string;
    _textArea: HTMLInputElement;

    constructor(props) {
        super(props);

        this._text = props.text
        this._textArea = null;
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                    <TextArea
                        initialText={this._text}
                        onChange={e => this.handleTextAreaChange(e)}
                        onSubmit={e => this.handleSubmit(e)}
                        setTextAreaBind={this.setTextAreaBind}
                    />
                <input type="submit"/>
                <button
                    onClick={ this.handleAddTemplate }
                    key="Template"
                >Add template
                </button>
                <button
                    onClick={e => this.props.destroy(e)}
                    key="Delete"
                    className="Delete-button"
                >Delete
                </button>
            </form>
        )
    }

    setTextAreaBind = (ref: HTMLInputElement) => {
        this._textArea = ref;
    }

    handleAddTemplate = () => {
        console.log('update');
        this._textArea.value = HARDCODE;
        this._text = HARDCODE;
    }

    handleTextAreaChange(event: Event) {
        // noinspection JSUnresolvedVariable
        const text = event.target.value;

        this._text = text;
        this.props.dbManager.update(this.props.blockId, text);
    }

    handleSubmit(event: Event) {
        event.preventDefault();
        this.props.onSubmit(this._text);
    }
}

export default Form;