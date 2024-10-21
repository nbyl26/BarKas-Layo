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

function displayItemDetails() {
    const params = new URLSearchParams(window.location.search);
    const item = params.get('item');

    const itemDetails = {
        laptop: {
            name: "Laptop Bekas",
            condition: "Kondisi: Baik, masih lancar",
            description: "Laptop ini cocok untuk penggunaan sehari-hari, ideal untuk mahasiswa dan pekerja.",
            price: "Rp 3.500.000",
            image: "Assets/img/laptop.png"
        },
        sepeda: {
            name: "Sepeda Gunung",
            condition: "Jarang Dipake, Like New",
            description: "Sepeda Gunung sangat cocok untuk yang hobi mendaki gunung menggunakan sepeda",
            price: "Rp 2.200.000",
            image: "Assets/img/bicycle.png" 
        },
        lemari: {
            name: "Lemari Kayu Jati",
            condition: "Kondisi: Sangat baik, hampir baru",
            description: "Lemari ini terbuat dari kayu jati, sangat kokoh dan luas.",
            price: "Rp 5.200.000",
            image: "Assets/img/cupboard.png" 
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
    }
}
