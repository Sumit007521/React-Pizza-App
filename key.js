// Example 1: SQL Injection
const userInput = req.query.id;
const query = "SELECT * FROM users WHERE id = " + userInput; 
db.execute(query); // ❌ vulnerable

// Example 2: Command Injection
const fileName = req.body.file;
exec("rm -rf " + fileName); // ❌ vulnerable

// Example 3: Insecure Cryptography
const cipher = crypto.createCipher('aes-128-ecb', 'password'); // ❌ weak algorithm

// Example 4: Hardcoded credentials (sometimes flagged)
const username = "admin";
const GH_TOKEN = "ghp_abcdEFGH1234567890ijklMNOPqrstUVWXyz12"; // ❌ insecure practice


