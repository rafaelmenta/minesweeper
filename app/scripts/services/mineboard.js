'use strict';

angular.module('minesweeperApp')
  .service('MineBoard', function Mineboard($rootScope) {
    var board = null;
    var setBlankBoard = function(cols, rows) {

      board = {
        rows: []
      };

      var templateRow = {
        cols : []
      };
      for (var i = 0; i < cols; ++i) {
        templateRow.cols[i] = {
          hasBomb : false,
          show : false,
          adjacentMines : 0
        };
      }

      for (var j = 0; j < rows; ++j) {
        board.rows[j] = angular.copy(templateRow);
      }

    };

    var increaseAdjacencyCount = function(row, col, maxRows, maxCols) {
      if (row - 1 >= 0) {
        if (col - 1 >= 0) {
          board.rows[row - 1].cols[col - 1].adjacentMines++;
        }
        board.rows[row - 1].cols[col].adjacentMines++;
        if (col + 1 < maxCols) {
          board.rows[row - 1].cols[col + 1].adjacentMines++;
        }
      }

      if (col - 1 >= 0) {
        board.rows[row].cols[col - 1].adjacentMines++;
      }

      if (col + 1 < maxCols) {
        board.rows[row].cols[col + 1].adjacentMines++;
      }

      if (row + 1 < maxRows) {
        if (col - 1 >= 0) {
          board.rows[row + 1].cols[col - 1].adjacentMines++;
        }
        board.rows[row + 1].cols[col].adjacentMines++;
        if (col + 1 < maxCols) {
          board.rows[row + 1].cols[col + 1].adjacentMines++;
        }
      }
    };

    var plantMines = function(cols, rows, mines) {
      var minesPlanted = 0;
      while (minesPlanted < mines) {
        var col =  Math.floor(Math.random() * cols);
        var row =  Math.floor(Math.random() * rows);

        if (!board.rows[row].cols[col].hasBomb) {
          board.rows[row].cols[col].hasBomb = true;
          ++minesPlanted;
          increaseAdjacencyCount(row, col, rows, cols);
        }
      }
    };

    this.getNewBoard = function(cols, rows, mines) {
      setBlankBoard(cols, rows);
      plantMines(cols, rows, mines);
      setTimeout(function() {
        $rootScope.$apply();
      }, 1000);
      return board;
    };
  });
