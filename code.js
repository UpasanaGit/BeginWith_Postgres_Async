// Method 1 of doing things - Callback
const getAll_1 = () => {
    sql = "SELECT * FROM product";
    pool.query(sql, [], (err, res) => {
        if (err) {
            console.log(err.message);
        }
        // res consist of 3 parameters - command, rowCount and rows(main returned data)
        console.log(res.rows);
    });
};

getAll_1();

// Method 2 - Promise - Same as Callback
const getAll_2 = () => {
    sql = "SELECT * FROM product";
    pool.query(sql, [])
        .then(res => {
            console.log(res.rows);
        })
        .catch(err => {
            console.log(err.message);
        });
};

getAll_2();

// Method 3 - Promise - Caller Side
const getAll_3 = () => {
    console.log("--- STEP 2: Inside getAll() ---");
    sql = "SELECT * FROM product";
    // For illustration, not using try catch
    return pool.query(sql, []);
};


console.log("--- STEP 1: Before call to getAll() ---");
getAll_3()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err.message);
    });
console.log("--- STEP 4: After call to getAll() ---");

// Method 4 - Async and await
const getAll_4 = async () => {
    console.log("--- STEP 2: Inside getAll() ---");
    sql = "SELECT * FROM product";
    try {
        const result = await pool.query(sql, []);
        console.log("--- STEP 3: No Error ---");
        return (result).rows;
    } catch (err) {
        console.log("--- STEP 3: Error ---");
        return err.message;
    };
};

(async () => {
    console.log("--- STEP 1: Before call to getAll() ---");
    const result = await getAll_4();
    console.log("--- STEP 4: After call to getAll() ---");
    console.log(result);
})()



// wrong way of multiple insert in loop

// Loop to insert - Contains logic error for summary stats
console.log("--- STEP 1: Pre-Loop");
for (prod of products) {
    console.log("--- STEP 2: In-Loop Before Insert");
    const result = dblib.insertProduct(prod);
    console.log("--- STEP 3: In-Loop After Insert");
    console.log("result is: ", result);
    if (result.trans === "success") {
        numInserted++;
    } else {
        numFailed++;
        errorMessage += `${result.msg} \r\n`;
    };
};
console.log("--- STEP 4: After-Loop");
console.log(`Records processed: ${numInserted + numFailed}`);
console.log(`Records successfully inserted: ${numInserted}`);
console.log(`Records with insertion errors: ${numFailed}`);
if (numFailed > 0) {
    console.log("Error Details:");
    console.log(errorMessage);
};