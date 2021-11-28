import React,{ Component } from 'react';
import './AlphaButtons.css'

class AlphaButtons extends Component{
    render() {
        return (
            <div>
                {
                    "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
                    <button
                        value={ltr}
                        onClick={this.props.handleGuess}
                        disabled={this.props.guessedBtns.has(ltr)}
                        key={ltr}
                    >
                        {ltr}
                    </button>
                    ))
                }
            </div>
        )
    }
}

export default AlphaButtons