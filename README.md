![](https://github.com/0xF35/token/blob/620f09072853dc1b3074b85c3edacdf775b902bc/Asset%201.svg)

## Agreement Before Continuing
- **Client-Side Functionality**: *Token operates fully on the client side. It uses the information you provide to generate a token through cryptographic calculations, encrypts the token, and stores it locally in your browser. You must use the same master password for both encryption and decryption of the token.*
- **User Responsibility**: *It is your responsibility to remember the information provided during token generation (e.g., First Name, Last Name, Secret) and the platform name or URL. If you forget any of these, there is no way to recover your token or password.*
- **Secret Information**: *The "Secret" can be any unique, permanent information that you can easily recall, such as a Social Security Number or any other identifier that is personal and memorable to you.*
- **No Recovery Option**: *Token has no recovery mechanism for forgotten tokens or information. You bear full responsibility for remembering all inputs provided during token generation.*

## An Open Source Project
Javascript code is obfuscated due to security reasons at runtime, but here's the brief information on working.

The token is generated using two hashing algorithms, SHA512 and SHAKE256. The user's input is first hashed with SHAKE256 over 500 iterations, producing an output of 10,000,000 bits (1.25 MB). The result from the final (500th) iteration is then hashed using the SHA512 algorithm to create the token.

For the master password, the same process is followed, but with only 25 iterations of SHAKE256. The resulting hash of the master password is then XORed with the token to produce an encrypted token, which is subsequently stored in the browser's local storage.
