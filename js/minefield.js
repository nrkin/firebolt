var MineField = (function(){
  var defaultSize = 10;
  function draw(field) {
    var l = field.length, i, j,
      table = document.getElementById("mineField");
    table.innerHTML = '';
    for(i = 0; i < l; i ++){
      var td = '';
      for(j = 0; j < l; j++) {
        var mine = field[i][j];
        if(mine.isMine){
          td += '<td>M</td>';
        } else {
          td += '<td>' + mine.nMines + '</td>';
        }
      }
      table.innerHTML += '<tr>' + td + '</tr>';
    }
  }
  function init() {
    var field = FieldGenerator.generate(10, 10);
    draw(field);
  }

  return {
    init: init
  };
})();

MineField.init();
