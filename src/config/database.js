module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'root',
  database: 'gympoint',
  define: {
    timestamps: true,
    underscored: true,
    underscodedAll: true,
  },
};
