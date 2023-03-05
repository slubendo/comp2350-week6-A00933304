const database = include('/databaseConnection');


async function getAllRestaurants() { 	
	let sqlQuery = `
		SELECT restaurant_id, name, description
		FROM restaurant;
	`;

	try {
		const results = await database.query(sqlQuery);
		console.log(results[0]);
		return results[0];
	}
	catch (err) {
		console.log("Error selecting from restaurant table");
		console.log(err);
		return null;
	}
}

async function getAllReviews() {
	let sqlQuery = `
		SELECT review_id, restaurant, reviewer_name,details, rating
		FROM review;
	`;

	try {
		const results = await database.query(sqlQuery);
		console.log(results[0]);
		return results[0];
	}
	catch (err) {
		console.log("Error selecting from review table");
		console.log(err);
		return null;
	}
}

async function addRestaurant(postData) {
	console.log(postData)
	let sqlInsertSalt = `
   INSERT INTO restaurant (name, description)
   VALUES (:first_name, :last_name);
   `;
	let params = {
		first_name: postData.first_name,
		last_name: postData.last_name,
	};
	console.log(sqlInsertSalt);
	try {
		const results = await database.query(sqlInsertSalt, params);
		let insertedID = results.insertId;

	} catch (err) {
		console.log(err);
		return false;
	}
}

async function addReview(postData) {
	let sqlInsertSalt = `
   INSERT INTO review (restaurant, reviewer_name, details, rating)
   VALUES (:first_name, :last_name, :email, :last_name);
   `;
	let params = {
		first_name: postData.first_name,
		last_name: postData.last_name,
		email: postData.email
	};
	console.log(sqlInsertSalt);
	try {
		const results = await database.query(sqlInsertSalt, params);
		let insertedID = results.insertId;

	} catch (err) {
		console.log(err);
		return false;
	}
}

async function deleteRestaurant(userId) {
	console.log(userId)
	let sqlDeleteUser = `
   DELETE FROM restaurant
   WHERE restaurant_id = :userId
   `;
	let params = {
		userId: userId
	};
	console.log(sqlDeleteUser);
	try {
		await database.query(sqlDeleteUser, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

async function deleteReview(userId) {
	let sqlDeleteUser = `
   DELETE FROM restaurant
   WHERE restaurant_review_id = :userId
   `;
	let params = {
		userId: userId
	};
	console.log(sqlDeleteUser);
	try {
		await database.query(sqlDeleteUser, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}


module.exports = { getAllRestaurants, getAllReviews, addRestaurant, deleteRestaurant, deleteReview, addReview }
