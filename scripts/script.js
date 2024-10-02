var token
function slideto(a, b) {
    const page1 = document.getElementById(a)
    const page2 = document.getElementById(b)
    page2.classList.add('fixed', 'top-0', 'translate-x-[100%]')
    page2.classList.remove('hidden')
    setTimeout(() => {
        page2.classList.remove('translate-x-[100%]')
        page1.classList.add('-translate-x-[100%]')
    }, 0)
    setTimeout(() => {
        page1.classList.add('hidden')
        page1.classList.remove('-translate-x-[100%]')
        page2.classList.remove('fixed', 'top-0', 'translate-x-[100%]')
    }, 550)
}

function copy() {
    var copyText = document.getElementById('result-password')
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}

function create_password(hash) {
    const chars = '=KTwE_!%+uqWSrm5ldP7&XiYBNz^IfUxL#nGaAtk4b+Q69H$DhJcj8MpyF3Os*o0CR-g@v2V.1Ze'
    var result = ''
    for (let i = 0; i < hash.length; i += 2) {
        result += chars[parseInt(`0x${hash[i] + hash[i + 1]}`, 16) % chars.length]
    }
    return result.substring(0, 20)
}

function get_password() {
    const platform = document.getElementById('platform').value
    if (platform) {
        document.getElementById('platform').value = ''
        document.getElementById('result-password').value = create_password(Sha512.hash(token + platform))
    }
    else { 
        document.getElementById('result-password').value = ''
        show_toast('Platform can\'t be empty') 
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("password");
    slideto('unlock', 'create')
}

function show_toast(m) {
    const toast = document.getElementById('toast')
    document.getElementById('toast-span').innerHTML = m
    setTimeout(() => {
        toast.classList.remove('-bottom-24')
        toast.classList.add('bottom-0')
    }, 0)
    setTimeout(() => {
        toast.classList.add('-bottom-24')
        toast.classList.remove('bottom-0')
    }, 2000)
}

function set_to_lower(event) {
    event.target.value = event.target.value.toLowerCase().trim()
}

function clear_information() {
    var inputs = ['first-name', 'last-name', 'secret', 'masterpassword', 'c-masterpassword', 'master-password', 'platform', 'result-password']
    inputs.forEach(element => {
        document.getElementById(element).value = ''
    });
}

function unlock() {
    var mp = document.getElementById('master-password').value
    if (mp) {
        clear_information()
        document.getElementById('progress-span').innerHTML = 'Unlocking You Token'
        slideto('unlock', 'generation')
        data = mp
        let processToken = async (i) => {
            document.getElementById('progress').style.width = `${i * 4}%`;
            if (i < 25) {
                data = await shake256(data, 10000000);
                setTimeout(() => processToken(i + 1), 0);
            } else {
                password = Sha512.hash(data);
                var a = localStorage.getItem('password')
                if (password.substring(0, 4) === a) {
                    token = xor_hashes(password, token)
                    slideto('generation', 'home')
                }
                else {
                    slideto('generation', 'unlock')
                    show_toast('Incorrect Password')
                }
            }
        }
        setTimeout(() => { processToken(0) }, 100)
    }
}

function get_seed_information() {
    var first_name = document.getElementById('first-name').value
    var last_name = document.getElementById('last-name').value
    var secret = document.getElementById('secret').value
    if (first_name) {
        if (last_name) {
            if (secret) {
                return `${first_name}${last_name}${secret}`
            }
            else { show_toast('Secret can\'t be empty') }
        }
        else { show_toast('Last Name can\'t be empty') }
    }
    else { show_toast('First Name can\'t be empty') }
    return ''
}

async function encrypt_token() {
    var mp = document.getElementById('masterpassword').value
    var cmp = document.getElementById('c-masterpassword').value
    if (mp || cmp) {
        if (mp === cmp) {
            clear_information()
            document.getElementById('progress-span').innerHTML = 'Encrypting Your Token'
            slideto('protect', 'generation')
            data = mp
            let processToken = async (i) => {
                document.getElementById('progress').style.width = `${i * 4}%`;
                if (i < 25) {
                    data = await shake256(data, 10000000);
                    setTimeout(() => processToken(i + 1), 0);
                } else {
                    password = Sha512.hash(data);
                    token = xor_hashes(password, token)
                    localStorage.setItem("token", token)
                    localStorage.setItem("password", password.substring(0, 4))
                    slideto('generation', 'unlock')
                }
            }
            setTimeout(() => { processToken(0) }, 100)
        }
        else { show_toast('Passwords won\'t match') }
    }
    else { show_toast('Passwords can\'t be empty') }
}

function xor_hashes(hash1, hash2) {
    var result = ''
    for (let i = 0; i < hash1.length; i++) {
        result += (parseInt(`0x${hash1[i]}`, 16) ^ parseInt(`0x${hash2[i]}`, 16)).toString(16)
    }
    return result
}

async function create_token() {
    const progress = document.getElementById('progress')
    document.getElementById('progress-span').innerHTML = 'Creating your unique Token'
    var data = get_seed_information()
    if (data) {
        clear_information()
        document.getElementById('progress-span').innerHTML = 'Creating Your Unique Token'
        slideto('create', 'generation')
        let processToken = async (i) => {
            document.getElementById('progress').style.width = `${i / 5}%`;
            if (i < 5) {
                data = await shake256(data, 10000000);
                setTimeout(() => processToken(i + 1), 0);
            } else {
                token = Sha512.hash(data);
                slideto('generation', 'protect')
            }
        }
        setTimeout(() => { processToken(0) }, 100)
    }
}
addEventListener("DOMContentLoaded", (event) => {
    document.fonts.ready.then(() => {
        setTimeout(() => {
            if (localStorage.getItem('token')) {
                token = localStorage.getItem('token')
                slideto('loader', 'unlock')
            }
            else {
                slideto('loader', 'create')
            }
        }, 700);
    })
});