var MineFieldStore = (function () {
    var generateField = function (l, n) {
        var i, j, row, col, field = [];
        //empty cells
        for(i = 0; i < l; i++) {
            row = [];
            for(j = 0; j < l; j++) {
                row.push({
                    nMines: 0,
                    blown: false,
                    isMine: false,
                    detected: false
                });
            }
            field.push(row);
        }
        return layoutMines(field, n);
    };

    var layoutMines = function(field, nMines) {
        var i, size = field.length, row, col;
        for(i = 0; i < nMines; i++) {
            do {
                row = Math.ceil((Math.random() * 1000)) % size;
                col = Math.ceil((Math.random() * 1000)) % size;
            } while(field[row][col].isMine);

            field[row][col].isMine = true;
            field = updateVicinity(field, row, col);
        };
        return field;
    };

    var updateVicinity = function(field, row, col) {
        var l = field.length, i, j;
        for(i = row - 1; i <= row + 1; i++) {
            for(j = col - 1; j <= col + 1; j++) {
                if(!(i === row && j === col) && j >= 0 && i >= 0 && j <= l - 1 && i <= l - 1) {
                    var updateObj = {};
                    updateObj[i] = {};
                    updateObj[i][j] =  {
                        $apply: function(mine) {
                            if(!mine.isMine){
                                mine.nMines++;
                            }
                            return mine;
                        }
                    };
                    field = React.addons.update(field, updateObj);
                }
            }
        }
        return field;
    };

    var checkRevealVicinity = function(field, row, col) {
        var l = field.length, i, j, minesDetected = 0, minesToReveal = [];
        for(i = row - 1; i <= row + 1; i++) {
            for(j = col - 1; j <= col + 1; j++) {
                if(!(i === row && j === col) && j >= 0 && i >= 0 && j <= l - 1 && i <= l - 1) {
                    if(field[i][j].detected && field[i][j].isMine) {
                        minesDetected++;
                    } else if (!field[i][j].detected) {
                        minesToReveal.push({
                            row: i,
                            col: j
                        });
                    }
                }
            }
        }
        if(minesDetected === field[row][col].nMines) {
            l = minesToReveal.length;
            for(i = 0; i < l; i++) {
                field = revealMine(field, minesToReveal[i].row, minesToReveal[i].col);
                field = checkRevealVicinity(field, minesToReveal[i].row, minesToReveal[i].col);
            }
        }
        return field;
    };

    var revealMine = function(field, row, col, blowUp) {
        var updateObj = {};
        updateObj[row] = {};
        updateObj[row][col] = {
            $apply: function(mine) {
                mine.detected = true;
                if(mine.isMine && blowUp) {
                    mine.blown = true;
                }
                return mine;
            }
        };
        return React.addons.update(field, updateObj);
    };

    return Reflux.createStore({
        listenables: [MineFieldActions],
        blowUpField: function() {
            var i, j, l = this.field.length, updateObj;
            for(i = 0; i < l; i++) {
                for(j = 0; j < l; j++) {
                    updateObj = {}
                    updateObj[i] = {};
                    updateObj[i][j] = {
                        $apply: function (mine) {
                            if(!mine.detected) {
                                mine.detected = true;
                                if(mine.isMine) {
                                    mine.blown = true;
                                }
                            }
                            return mine;
                        }
                    };
                    this.field = React.addons.update(this.field, updateObj);
                }
            }
            this.updateField(this.field);
        },
        updateField: function(field) {
            this.field = field;
            this.trigger(field);
        },
        onClickMine: function(row, col) {
            console.log("Store Click Mine !");
            var isMine = this.field[row][col].isMine;
            var updatedField = revealMine(this.field, row, col, isMine);
            if(isMine) {
                updatedField = this.blowUpField();
            } else {
                updatedField = checkRevealVicinity(updatedField, row, col);
            }
            this.updateField(updatedField);
        },
        onDefuseMine: function(row, col) {
            console.log("Store DoubleClick Mine !");
            var updatedField = revealMine(this.field, row, col, false);
            updatedField = checkRevealVicinity(updatedField, row, col);
            this.updateField(updatedField);
        },
        onRevealField: function() {
            console.log("store reveal field !");
            var i, j, l = this.field.length, updateObj = {};
            for(i = 0; i < l; i++) {
                for(j = 0; j < l; j++) {
                    updateObj[i] = {};
                    updateObj[i][j] = {
                        detected: {
                            $set: true
                        }
                    };
                    this.field = React.addons.update(this.field, updateObj);
                }
            }
            this.updateField(this.field);
        },
        onResetField: function() {
            console.log("store reset field !");
            this.updateField(generateField(this.size, this.nMines));
        },
        getInitialState: function() {
            this.nMines = 10;
            this.size = 10;
            this.field = generateField(this.size, this.nMines);
            return this.field;
        }
    });
})();
