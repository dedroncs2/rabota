'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'Todos',
      'done',
      Sequelize.BOOLEAN
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        'Todos',
        'done'
      );
  }
};
