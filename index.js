
(async () => {

    const productContainerEl = document.getElementById("productContainer");
    const searchInputEl = document.getElementById("searchInput");

    const url = "https://fakestoreapi.com/products";
    const fetchProducts = async () => {
        try {
            const res = await fetch(url);
            return await res.json();
        }
        catch (error) {
            return error;
        }
    };
    const products = await fetchProducts();
    console.log(products)

    const generateProducts = (products) => {
        return `<div class="product_card">
                    <div class="image_container"><img src="${products.image}"></div>
                    <div class="product_content">
                        <h2>${products.title}</h2>
                        <p>${products.description.split(" ").slice(0, 20).join(" ")}</p>
                        <button>${products.price} $</button>
                    </div>
                </div> `
    };

    // Render Product's

    const renderProducts = (products) => {
        productContainerEl.innerHTML = "";

        products.forEach((product) => {
            productContainerEl.innerHTML += generateProducts(product)
        });
    }

    // Filter Product's

    const filterHandler = (event) => {

        const searchText = event.target.value.toLowerCase();
        const filterProducts = products.filter((product) => {
            return product.title.toLowerCase().includes(searchText);
        })
        renderProducts(filterProducts);
    };

    searchInputEl.addEventListener("keydown", filterHandler);

    renderProducts(products)

})();