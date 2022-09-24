function fetchNameAndGreet() {
    const name = document.querySelector('#name').value;
    const greeting = `Hello, ${name}!`;
    document.querySelector('#greet').innerText = greeting;
}

document.querySelector('#name').addEventListener('keyup', fetchNameAndGreet);
