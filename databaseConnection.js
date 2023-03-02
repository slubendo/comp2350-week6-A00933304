const mysql = require('mysql2/promise');

const is_qoddi = process.env.IS_QODDI || false;

const dbConfigQoddi = {
	host: "sql.freedb.tech",
	user: "freedb_2350_mai",
	password: "QF&#t#tYSbC!5J3",
	database: "freedb_comp2350-week2-A00933304",
	multipleStatements: false,
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "7434Vuvu",
	database: "restaurant_review",
	multipleStatements: false,
};

if (is_qoddi) {
	var database = mysql.createPool(dbConfigQoddi);

}else {
	var database = mysql.createPool(dbConfigLocal);
}


module.exports = database;
		