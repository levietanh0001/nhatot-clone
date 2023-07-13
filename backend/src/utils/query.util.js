// async function rawQuery(query, replacements, type) {
//   return await queryInterface.sequelize.query(`
//   SELECT count(*) from nhatot.product
// `, { type: QueryTypes.SELECT });
// }


function getValueFromQueryResult(result) {
  const value = result.length > 1? Object.values(result[0][0])[0]: Object.values(result[0])[0];
  return value;
}

module.exports = {
  getValueFromQueryResult
}