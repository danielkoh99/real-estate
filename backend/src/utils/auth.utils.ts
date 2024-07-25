import crypto from "crypto";
// Function to hash a password
function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const saltedHash = `${hash}.${salt}`;
  return saltedHash;
}
function verifyPassword(password: string, hash: string) {
  const [hashed, salt] = hash.split(".");
  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hashed === hashToVerify;
}

// const hashed = hashPassword("admin");
// const isValid = verifyPassword("admin", hashed);

// console.log(`Password is valid: ${isValid}, hash: ${hashed}`);
export { hashPassword, verifyPassword };
