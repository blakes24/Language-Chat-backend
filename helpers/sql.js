/** Creates SQL to to filter users by the languages they speak and/or learn. 
 *
 * Params can include: {speaks, learning}
 * 
 * Returns: {whereCols, values}
 *  e.g. {
			whereCols : "ll.code = $1",
			values    : [ 'en' ]
		}
 * 
 * */

function sqlForLangFilter(filters) {
  const keys = Object.keys(filters);
  // return default values if not filters were passed
  if (!keys.length) {
    return {
      whereCols: "",
      values: [],
    };
  }

  const cols = [];
  // {speaks: 'en', learning: 'es'} => ["l1.code = $1", "l2.code = $2"]
  for (const [i, key] of keys.entries()) {
    if (key === "learning") {
      cols.push(`l2.code = $${i + 1}`);
    } else {
      cols.push(`l1.code = $${i + 1}`);
    }
  }
  return {
    whereCols: "WHERE " + cols.join(" AND "),
    values: Object.values(filters),
  };
}

/** Creates SQL for a partial update.
 *
 * It takes an object of items to be updated and an object to convert any camelCase keys to the appropriate snake_case name for the column.
 *
 * Returns: {setCols, values}
 *  e.g. { setCols : "first_name=$1, age=$2", values: ["Aliya", 32] }
 *
 * */

function sqlForUpdate(data, jsToSql) {
	// checks for empty data object
	const keys = Object.keys(data);
	if (keys.length === 0) throw new ExpressError('No data');

	// {name: 'Aliya'} => ['first_name=$1']
	const cols = keys.map((colName, idx) => `${jsToSql[colName] || colName}=$${idx + 1}`);

	// returns string of columns and an array of corresponding values
	return {
		setCols : cols.join(', '),
		values  : Object.values(data)
	};
}

module.exports = { sqlForLangFilter, sqlForUpdate };
