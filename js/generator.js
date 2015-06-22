var Cell = function(nMines, blown,isMine) {
  this.nMines = nMines;
  this.blown = blown;
  this.isMine = isMine;

  this.setIsMine = function (isMine) {
    this.isMine = isMine;
  };
  this.explode = function() {
    this.blown = true;
  };
  this.addMine = function() {
    this.nMines++;
  }
};

var FieldGenerator = (function(){
  var field;

  /*
  Randomly lay out 'n' number of mines in l X l grid
  * */
  function generate (l, n) {
    var i, j, row, col;
    field = [];
    //empty cells
    for(i = 0; i < l; i++) {
      row = [];
      for(j = 0; j < l; j++) {
        row.push(new Cell(0, false, false));
      }
      field.push(row);
    }
    for(i = 0; i < n; i++) {
      row = Math.ceil((Math.random() * 1000)) % l;
      col = Math.ceil((Math.random() * 1000)) % l;
      field[row][col].setIsMine(true);
      updateVicinity(row, col);
    }
    return field;
  }

  function updateVicinity(row, col) {
    var cell = field[row][col], l = field.length, i, j;
    for(i = row - 1; i <= row + 1; i++) {
      for(j = col - 1; j <= col + 1; j++) {
        if(field[i] && field[i][j]) {
          field[i][j].addMine();
        }
      }
    }
  }
  return {
    generate: generate
  };
})();