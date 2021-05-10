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

module.exports = { sqlForLangFilter };
