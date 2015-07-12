var Cell = function(nMines, blown, isMine) {
  this.nMines = nMines;
  this.blown = blown;
  this.isMine = isMine;
  this.detected = false;

  this.setIsMine = function (isMine) {
    this.isMine = isMine;
  };
  this.explode = function() {
    if(this.isMine && !this.detected){
      this.blown = true;
    }
  };
  this.addMine = function() {
    this.nMines++;
  };
  this.reveal = function() {
    this.detected = true;
  };
};

var FieldGenerator = function(l, n){
  this.cells = [];
  this.nMines = n;
  this.gridSize = l;
  /*
   Randomly lay out 'n' number of mines in l X l grid
   * */
  this.generate = function() {
    var i, j, row, col;
    this.cells = [];
    //empty cells
    for(i = 0; i < l; i++) {
      row = [];
      for(j = 0; j < l; j++) {
        row.push(new Cell(0, false, false));
      }
      this.cells.push(row);
    }
    this.layoutMines();
  };

  this.layoutMines = function() {
    var i, j;
    for(i = 0; i < this.nMines; i++) {
      do {
        row = Math.ceil((Math.random() * 1000)) % this.gridSize;
        col = Math.ceil((Math.random() * 1000)) % this.gridSize;
      } while(this.cells[row][col].isMine);

      this.cells[row][col].setIsMine(true);
      this.updateVicinity(row, col);
    };
  };

  this.updateVicinity = function(row, col) {
    var cell = this.cells[row][col], l = this.cells.length, i, j;
    for(i = row - 1; i <= row + 1; i++) {
      for(j = col - 1; j <= col + 1; j++) {
        if(!(i === row && j === col) && this.cells[i] && this.cells[i][j] && !this.cells[i][j].isMine) {
          this.cells[i][j].addMine();
        }
      }
    }
  };

  this.checkRevealVicinity = function(row, col) {
    var cell = this.cells[row][col], i, j, minesInVicinity = 0;
    if(cell.nMines !== 0) {
      for(i = row - 1; i <= row + 1; i++) {
        for(j = col - 1; j <= col + 1; j++) {
          if(!(i === row && j === col) && this.cells[i] && this.cells[i][j] && this.cells[i][j].isMine && this.cells[i][j].detected) {
            minesInVicinity++;
          }
        }
      }
      if(minesInVicinity === cell.nMines) {
        this.revealVicinity(row, col);
      }
    } else {
      this.revealVicinity(row, col);
    }
  };

  this.revealVicinity = function(row, col) {
    var cell = this.cells[row][col], i, j, minesInVicinity = 0;
    if(minesInVicinity === cell.nMines) {
      for(i = row - 1; i <= row + 1; i++) {
        for(j = col - 1; j <= col + 1; j++) {
          if(!(i === row && j === col) && this.cells[i] && this.cells[i][j]) {
            this.cells[i][j].reveal();
            //this.checkRevealVicinity(row, col);
          }
        }
      }
    }
  };

  this.blowUp = function(){
    this.cells.forEach(function(row){
      row.forEach(function(cell){
        cell.explode();
        cell.reveal();
      });
    });
  };

  this.reset = function() {
    this.generate();
  };

  this.reveal = function(){
    this.cells.forEach(function(row){
      row.forEach(function(cell){
        cell.reveal();
      });
    });
  };

  this.generate();
};