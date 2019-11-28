import Sequelize from 'sequelize';
import Student from '../app/model/Student';
import User from '../app/model/User';
import Plan from '../app/model/Plan';
import Checkin from '../app/model/Checkin';
import Enrollment from '../app/model/Enrollment';
import databaseConfig from '../config/database';

const models = [Student, User, Plan, Enrollment, Checkin];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
