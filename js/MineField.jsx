var MineField = React.createClass({
  mixins: [Reflux.connect(MineFieldStore, "field")],
  render: function() {
    var p = this.props, i, j, mine, l = this.state.field.length;
    var self = this;
    return (
      <table id="mineField">
        <thead>
          <tr><button onClick={this._handleResetClick}>Reset</button></tr>
          <tr><button onClick={this._handleRevealClick}>Reveal</button></tr>
        </thead>
        <tbody>
    {this.state.field.map(function(row, i) {
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
    return (
      <td>
      <button
       className={className}
       disabled={disabled}
       onClick={this._handleMineClick.bind(this, row, col)}>
       {text}
      </button>
      </td>
    );
  },
  _handleMineClick: function(row, col, ev) {
     console.log('Clicked mine component ! ');
    if(ev.ctrlKey) {
      MineFieldActions.defuseMine(row, col);
    } else {
      MineFieldActions.clickMine(row, col);
    }
   },
   _handleResetClick: function() {
     console.log("Component minefield reset clicked !");
     MineFieldActions.resetField();
   },
   _handleRevealClick: function() {
     console.log("Component minefield reveal clicked !");
     MineFieldActions.revealField();
   }
});

React.render(
  <MineField/>,
  document.getElementById('firebolt')
);
