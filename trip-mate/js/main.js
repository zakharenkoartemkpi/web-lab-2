const tourTitles = document.querySelectorAll('.tour-grid article h3');

tourTitles.forEach(title => {

    title.style.color = '#F59E0B';
    
});


const mainContainer = document.querySelector('main');

if (mainContainer) {
    const newParagraph = document.createElement('p');

    newParagraph.textContent = 'Дякуємо, що обираєте TripMate для своїх подорожей!';

    newParagraph.style.textAlign = 'center';
    newParagraph.style.color = '#064E3B';
    newParagraph.style.marginTop = '40px';
    newParagraph.style.fontWeight = 'bold';

    mainContainer.append(newParagraph);
}

const dateSpan = document.getElementById('current-date');

if (dateSpan) {
    const today = new Date();
    const currentYear = today.getFullYear();
    dateSpan.textContent = currentYear;
}


const toggleBtn = document.getElementById('toggle-btn');
const moreText = document.getElementById('more-text');

if (toggleBtn && moreText) {
    
    toggleBtn.addEventListener('click', function() {
        
        if (moreText.style.display === 'none') {
            moreText.style.display = 'block'; 
            toggleBtn.textContent = 'Згорнути історію';
        } else {
            moreText.style.display = 'none';
            toggleBtn.textContent = 'Читати історію';
        }
        
    });

    
}

const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

function updateButtonText() {
    if (body.classList.contains('dark-theme')) {
        themeBtn.textContent = '☀️ Світла тема';
        themeBtn.style.background = '#333';
        themeBtn.style.color = '#fff';
    } else {
        themeBtn.textContent = '🌙 Темна тема';
        themeBtn.style.background = 'white';
        themeBtn.style.color = '#333';
    }
}

const savedTheme = localStorage.getItem('site-theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
}

if (themeBtn) {
    updateButtonText();

    themeBtn.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        updateButtonText();
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('site-theme', 'dark');
        } else {
            localStorage.setItem('site-theme', 'light');
        }
    });
}


let currentFontSize = 16; 

document.addEventListener('keydown', function(event) {
    
    if (event.key === 'ArrowUp') {
        currentFontSize += 1;
        document.body.style.fontSize = currentFontSize + 'px';
        console.log('Шрифт збільшено:', currentFontSize);
    }
    
    else if (event.key === 'ArrowDown') {
        if (currentFontSize > 10) {
            currentFontSize -= 1;
            document.body.style.fontSize = currentFontSize + 'px';
            console.log('Шрифт зменшено:', currentFontSize);
        }
    }
});

const contactForm = document.getElementById('contact-form');

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.classList.add('input-error');
    
    field.after(errorDiv);
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('.input-error');
    inputs.forEach(input => input.classList.remove('input-error'));
}


if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        clearErrors();
        
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const message = document.getElementById('user-message').value;
        
        let isValid = true;
        
        if (name.length < 3) {
            showError('user-name', 'Ім\'я має містити мінімум 3 символи');
            isValid = false;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            showError('user-email', 'Введіть коректний email (наприклад: test@mail.com)');
            isValid = false;
        }
        
        if (message.length < 10) {
            showError('user-message', 'Повідомлення занадто коротке (мінімум 10 символів)');
            isValid = false;
        }
        
        if (isValid) {
            console.log('Дані форми:', { name, email, message });
            alert('Форма успішно надіслана! Ми зв\'яжемося з вами.');
            contactForm.reset();
        }
    });
}