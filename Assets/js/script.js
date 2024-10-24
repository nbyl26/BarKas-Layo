// Header Transparant
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.style.backgroundColor = 'rgba(76, 175, 80, 0.8)'; 
    } else {
        header.style.backgroundColor = 'rgba(76, 175, 80, 0.9)'; 
    }
});

// Menampilkan Image yang di Input cuy
document.addEventListener("DOMContentLoaded", function() {
    setupImageUpload();
    displayItemDetails();
});

function setupImageUpload() {
    const imageInput = document.getElementById('product-image');
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgPreview = document.createElement('img');
                imgPreview.src = e.target.result;
                imgPreview.style.maxWidth = '100%';
                imgPreview.style.marginTop = '1rem';
                document.querySelector('.sell-form').appendChild(imgPreview);
            }
            reader.readAsDataURL(file);
        }
    });
}

// Menampilkan Detail item 
function displayItemDetails() {
    const params = new URLSearchParams(window.location.search);
    const item = params.get('item');

    const itemDetails = {
        laptop: {
            name: "Laptop Bekas",
            condition: "Kondisi: Baik, masih lancar",
            description: "Deskripsi: Laptop ini cocok untuk penggunaan sehari-hari, ideal untuk mahasiswa dan pekerja.",
            price: "Rp 3.500.000",
            image: "../Assets/img/laptop.png"
        },
        sepeda: {
            name: "Sepeda Gunung",
            condition: "Jarang Dipake, Like New",
            description: "Deskripsi: Sepeda Gunung sangat cocok untuk yang hobi mendaki gunung menggunakan sepeda",
            price: "Rp 2.200.000",
            image: "../Assets/img/bicycle.png" 
        },
        lemari: {
            name: "Lemari Kayu Jati",
            condition: "Kondisi: Sangat baik, hampir baru",
            description: "Deskripsi: Lemari ini terbuat dari kayu jati, sangat kokoh dan luas.",
            price: "Rp 5.200.000",
            image: "../Assets/img/cupboard.png" 
        },
    };

    const itemDetail = itemDetails[item];

    if (itemDetail) {
        document.querySelector('.info h2').textContent = itemDetail.name;
        document.querySelector('.condition').textContent = itemDetail.condition;
        document.querySelector('.description').textContent = itemDetail.description;
        document.querySelector('.price').textContent = itemDetail.price;
        document.querySelector('.item-image').src = itemDetail.image;
    } else {
        console.error("Item not found:", item);
        document.querySelector('.info').innerHTML = "<p>Item tidak ditemukan.</p>";
    }
}

document.addEventListener("DOMContentLoaded", displayItemDetails);

// Chat Bot
function toggleChat() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'block' : 'none';
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userMessage = input.value;

    // Tampilkan pesan pengguna
    if (userMessage) {
        const userMessageElement = document.createElement('div');
        userMessageElement.textContent = 'Anda: ' + userMessage;
        messagesContainer.appendChild(userMessageElement);
        
        // Menampilkan pesan balasan dari chatbot
        const botMessageElement = document.createElement('div');
        botMessageElement.textContent = getBotResponse(userMessage);
        messagesContainer.appendChild(botMessageElement);

        // Kosongkan input
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll ke bawah
    }
}

function sendTemplateMessage(templateMessage) {
    const messagesContainer = document.getElementById('chatbot-messages');

    // Tampilkan pesan template pengguna
    const userMessageElement = document.createElement('div');
    userMessageElement.textContent = 'Anda: ' + templateMessage;
    messagesContainer.appendChild(userMessageElement);
    
    // Menampilkan pesan balasan dari chatbot
    const botMessageElement = document.createElement('div');
    botMessageElement.textContent = getBotResponse(templateMessage);
    messagesContainer.appendChild(botMessageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll ke bawah
}


function getBotResponse(userMessage) {
    // Ganti dengan logika balasan chatbot Anda
    const responses = {
        "apa itu barkas layo?": "Barkas Layo adalah platform jual beli barang bekas.",
        "bagaimana cara berbelanja?": "Anda bisa memilih barang dan mengikuti instruksi di website.",
        "terima kasih": "Sama-sama! Jika ada pertanyaan lain, silakan tanyakan."
    };

    return responses[userMessage.toLowerCase()] || "Maaf, saya tidak mengerti pertanyaan itu.";
}

// Menginisialisasi Feather Icons
feather.replace();
