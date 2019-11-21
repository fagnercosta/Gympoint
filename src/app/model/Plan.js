import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        titlle: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Plan();
