document.getElementById('generateBtn').addEventListener('click', generatePassword);
document.getElementById('copyBtn').addEventListener('click', copyPassword);
document.getElementById('length').addEventListener('input', updateLength);

function generatePassword() {
    const length = document.getElementById('length').value;
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSpecialChars = document.getElementById('specialChars').checked;

    let characters = '';
    if (useUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) characters += '0123456789';
    if (useSpecialChars) characters += '!@#$%^&*()_+~[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    document.getElementById('password').textContent = password;
    updateStrength(password);
}

function copyPassword() {
    const password = document.getElementById('password').textContent;
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    });
}

function updateStrength(password) {
    const strengthLines = document.querySelectorAll('.strength-line');
    const weakThreshold = 8;
    const mediumThreshold = 12;

    let strength = 0;

    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*()_+~[\]{}|;:,.<>?]/.test(password)) strength++;
    if (password.length >= mediumThreshold) strength++;

    strengthLines.forEach((line, index) => {
        if (index < strength) {
            if (strength <= weakThreshold) {
                line.style.backgroundColor = 'red';
            } else if (strength <= mediumThreshold) {
                line.style.backgroundColor = 'yellow';
            } else {
                line.style.backgroundColor = 'green';
            }
        } else {
            line.style.backgroundColor = '#ccc';
        }
    });
}

function updateLength() {
    const length = document.getElementById('length').value;
    document.getElementById('generateBtn').click();
}
