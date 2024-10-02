## [Token v1](https://token-v1.vercel.app/) - Secure Password Generation Tool

Welcome to Token v1, a secure and efficient client-side password generation tool built with modern cryptographic algorithms. Token v1 is designed to create unique, strong, and unguessable passwords for different platforms, ensuring maximum security without compromising usability. With a sleek UI and progressive hashing mechanisms, Token v1 offers a highly secure password generation experience, keeping everything securely client-side.

### Features
- **Client-Side Password Generation**: Token v1 performs all password generation operations locally in the browser, ensuring that no sensitive data is ever transmitted over the network.
- **Strong Cryptography**: Utilizes the SHA-512 and SHAKE256 hashing algorithms to generate robust passwords that can resist brute-force and dictionary attacks.
- **Secure Token Creation**: Users can create a unique cryptographic token using their personal information, which is then encrypted with a master password.
- **Master Password Protection**: Your token is protected with a master password that is never stored directly. Instead, only a hashed portion of it is kept for verification.
- **Platform-Specific Passwords**: Easily generate a new password for each platform by simply providing the platform name. The password is uniquely generated using your token and the platform name.
- **Local Storage**: Token and password data are securely stored in the browser’s local storage, allowing for persistent sessions without the need for reauthentication.
- **Responsive UI**: The interface includes smooth page transitions and real-time feedback to enhance user experience.
- **Progressive Hashing**: The hashing process is iterated multiple times to slow down any brute-force attacks, ensuring higher security.
- **Copy to Clipboard**: Once a password is generated, it can be copied to your clipboard with one click for easy use.

### How It Works
1. **Seed Generation**: When you first use Token v1, you will provide personal information (first name, last name, and a secret). This information is combined into a "seed," which is used to create a unique cryptographic token. The seed is hashed using the SHAKE256 algorithm to generate a token, which will be securely stored for future use.
2. **Master Password Protection**: The cryptographic token is then encrypted using a master password that you define. This password is hashed using SHA-512 and is never stored directly. Only a portion of the hash is saved to verify the password upon unlocking the token.
3. **Password Generation**: When you need a password for a specific platform, you provide the platform name, which is combined with your stored token and hashed using SHA-512. The result is used to generate a strong, platform-specific password, ensuring that each service you use has a unique and secure password.
4. **Unlocking the Token**: Once you've encrypted the token, you’ll need to unlock it using your master password whenever you want to generate passwords. This adds an extra layer of security, ensuring that your token is never exposed without proper authentication.
5. **Encryption and Decryption**: The XOR-based encryption mechanism combines the master password hash and the token hash to securely encrypt the token. Upon unlocking, the same process is reversed to decrypt the token for use.

### Usage
1. **Create Your Unique Token**:
   - Enter your first name, last name, and a secret word.
   - A unique cryptographic token will be generated and securely stored.
2. **Set a Master Password**:
   - Encrypt your token with a master password. This password will be used to unlock your token in the future.
3. Generate Platform-Specific Passwords:
   - When needed, enter the platform name (e.g., "gmail") and generate a secure password unique to that platform.
   - Copy the generated password to your clipboard for quick use.
4. Unlock Your Token:
   - If your session expires or you restart the application, simply unlock your token by providing your master password.

### Security Considerations
- **Client-Side Only**: All operations, including password generation and token management, are handled entirely on the client side. No data is transmitted to any external server, ensuring privacy and security.
- **Strong Hashing Algorithms**: SHA-512 and SHAKE256 are used for password and token hashing, ensuring cryptographic strength.
- **Progressive Hashing**: Token encryption and password verification are performed with progressive iterations of SHAKE256, increasing the security against brute-force attacks.
- **Secure Local Storage**: Your token and password hashes are securely stored in the browser’s `localStorage`, ensuring persistence across sessions without compromising security.

Token v1 is a simple yet powerful tool to help you manage your passwords securely. With strong cryptography and client-side processing, you can trust that your data stays private while enjoying the convenience of unique password generation for every platform you use. Happy securing!
