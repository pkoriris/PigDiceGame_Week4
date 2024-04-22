// pigDice.js

class PigDice {
    constructor(players = 2, winningScore = 100) {
      this.players = players;
      this.scores = Array.from({ length: players }, () => 0);
      this.currentPlayer = 0;
      this.currentRoundScore = 0;
      this.winningScore = winningScore;
    }
  
    rollDie() {
      return Math.floor(Math.random() * 6) + 1;
    }
  
    switchPlayer() {
      this.currentPlayer = (this.currentPlayer + 1) % this.players;
      this.currentRoundScore = 0;
    }
  
    roll() {
      const roll = this.rollDie();
      if (roll === 1) {
        this.currentRoundScore = 0;
        this.switchPlayer();
      } else {
        this.currentRoundScore += roll;
      }
      return roll;
    }
  
    hold() {
      this.scores[this.currentPlayer] += this.currentRoundScore;
      if (this.scores[this.currentPlayer] >= this.winningScore) {
        return `${this.currentPlayer + 1} wins!`;
      } else {
        this.switchPlayer();
        return 'Switching player...';
      }
    }
  }
  
  module.exports = PigDice;
  