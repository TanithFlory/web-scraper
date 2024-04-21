import bcrypt from "bcrypt";

/**
 * Encrypts a password using bcrypt hashing algorithm.
 *
 * @param password - The password to be encrypted.
 * @returns A Promise that resolves to the hashed password.
 */
export async function encryption(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

/**
 * Compares a password with its hashed version to verify if they match.
 *
 * @param password - The password to be compared.
 * @param hash - The hashed password to compare against.
 * @returns A Promise that resolves to a boolean indicating whether the password matches the hash.
 */
export async function decryption(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
