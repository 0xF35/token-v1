# Token v1 - Unique And Strong Passwords For Every Platform
[Visit Website](https://token-v1.vercel.app/)

Secure Client-side password generation tool. Create strong, unique passwords using a cryptographic token based on your inputs.

## Agreement Before Continuing
- **Client-Side Functionality**: *Token operates fully on the client side. It uses the information you provide to generate a token through cryptographic calculations, encrypts the token, and stores it locally in your browser. You must use the same master password for both encryption and decryption of the token.*
- **User Responsibility**: *It is your responsibility to remember the information provided during token generation (e.g., First Name, Last Name, Secret) and the platform name or URL. If you forget any of these, there is no way to recover your token or password.*
- **Secret Information**: *The "Secret" can be any unique, permanent information that you can easily recall, such as a Social Security Number or any other identifier that is personal and memorable to you.*
- **No Recovery Option**: *Token has no recovery mechanism for forgotten tokens or information. You bear full responsibility for remembering all inputs provided during token generation.*

## Add as APP
- On Desktop
  - Goto 3 Dots while viewing Token's Website
  - In "**Cast, save and share**", Click "**Install page as app.**"
- On Mobile
  - Share -> Add to HomeScreen

## An Open Source Project
Javascript code is obfuscated due to security reasons at runtime, but here's the brief information on working.

The token is generated using two hashing algorithms, SHA512 and SHAKE256. The user's input is first hashed with SHAKE256 over 500 iterations, producing an output of 10,000,000 bits (1.25 MB). The result from the final (500th) iteration is then hashed using the SHA512 algorithm to create the token.

For the master password, the same process is followed, but with only 25 iterations of SHAKE256. The resulting hash of the master password is then XORed with the token to produce an encrypted token, which is subsequently stored in the browser's local storage.

---

**Generating Token**
```javascript
// Get User Information
const first_name = 'token'
const last_name = 'v1'
const secret = 'secret?'
const iterations = 500 // 25 iterations for master password

// Make Single String
var data = first_name + last_name + secret // tokenv1secret?

// 500 Iterations of shake256
for(let i = 0; i < 500; i++){
  data = shake256(data, 1000000)
}
token = Sha512.hash(data)
```

**Encrypt Token with master password**
```javascript
function xor_hashes(hash1, hash2){
  var result = ''
  for (let i = 0; i < hash1.length; i++) {
    result += (parseInt(`0x${hash1[i]}`, 16) ^ parseInt(`0x${hash2[i]}`, 16)).toString(16)
  }
  return result
}
```
