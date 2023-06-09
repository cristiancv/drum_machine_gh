import { Component } from "react";
import "../App.css";
import Audio from "./Audio";
import samples from "../assets/samples.json";

export default class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: "",
      power: true,
      active: false,
      bank: 1,
      vol: 0.6,
      display: "DISPLAY",
      audio: {
        src: "",
        id: "",
        play: true,
      },
    };
  }
  toggleBank = (e) => {
    this.setState({ bank: this.state.bank === 1 ? 2 : 1 });
  };

  turnOnOff = () => {
    this.setState({ power: !this.state.power });
  };
  updateVolume = (e) => {
    this.setState({ vol: Number(e.target.value) });
  };
  updateDisplay = (e) =>
    this.setState({ display: `Volume: ${e.target.value * 100}` });

  searchButton = (letter) => {
    //Busca el botón mediante la letra y cambia el color de fondo
    document.querySelectorAll(".drum-pad").forEach((bt) => {
      if (bt.textContent === letter) {
        bt.classList.toggle("pressed");
      }
    });
  };
  powerOff = () => {
    //Search all elements with class 'drum-pad' then change their disabled property
    document.querySelectorAll(".drum-pad").forEach((bt) => {
      if (this.state.power === true) {
        bt.disabled = false;
        //console.log("botones apagados:",bt.disabled)
      } else {
        bt.disabled = true;
        //console.log("boton apagados:",bt.disabled)
      }
    });
  };
  selectSound = (bank, letter) => {
    /* Looking for a key/value in samples.bank then sets the src and id properties
     */
    const source = samples.bank[bank - 1][letter];
    if (source)
      this.setState({
        letter,
        audio: { src: source, id: letter },
        active: true,
      });
  };
  handlerKeyup = (e) => {
    const letter = String(e.key).toUpperCase();
    switch (letter) {
      case "Q":
      case "W":
      case "E":
      case "A":
      case "S":
      case "D":
      case "Z":
      case "X":
      case "C":
        this.searchButton(letter);
        this.state.power &&
          this.setState({
            display: `Bank_${this.state.bank}_${letter}`,
            active: false,
          });
        break;
    }
  };
  handlerKeyDown = (e) => {
    /* console.log("MANEJADOR DE TECLAS")
    console.log(`tecla capturada presionada: ${e.key}`); */
    const letter = String(e.key).toUpperCase();
    switch (letter) {
      case "Q":
      case "W":
      case "E":
      case "A":
      case "S":
      case "D":
      case "Z":
      case "X":
      case "C":
        this.searchButton(letter);
        this.selectSound(this.state.bank, letter);
        break;
      default:
      //return console.info("Tecla no registrada", letter);
    }
  };

  handlerButton = (e) => {
    const letter = String(e.target.textContent);
    this.selectSound(this.state.bank, letter);
  };
  componentDidMount() {
    //console.log("COMPONENT MONTADO");
    document.addEventListener("keydown", this.handlerKeyDown);
    document.addEventListener("keyup", this.handlerKeyup);
    //this.updateVolume;
    //const $audio = document.querySelector(".clip");
    /* document.addEventListener("change", (e) => {
      $audio.volume = this.state.vol / 100;
    }); */
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handlerKeyDown);
    document.removeEventListener("keyup", this.handlerKeyup);
    /* document.removeEventListener("change", (e) => {
      //$audio.volume = e.target.value/100;
    }); */
  }
  /* shouldComponentUpdate(nextProps, nextState){
    console.log("Should it update");
    console.log("this.state.vol = ",this.state.vol);
    console.log("next.state.vol = ",nextState.vol);    
    return (this.state.vol !== nextState.vol);
  } */
  componentDidUpdate() {
    console.log("Component was Update");
  }
  render() {
    //console.log("RENDERIZADO ----")
    //this.powerOff();
    return (
      <main id="drum-machine">
        <div id="panel-pad">
          <button className="drum-pad" onClick={this.handlerButton}>
            Q
          </button>
          <button className="drum-pad" onClick={this.handlerButton}>
            W
          </button>
          <button className="drum-pad" onClick={this.handlerButton}>
            E
          </button>
          <button className="drum-pad" onClick={this.handlerButton}>
            A
          </button>
          <button className="drum-pad">S</button>
          <button className="drum-pad">D</button>
          <button className="drum-pad">Z</button>
          <button className="drum-pad">X</button>
          <button className="drum-pad">C</button>
          {/* { this.state.power && this.state.active && 
          <Audio src={this.state.audio.src} 
            id={this.state.audio.id} 
            vol={this.state.vol} 
            volume={this.state.vol} /> } */}
          <Audio
            src={this.state.audio.src}
            id={this.state.audio.id}
            //vol={this.state.vol}
            volume={this.state.vol}
          />
        </div>
        <div className="controls" onChange={this.updateDisplay}>
          <button
            className="control-btn"
            id="btn-onoff"
            onClick={this.turnOnOff}
          >
            {this.state.power ? "ON" : "OFF"}
          </button>
          <p id="display">{this.state.display}</p>
          <input
            type="range"
            name="volumen"
            id="vol"
            min="0"
            max="1"
            step="0.1"
            value={this.state.vol}
            onChange={this.updateVolume}
            disabled={!this.state.power}
          />
          <br />
          <button
            className={`control-btn ${this.state.bank === 2 ? "preset_2" : ""}`}
            id="preset"
            onClick={this.toggleBank}
          >
            Bank {this.state.bank}
          </button>
        </div>
      </main>
    );
  }
}
