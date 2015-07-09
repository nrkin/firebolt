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
  var field = [];

  /*
  Randomly lay out 'n' number of mines in l X l grid
  * */
  function generate (l, n) {
    var i, j, row, col;
    this.field = [];
    this.nMines = n;
    this.gridSize = l;
    //empty cells
    for(i = 0; i < l; i++) {
      row = [];
      for(j = 0; j < l; j++) {
        row.push(new Cell(0, false, false));
      }
      this.field.push(row);
    }
    this.layoutMines();
  }

  function layoutMines() {
    var i, j;
    for(i = 0; i < this.nMines; i++) {
      do {
        row = Math.ceil((Math.random() * 1000)) % this.gridSize;
        col = Math.ceil((Math.random() * 1000)) % this.gridSize;
      } while(this.field[row][col].isMine);

      this.field[row][col].setIsMine(true);
      this.updateVicinity(row, col);
    };
  }

  function updateVicinity(row, col) {
    var cell = this.field[row][col], l = this.field.length, i, j;
    for(i = row - 1; i <= row + 1; i++) {
      for(j = col - 1; j <= col + 1; j++) {
        if(!(i === row && j === col) && this.field[i] && this.field[i][j] && !this.field[i][j].isMine) {
          this.field[i][j].addMine();
        }
      }
    }
  }
  return {
    field: field,
    generate: generate,
    updateVicinity: updateVicinity,
    layoutMines: layoutMines
  };
})();