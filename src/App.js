import React from 'react';
import Snake from './Snake.js';
import './App.css';

class App extends React.Component {
  state={
    foodXPos:40,
    foodYPos:30,
    snakeLength:3,
    snakeX:[210, 200],
    snakeY:[200, 200],
    size:20,
    restart:false,
    pause:false,
    zoom:1,
    borders:false,
    sColor: "coral",
    fColor: "darkred",
    changeDir:"n",
    controls:true
  }


  onEat(length){
    var newRestart=this.state.restart;
    var repeat=true;
    while(repeat){
      var newFoodX = this.getRandomInt(this.state.size);
      var newFoodY = this.getRandomInt(this.state.size);
      repeat=false;
      for(var i=0; i<this.state.snakeX.length; i++){
        if(newFoodX === this.state.snakeX[i] && newFoodY === this.state.snakeY[i]){
          repeat=true;
        }
      }
    }
    if(length===3){newRestart=false}
    this.setState({foodXPos:newFoodX, foodYPos:newFoodY, snakeLength:length, restart:newRestart});
  }

  onSnakeMove(x,y){
    this.setState({snakeX:x, snakeY:y});
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))*10;
  }

  controlSwitch(){
    if(this.state.controls){
      this.setState({controls:false});
    }
    else{
      this.setState({controls:true});
    }
  }

  componentDidMount(){
    this.controlSwitch=this.controlSwitch.bind(this);
    this.onEat=this.onEat.bind(this);
    this.changeBorders=this.changeBorders.bind(this);
    this.changeZoom=this.changeZoom.bind(this);
    this.onSnakeMove=this.onSnakeMove.bind(this);
    this.changeSize=this.changeSize.bind(this);
    this.resetChangeDir=this.resetChangeDir.bind(this);
    this.setState({foodXPos:this.getRandomInt(this.state.size), foodYPos: this.getRandomInt(this.state.size)})
  }

  changeZoom(event){
    var zoom = event.target.value;
    this.setState({zoom: parseFloat(zoom)});
  }

  changeBorders(borders){
    var bordersBool = (borders === "true")
    this.setState({borders:bordersBool});
  }

  changeSize(size){
    if(size==="xs") this.setState({size:10});
    else if(size==="s") this.setState({size:20});
    else if(size==="m") this.setState({size:30});
    else if(size==="l") this.setState({size:40});
  }

  changeSColor(event){
    var color=event.target.value;
    this.setState({sColor:color});
  }
  changeFColor(event){
    var color=event.target.value;
    this.setState({fColor:color});
  }
  resetChangeDir(){
    this.setState({changeDir:"n"})
  }

  render(){
    return (
      <div className="App" style={{transform: "scale(" + this.state.zoom + ")", top:50*this.state.zoom-50+"px", position:"relative"}}>
        <div style={{width: ""+this.state.size*10+"px", height:""+this.state.size*10+"px", display:"inline-block", marginRight:10+50*this.state.zoom-50+"px", marginBottom: window.innerWidth<this.state.size*10+120 ? "10px" : -50+"px", top: window.innerWidth<this.state.size*10+120 ? "0px" : -210+"px", position:"relative", borderStyle: this.state.borders ? "solid" : "dotted"}} className="playground">
          <Snake changePause={() => this.setState({pause:false})} restart={this.state.restart} pause={this.state.pause} changeSize={this.changeSize} boardSize={this.state.size} onMove={this.onSnakeMove} onEat={this.onEat} foodXPos={this.state.foodXPos} foodYPos={this.state.foodYPos} borders={this.state.borders} changeBorders={this.changeBorders} color={this.state.sColor} resetChangeDir={this.resetChangeDir} changeDir={this.state.changeDir}/>
          <div style={{position:"relative", top:this.state.foodYPos-12, left:this.state.foodXPos, width:"10px", height:"10px", backgroundColor:this.state.fColor}}></div>
        </div>
        {window.innerWidth<this.state.size*10+120 && this.state.controls ? <div style={{}} className="controls">
        <button
          className="up"
          onClick={() => {if(this.state.changeDir==="n") this.setState({changeDir:"u"})}}
        >
        </button>
        <br />
        <button
          className="left"
          onClick={() => {if(this.state.changeDir==="n") this.setState({changeDir:"l"})}}
        >
        </button>
        <button
          className="down"
          onClick={() => {if(this.state.changeDir==="n") this.setState({changeDir:"d"})}}
        >
        </button>
        <button
          className="right"
          onClick={() => {if(this.state.changeDir==="n") this.setState({changeDir:"r"})}}
        >
        </button>
        </div> : ""}
        <div style={{display:"inline-block"}}>

        <label htmlFor="size">Size: </label>
        <select defaultValue="s" style={{display:"block"}} id="size">
        <option value="xs">Extra Small</option>
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
        </select>

        <label htmlFor="zoom">Zoom: </label>
        <select style={{display:"block"}} id="zoom" onChange={(event) => this.changeZoom(event)}>
        <option value="1">100%</option>
        <option value="1.5">150%</option>
        <option value="2">200%</option>
        <option value="3">300%</option>
        </select>

        <label htmlFor="borders">Borders: </label>
        <select style={{display:"block"}} id="borders">
        <option value="false">Borderless</option>
        <option value="true">With borders</option>
        </select>

        <label htmlFor="sColor">Snake color: </label>
        <select defaultValue={"coral"} style={{display:"block", backgroundColor:this.state.sColor}} id="sColor" onChange={(event) => this.changeSColor(event)}>
        <option style={{backgroundColor:"aqua"}} value="aqua">Aqua</option>
        <option style={{backgroundColor:"coral"}} value="coral">Coral</option>
        <option style={{backgroundColor:"deepskyblue"}} value="deepskyblue">DeepSkyBlue</option>
        <option style={{backgroundColor:"goldenrod"}} value="goldenrod">GoldenRod</option>
        </select>

        <label htmlFor="fColor">Food color: </label>
        <select defaultValue={"darkred"} style={{display:"block", backgroundColor:this.state.fColor, color: this.state.fColor==="darkred" ? "#fff" : this.state.fColor==="darkolivegreen" ? "#fff" : "#000"}} id="fColor" onChange={(event) => this.changeFColor(event)}>
        <option style={{backgroundColor:"darkolivegreen", color:"#FFF"}} value="darkolivegreen">DarkOliveGreen</option>
        <option style={{backgroundColor:"darkred", color:"#FFF"}} value="darkred">DarkRed</option>
        <option style={{backgroundColor:"fuchsia", color:"#000"}} value="fuchsia">Fuchsia</option>
        <option style={{backgroundColor:"indianred", color:"#000"}} value="indianred">IndianRed</option>
        </select>

        Score: {this.state.snakeLength*5-15}
        <br />
        Length: {this.state.snakeLength}
        </div>
        {window.innerWidth>=this.state.size*10+120 && this.state.controls ?
        <div style={{marginTop: this.state.size>10 ? "-120px" : "-25px"}} className="controls">
        <button
          className="up"
          onClick={() => {if(this.state.changeDir==="n") this.setState({changeDir:"u"})}}
        >
        </button>
        <br />
        <button
          className="left"
          onClick={() => {if(this.state.changeDir==="n") this.setState({changeDir:"l"})}}
        >
        </button>
        <button
          className="down"
          onClick={() => {if(this.state.changeDir==="n") this.setState({changeDir:"d"})}}
        >
        </button>
        <button
          className="right"
          onClick={() => {if(this.state.changeDir==="n") this.setState({changeDir:"r"})}}
        >
        </button>
        </div> : ""}
        <div>Show controls: <input defaultChecked={this.state.controls} type="checkbox" id="controlSwitch" onChange={this.controlSwitch}></input></div>
        <div className="newGameDiv">
          <button
            className="newGame"
            onClick={() => {
              this.setState({restart:true});
            }}
          >
            New game
          </button>
        </div>
        <div className="pauseDiv">
          <button
            className="pause"
            onClick={() => {
              this.setState({pause:true});
            }}
          >
            Play/Pause
          </button>
        </div>
        <div className="homePageDiv">
          <button
            className="homePage"
            onClick={() => window.location.href = 'http://ammarveljagic.me'}
          >
            Back to home page
          </button>
        </div>
      </div>
    );
  }
}

export default App;
