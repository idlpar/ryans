document.addEventListener("DOMContentLoaded", function () {
    // Sample Product Data (Can be replaced with API response)
    const sampleData = [
        {
            title: "Lenovo IdeaPad D330",
            link: "product-1",
            imageUrl: "/storage/products/thumbnail/product-1.webp",
            description: "10.1 Inch HD IPS Touch Display Mineral Grey Laptop",
            price: "BDT 27,500",
            discount: "Save Tk 1,200"
        },
        {
            title: "HP Pavilion 14",
            link: "product-2",
            imageUrl: "/storage/products/thumbnail/product-2.webp",
            description: "Intel Core i5, 8GB RAM, 512GB SSD",
            price: "BDT 48,000",
            discount: "Save Tk 2,000"
        },
        {
            title: "Samsung Galaxy S21",
            link: "product-3",
            imageUrl: "/storage/products/thumbnail/product-3.webp",
            description: "6.2 Inch Dynamic AMOLED, 128GB Storage",
            price: "BDT 85,000",
            discount: "Save Tk 5,000"
        },
        {
            title: "Logitech Wireless Mouse",
            link: "product-4",
            imageUrl: "/storage/products/thumbnail/product-4.webp",
            description: "Wireless Optical Mouse, Ergonomic Design",
            price: "BDT 1,500",
            discount: "Save Tk 200"
        }
    ];

    // Function to handle search for both desktop and mobile
    function handleSearch(searchBox, searchDropdown, searchResults) {
        const query = searchBox.value.toLowerCase();
        searchResults.innerHTML = "";

        if (query.length > 1) {
            const filteredResults = sampleData.filter(item =>
                item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
            );

            if (filteredResults.length > 0) {
                searchDropdown.classList.remove("hidden");
                filteredResults.forEach(item => {
                    const li = document.createElement("li");
                    li.classList.add("px-2", "py-2", "border-b", "border-gray-300", "hover:bg-gray-100", "cursor-pointer");

                    // Build the search result item
                    li.innerHTML = `
                        <a href="${item.link}" class="flex items-center space-x-3 p-1 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
                            <!-- Thumbnail -->
                            <span class="size-20 shrink-0 border border-lime-500 rounded-lg">
                                <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-full object-cover rounded-md shadow-sm">
                            </span>

                            <!-- Text Content -->
                            <span class="flex-1 text-sm">
                                <div class="text-left">
                                    <span class="font-semibold text-gray-800 truncate">${item.title}</span>
                                    <span class="block text-xs text-gray-500 mt-1 truncate">${item.description}</span>
                                </div>
                                <div class="text-left mt-1">
                                    <span class="text-sm font-medium text-gray-900">${item.price}</span>
                                    <span class="text-xs text-green-500 block mt-0.5">${item.discount}</span>
                                </div>
                            </span>
                        </a>
                    `;

                    li.addEventListener("click", function () {
                        searchBox.value = item.title;
                        searchDropdown.classList.add("hidden");
                    });

                    searchResults.appendChild(li);
                });
            } else {
                searchDropdown.classList.remove("hidden");
                const li = document.createElement("li");
                li.classList.add("px-4", "py-2", "text-center", "text-gray-900", "bg-teal-50", "rounded-lg");
                li.textContent = "Nothing found";
                searchResults.appendChild(li);
            }
        } else {
            searchDropdown.classList.add("hidden");
        }
    }

    // Desktop Search Elements
    const searchBox = document.getElementById("user-search-box");
    const searchDropdown = document.getElementById("search-dropdown");
    const searchResults = document.getElementById("search-results");

    searchBox.addEventListener("input", function () {
        handleSearch(searchBox, searchDropdown, searchResults);
    });

    // Mobile Search Elements
    const mobileSearchBox = document.querySelector("#mobile-search-box input[type='search']");
    const mobileSearchDropdown = document.getElementById("mobile-search-dropdown");
    const mobileSearchResults = document.getElementById("mobile-search-results");

    mobileSearchBox.addEventListener("input", function () {
        handleSearch(mobileSearchBox, mobileSearchDropdown, mobileSearchResults);
    });

    // Hide dropdowns when clicking outside
    document.addEventListener("click", function (e) {
        if (!searchBox.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.add("hidden");
        }

        if (!mobileSearchBox.contains(e.target) && !mobileSearchDropdown.contains(e.target)) {
            mobileSearchDropdown.classList.add("hidden");
        }
    });

    // Toggle Mobile Search Visibility
    document.getElementById('toggle-search').addEventListener('click', function () {
        const searchBox = document.getElementById('mobile-search-box');
        searchBox.classList.toggle('hidden');
    });
});
