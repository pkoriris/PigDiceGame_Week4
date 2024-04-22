// pigDice.test.js

const PigDice = require('./pigDice');

describe('PigDice', () => {
  let game;

  beforeEach(() => {
    game = new PigDice(2, 100);
  });

  test('rollDie should return a number between 1 and 6', () => {
    for (let i = 0; i < 100; i++) {
      const roll = game.rollDie();
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(6);
    }
  });

  test('switchPlayer should change the current player', () => {
    game.switchPlayer();
    expect(game.currentPlayer).toBe(1);
  });

  test('roll should return a number and switch player if 1 is rolled', () => {
    jest.spyOn(game, 'rollDie').mockReturnValue(1);
    const roll = game.roll();
    expect(roll).toBe(1);
    expect(game.currentRoundScore).toBe(0);
    expect(game.currentPlayer).toBe(1);
  });

  test('roll should return a number and add to current round score if not 1', () => {
    jest.spyOn(game, 'rollDie').mockReturnValue(3);
    const roll = game.roll();
    expect(roll).toBe(3);
    expect(game.currentRoundScore).toBe(3);
  });

  test('hold should switch player and return "Switching player..."', () => {
    const result = game.hold();
    expect(result).toBe('Switching player...');
    expect(game.currentPlayer).toBe(1);
  });

  test('hold should declare winner if winning score is reached', () => {
    game.scores[0] = 99;
    jest.spyOn(game, 'rollDie').mockReturnValue(2);
    game.roll(); // Player 1 rolls a 2
    const result = game.hold(); // Player 1 holds
    expect(result).toBe('1 wins!');
  });
});
