console.log("Connected");

const CategoryEnum = {
    MEN: 0,
    WOMEN: 1,
    KIDS: 2,
};

function categoryRender(data,category) {
    console.log(category)
    let value = CategoryEnum[category]
    console.log(value)
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    for (var i = 0; i < data.categories[value].category_products.length; i++) {
        let product = data.categories[value].category_products[i];
        var productCard = `
<div class="product-card">
<img src="${product.image}" alt="${product.second_image}" class="product-image">`
        if (product.badge_text != null) {
            productCard += `<div class="product-badge">${product.badge_text}</div>`
        }
        productCard +=
            `<div class="product-title"><h3>${product.title} <span class="dot">${product.vendor}</span></h3></div>
<div class="product-price"><p>Rs.${product.price} <s>${product.compare_at_price}</s> <span>${calculateDiscount(product.price, product.compare_at_price)}%off</span></p></div>
<button class="add-to-cart">Add to Cart</button>
</div>
`;
        productsContainer.innerHTML += productCard;
    };
}

const changeTab = (data,category) => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabs.forEach(tab => {
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
    categoryRender(data,category);
};

const calculateDiscount = (price, compareAtPrice) => {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
};

fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ERROR! Status : ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
        categoryRender(data,'MEN');
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                changeTab(data, category); // Call changeTab with data and category
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error));
