import crypto from "crypto";
import { signToken } from "middlewares/auth.middleware";
import { sendVerificationEmail } from "services/email.service";

// Function to hash a password
function hashPassword(password: string) {
 const salt = crypto.randomBytes(16).toString("hex");

 const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
 const saltedHash = `${hash}.${salt}`;
 return saltedHash;
}
function verifyPassword(password: string, hash: string) {
 const [hashed, salt] = hash.split(".");
 const hashToVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
 return hashed === hashToVerify;
}

async function sendNewVerificationLink(email: string, firstName: string) {
 const token = signToken({ email: email }, "24h");
 const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
 // Send verification email
 await sendVerificationEmail(email, firstName, verifyUrl);
}

export { hashPassword, verifyPassword, sendNewVerificationLink };
