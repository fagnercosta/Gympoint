import Sequelize from 'sequelize';
import Student from '../app/model/Student';
import User from '../app/model/User';
import databaseConfig from '../config/database';

const models = [Student, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
