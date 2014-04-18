'use strict';

angular.module('minesweeperApp')
  .controller('MainCtrl', function ($scope, MineBoard, $rootScope) {

    $scope.newGame = function() {
      $rootScope.gameModel = {
        result : undefined,
        isCheating : false,
        board : MineBoard.getNewBoard(8, 8, 10)
      };
    };

    $scope.reveal = function(cell, row, col) {
      if ($scope.gameModel.result !== undefined) {
        return;
      }

      cell.show = true;

      if (cell.hasBomb) {
        $scope.endGame(false);
        return;
      }

      if (cell.adjacentMines === 0) {
        $scope.propagateReveal(row, col);
      }
    };

    $scope.endGame = function(isWinner) {
      $scope.gameModel.result = isWinner;
    };

    $scope.cheat = function() {
      $scope.gameModel.isCheating = true;
    };

    $scope.validateGame = function() {
      if ($scope.gameModel.result !== undefined) {
        return;
      }
      var isWinner = true;
      for (var r = 0; r < $scope.gameModel.board.rows.length && isWinner; ++r) {
        for (var c = 0; c < $scope.gameModel.board.rows[r].cols.length && isWinner; ++c) {
          var cell = $scope.gameModel.board.rows[r].cols[c];
          if (cell.hasBomb && cell.show) {
            isWinner = false;
            break;
          }
          if (!cell.hasBomb && !cell.show) {
            isWinner = false;
            break;
          }
        }
      }
      return isWinner;
    };

    $scope.propagateReveal = function(row, col) {
      for (var r = row - 1; r <= row + 1; ++r) {
        for (var c = col - 1; c <= col + 1; ++c) {
          if ($scope.gameModel.board.rows[r] && $scope.gameModel.board.rows[r].cols[c] && !$scope.gameModel.board.rows[r].cols[c].show && (r !== row || c !== col)) {
            $scope.reveal($scope.gameModel.board.rows[r].cols[c], r, c);
          }
        }
      }
    };

    $scope.getAdjacentClass = function(cell) {
      return 'adjacent-' + cell.adjacentMines;
    };

    $scope.getFriendlyMessage = function() {
      if (!!$scope.gameModel) {
        if ($scope.gameModel.result === false) {
          $scope.friendlyClass = 'alert-danger';
          return 'Bad luck, you lost the game :(';
        }

        if ($scope.gameModel.result === true) {
          $scope.friendlyClass = 'alert-success';
          return 'Congratulations, you won! :)';
        }

        if (!!$scope.gameModel.board) {
          $scope.friendlyClass = 'alert-warning';
          return 'Game started! Good luck ;)';
        }
      }

      $scope.friendlyClass = 'alert-info';
      return 'Hit \'New Game\' to generate a board';
    };

  });
