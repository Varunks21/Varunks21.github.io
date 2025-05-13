let customers = [];
let currentIndex = 0;
const customersPerRow = 4;  // Desktop view
const rowsPerLoad = 10;
const customerGrid = document.querySelector('.customer-grid');

function renderCustomers() {
    const totalToShow = rowsPerLoad * customersPerRow;
    const nextCustomers = customers.slice(currentIndex, currentIndex + totalToShow);

    for (let i = 0; i < nextCustomers.length; i += customersPerRow) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('customer-row');
        
        // Remove any inline styles that might override our CSS
        rowDiv.style.display = '';
        rowDiv.style.justifyContent = '';
        rowDiv.style.gap = '';
        rowDiv.style.marginBottom = '';

        nextCustomers.slice(i, i + customersPerRow).forEach(customer => {
            const card = document.createElement('div');
            card.classList.add('customer-card');
            card.innerHTML = `
                <img src="${customer.logo}" alt="${customer.name}" class="company-logo">
                <h3>${customer.name}</h3>
                <p class="industry">${customer.industry}</p>
                <p class="location">${customer.location}</p>
            `;
            rowDiv.appendChild(card);
        });

        customerGrid.appendChild(rowDiv);
    }

    currentIndex += totalToShow;

    // Stop if all customers are loaded
    if (currentIndex >= customers.length) {
        window.removeEventListener('scroll', handleScroll);
    }
}

function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
        renderCustomers();
    }
}

fetch('customers4.json')
    .then(response => response.json())
    .then(data => {
        customers = data;
        renderCustomers();
        window.addEventListener('scroll', handleScroll);
    })
    .catch(error => console.error('Error loading customer data:', error));
