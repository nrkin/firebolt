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
        <thead><tr><button onClick={self._layoutMines}>Lay Mines</button></tr></thead>
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
      return <td>M</td>;
    }
    return <td>{mine.nMines}</td>;
  },
  _layoutMines: function () {
    FieldGenerator.layoutMines();
    this.setState({
      mineField: FieldGenerator.field
    });
  }
});

React.render(
  <MineField/>,
  document.getElementById('firebolt')
);
