var MineField = React.createClass({
  getInitialState: function(){
    return {
      mineField: new FieldGenerator(10, 20)
    };
  },
  render: function() {
    var p = this.props, i, j, mine, l = this.state.mineField.cells.length;
    var self = this;
    return (
      <table id="mineField">
        <thead>
          <tr><button onClick={this._handleResetClick}>Reset</button></tr>
          <tr><button onClick={this._handleRevealClick}>Reveal</button></tr>
        </thead>
        <tbody>
    {this.state.mineField.cells.map(function(row, i) {
        return (
          <tr>
          {row.map(function(mine, j) {
            return self._renderMine(mine, i, j);
          })}
      </tr>
    );
  })
  }
        </tbody>
      </table>
    );
  },
  _renderMine: function(mine, row, col) {
    var text, disabled = '', className = '';
    if(mine.detected){
      disabled = 'disabled';
      if(mine.isMine){
        if(mine.blown){
          className = 'blown';
        } else {
          className = 'safe';
        }
        text = 'M';
      } else {
        text = mine.nMines;
      }
    }
    return <td><button className={className} disabled={disabled} onClick={this._handleMineClick.bind(this, mine, row, col)}>{text}</button></td>;
  },
  _handleMineClick: function(mine, row, col, ev) {
     console.log('Clicked mine ! ', mine);
     if(!ev.ctrlKey && mine.isMine) {
       this.state.mineField.blowUp();
     } else {
       mine.reveal();
       this.state.mineField.revealVicinity(row, col);
     }
     //TODO : This does not make sense :)
     this.setState(this.state.mineField);
   },
   _handleResetClick: function(ev) {
     this.state.mineField.reset();
     //TODO : This does not make sense :)
     this.setState(this.state.mineField);
   },
   _handleRevealClick: function(ev) {
     this.state.mineField.reveal();
     //TODO : This does not make sense :)
     this.setState(this.state.mineField);
   }
});

React.render(
  <MineField/>,
  document.getElementById('firebolt')
);
