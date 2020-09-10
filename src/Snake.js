import React from 'react';

class Snake extends React.Component {

  state={
    length:3,
    xPos:[this.props.boardSize*5, this.props.boardSize*5-10, this.props.boardSize*5-20],
    yPos:[this.props.boardSize*5, this.props.boardSize*5, this.props.boardSize*5],
    xMove:10,
    yMove:0,
    keyWasPressed:false,
    gameOver:false
  }

  onKeyPress(event) {
    if(
        event.key==="r" || event.key==="R" ||
        event.key==="p" || event.key==="P" ||
        event.key==="w" || event.key==="W" ||
        event.key==="s" || event.key==="S" ||
        event.key==="a" || event.key==="A" ||
        event.key==="d" || event.key==="D" ||
        event.key==="ArrowDown" || event.key==="ArrowRight" ||
        event.key==="ArrowUp" || event.key==="ArrowLeft"
    ){
      event.preventDefault();
    }
    if(this.state.keyWasPressed && (event.key!=="r" && event.key!=="R")) return;
    if(this.state.gameOver && (event.key!=="r" && event.key!=="R")) return;
    if(this.state.paused && (event.key!=="r" && event.key!=="R" && event.key!=="P" && event.key!=="p")) return;
    if(event.key==="r" || event.key==="R"){
      var size = document.getElementById("size").value;
      this.props.changeSize(size);
      var borders = document.getElementById("borders").value;
      this.props.changeBorders(borders);
      this.props.resetChangeDir();
      this.setState({length:3, xPos:[this.props.boardSize*5, this.props.boardSize*5-10, this.props.boardSize*5-20], yPos:[this.props.boardSize*5, this.props.boardSize*5, this.props.boardSize*5], xMove:10, yMove:0, keyWasPressed:false, gameOver:false, paused:false})
      this.props.onEat(3);
    }
    else if(event.key==="p" || event.key==="P"){
      if(this.state.paused){
        this.setState({paused:false});
      }
      else{
        this.setState({paused: true});
      }
    }
    else if(this.state.yMove===0 && (event.key==="ArrowDown" || event.key==="s" || event.key==="S")){
      this.setState({yMove:10, xMove:0, keyWasPressed:true})
    }
    else if(this.state.yMove===0 && (event.key==="ArrowUp" || event.key==="w" || event.key==="W")){
      this.setState({yMove:-10, xMove:0, keyWasPressed:true})
    }
    else if(this.state.xMove===0 && (event.key==="ArrowRight" || event.key==="d" || event.key==="D")){
      this.setState({yMove:0, xMove:10, keyWasPressed:true})
    }
    else if(this.state.xMove===0 && (event.key==="ArrowLeft" || event.key==="a" || event.key==="A")){
      this.setState({yMove:0, xMove:-10, keyWasPressed:true})
    }
  }
  onEat(){
    var newXPos=this.state.xPos;
    var newYPos=this.state.yPos;
    newXPos.push(newXPos[newXPos.length-1]);
    newYPos.push(newYPos[newYPos.length-1]);
    this.setState({xPos:newXPos, yPos: newYPos, length:this.state.length+1})
    this.props.onEat(this.state.length);
  }

  componentDidMount(){
    this.onKeyPress=this.onKeyPress.bind(this);
      document.addEventListener("keydown", this.onKeyPress);
      var xyz=0;
      this.interval = setInterval(() => {
        if(this.props.restart){
          var size = document.getElementById("size").value;
          this.props.changeSize(size);
          var borders = document.getElementById("borders").value;
          this.props.changeBorders(borders);
          this.setState({length:3, xPos:[this.props.boardSize*5, this.props.boardSize*5-10, this.props.boardSize*5-20], yPos:[this.props.boardSize*5, this.props.boardSize*5, this.props.boardSize*5], xMove:10, yMove:0, keyWasPressed:false, gameOver:false, paused:false})
          this.props.resetChangeDir();
          this.props.onEat(3);
        }
        if(this.state.gameOver) {xyz++; this.props.changePause(); return;}
        if(this.props.pause){
          if(this.state.paused){
            this.setState({paused: false});
          }
          else{
            this.setState({paused: true});
          }
          this.props.changePause();
        }
        if(this.state.paused) return;

        if(this.props.borders &&
          (this.state.xPos[0]+this.state.xMove>this.props.boardSize*10-10 ||
          this.state.yPos[0]+this.state.yMove>this.props.boardSize*10-10 ||
          this.state.xPos[0]+this.state.xMove<0 ||
          this.state.yPos[0]+this.state.yMove<0 ))
          {
            var newXPos=this.state.xPos;
            var newYPos=this.state.yPos;

            this.setState({gameOver:true, xPos:newXPos, yPos:newYPos}); return;}

        if(this.props.changeDir!=="n"){
          if(!this.state.keyWasPressed){
            if(this.props.changeDir==="r" && this.state.xMove===0){this.setState({xMove:10, yMove:0})}
            else if(this.props.changeDir==="l" && this.state.xMove===0){this.setState({xMove:-10, yMove:0})}
            else if(this.props.changeDir==="u" && this.state.yMove===0){this.setState({yMove:-10, xMove:0})}
            else if(this.props.changeDir==="d" && this.state.yMove===0){this.setState({yMove:10, xMove:0})}
            this.props.resetChangeDir();
          }
        }

        newXPos=this.state.xPos;
        newYPos=this.state.yPos;
        var oldHeadX=newXPos[0];
        var oldHeadY=newYPos[0];
        newXPos[0]+=this.state.xMove;
        newYPos[0]+=this.state.yMove;
        if (newXPos[0]>this.props.boardSize*10-10){
          newXPos[0]=0;
        }
        if (newYPos[0]>this.props.boardSize*10-10) {
          newYPos[0]=0;}
        if (newXPos[0]<0) {
          newXPos[0]=this.props.boardSize*10-10;}
        if (newYPos[0]<0) {
          newYPos[0]=this.props.boardSize*10-10;
        }
        for(var i=newXPos.length-1; i>1; i--){
          if(i!== newXPos.length-1 && newXPos[0]===newXPos[i] && newYPos[0]===newYPos[i]){
            newXPos=this.state.xPos;
            newYPos=this.state.yPos;
            newXPos[0]=oldHeadX;
            newYPos[0]=oldHeadY;
            this.setState({gameOver:true, xPos:newXPos, yPos:newYPos});
            return;
          }
          newXPos[i]=newXPos[i-1];
          newYPos[i]=newYPos[i-1];
        }
        newXPos[1]=oldHeadX;
        newYPos[1]=oldHeadY;

       if(newXPos[0]===this.props.foodXPos && newYPos[0]===this.props.foodYPos){
         this.onEat();
       }
       this.setState({xPos:newXPos, yPos:newYPos, keyWasPressed:false});
       this.props.onMove(this.state.xPos, this.state.yPos);
     }, 100);
  }

  render(){
    const snakeTail = this.state.xPos.map((x, index) => {
      var classes="";
      if(index===0){
        classes="head";
        if(this.state.xMove===-10) classes+=" L";
        if(this.state.yMove===-10) classes+=" U";
        if(this.state.yMove===10) classes+=" D";
      }
      else if(index===this.state.xPos.length-1){
        classes="tail";
        if(this.state.xMove===-10) classes+=" L";
        if(this.state.yMove===-10) classes+=" U";
        if(this.state.yMove===10) classes+=" D";
      }
      return <div id={"body-"+index} key={index} className={"body " + classes} style={{display:"block", position:"relative", left:x-1, top:this.state.yPos[index]-index*10-1, background:this.props.color, width:"8px", height:"8px", margin:"2px"}}></div>;
    });
    return (
      <div className="snakeBody">{snakeTail}</div>
    );
  }
}

export default Snake;
