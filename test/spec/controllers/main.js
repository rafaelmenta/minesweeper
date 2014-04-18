'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('minesweeperApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
    scope.newGame();
  }));

  it('should set a new game', function () {
    expect(scope.gameModel.result).toBeUndefined();
    expect(scope.gameModel.isCheating).toBe(false);
    expect(scope.gameModel.board).toBeDefined();
  });

  it('should reveal a cell', function() {
    var cell = scope.gameModel.board.rows[0].cols[0];
    scope.reveal(cell, 0, 0);
    expect(cell.show).toBe(true);
  });

  it('should propagate empty cells properly', function() {
    var board = {
      rows : [{
        cols : [{
          hasBomb : false,
          adjacentMines : 0,
          show : false
        }, {
          hasBomb : false,
          adjacentMines : 0,
          show : false
        }]
      }]
    };

    scope.gameModel.board = board;
    var cell = scope.gameModel.board.rows[0].cols[1];
    scope.propagateReveal(0, 0);
    expect(cell.show).toBe(true);
  });

  it('should validate a winner game', function() {
    var board = {
      rows : [{
        cols : [{
          hasBomb : true,
          adjacentMines : 0,
          show : false
        }, {
          hasBomb : false,
          adjacentMines : 0,
          show : true
        }]
      }]
    };

    scope.gameModel.board = board;
    var winnerGame = scope.validateGame();
    expect(winnerGame).toBe(true);
  });

  it('should cheat :(', function() {
    scope.cheat();
    expect(scope.gameModel.isCheating).toBe(true);
  });

  it('should end my game', function() {
    scope.endGame(true);
    expect(scope.gameModel.result).toBe(true);
  });

  it('should give me the correct class for adjacency', function() {
    var cell = { adjacentMines : 3 };
    var clzz = scope.getAdjacentClass(cell);
    expect(clzz).toBe('adjacent-3');
  });

  it('should be friendly', function() {
    var friendlyMessage = scope.getFriendlyMessage();
    expect(friendlyMessage).toBe('Game started! Good luck ;)');
    expect(scope.friendlyClass).toBe('alert-warning');
  });
});
