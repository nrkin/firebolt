var MineField = React.createClass({
  getInitialState: function(){
    FieldGenerator.generate(10, 20);
    return {
      mineField: FieldGenerator.field
    };
  },
  render: function() {
    var p = this.props, i, j, mine, l = this.state.mineField.length;
    var self = this;
    return (
      <table id="mineField">
        <tbody>
    {this.state.mineField.map(function(row, i) {
        return (
          <tr>
          {row.map(function(mine, j) {
            return self._renderMine(mine);
          })}
      </tr>
    );
  })}
        </tbody>
      </table>
    );
  },
  _renderMine: function(mine) {
    if(mine.isMine) {
      return <td><button onClick={this._handleMineClick.bind(this, mine)}>M</button></td>;
    }
    return <td><button onClick={this._handleMineClick.bind(this, mine)}>{mine.nMines}</button></td>;
  },
  _handleMineClick: function(mine, ev) {
     console.log('Clicked mine ! ', mine);
   }
});

React.render(
  <MineField/>,
  document.getElementById('firebolt')
);
