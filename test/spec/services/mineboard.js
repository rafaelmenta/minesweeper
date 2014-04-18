'use strict';

describe('Service: MineBoard', function () {

  // load the service's module
  beforeEach(module('minesweeperApp'));

  // instantiate service
  var MineBoard;
  beforeEach(inject(function (_MineBoard_) {
    MineBoard = _MineBoard_;
  }));

  it('should be initialized', function () {
    expect(!!MineBoard).toBe(true);
  });

  it('should set a blank board', function() {
    var board = MineBoard.getNewBoard(1, 1);
    setTimeout(function() {
      expect(board.rows.length).toBe(1);
      expect(board.rows[0].cols.length).toBe(1);
      expect(board.rows[0].cols[0].hasBomb).toBe(false);
    }, 2000);
  })

});
