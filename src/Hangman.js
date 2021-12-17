import React, { Component } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import AlphaButtons from "./AlphaButtons";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  reset=()=>{
    // chane the state to initial state
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() })
  }
  getWordNbtns(){
    let testArr = this.state.answer.split('')
                  .filter(ltr => ! this.state.guessed.has(ltr))
    const isWinner = !testArr.length
    const gameOver = this.state.nWrong >= this.props.maxWrong
    let wordNbtns=''
    if(isWinner){    // display 'You won'
      wordNbtns = 
      <div>
        <h2>You WON</h2>
      </div>
    }
    else if(gameOver){  // display 'You lose'
      wordNbtns = 
      <div>
        <p className='Hangman-word'>{this.state.answer}</p>
        <h3>You Lose!</h3>
      </div>
  
    }
    else {
      wordNbtns = 
      <div>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'><AlphaButtons handleGuess={this.handleGuess} guessedBtns={this.state.guessed} /></p>
      </div>
    }
    return wordNbtns
  }
  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/${this.props.maxWrong}`}/>
        {this.getWordNbtns()}
        <p>Number wrong: {this.state.nWrong}</p>
        <button onClick={this.reset}>Restart</button>
      </div>
    );
  }
}

export default Hangman;
