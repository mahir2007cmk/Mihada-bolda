document.addEventListener('DOMContentLoaded', () => {
    const addItemBtn = document.getElementById('add-item-btn');
    const itemsContainer = document.getElementById('items');
    const totalAmountEl = document.getElementById('total-amount');
    
    let totalAmount = 0;
  
    addItemBtn.addEventListener('click', () => {
      const newItem = document.createElement('div');
      newItem.classList.add('item');
      
      newItem.innerHTML = `
        <input type="text" placeholder="Item Name">
        <input type="number" placeholder="Quantity" class="quantity">
        <input type="number" placeholder="Rate" class="rate">
        <input type="number" placeholder="Amount" class="amount" readonly>
      `;
      
      itemsContainer.appendChild(newItem);
      
      const quantityInput = newItem.querySelector('.quantity');
      const rateInput = newItem.querySelector('.rate');
      const amountInput = newItem.querySelector('.amount');
      
      quantityInput.addEventListener('input', updateAmount);
      rateInput.addEventListener('input', updateAmount);
      
      function updateAmount() {
        const quantity = parseFloat(quantityInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        const amount = quantity * rate;
        
        amountInput.value = amount.toFixed(2);
        updateTotal();
      }
      
      function updateTotal() {
        totalAmount = Array.from(document.querySelectorAll('.amount'))
          .map(input => parseFloat(input.value) || 0)
          .reduce((acc, curr) => acc + curr, 0);
        
        totalAmountEl.textContent = totalAmount.toFixed(2);
      }
    });
  
    // Generate PDF using jsPDF
    document.getElementById('generate-pdf-btn').addEventListener('click', () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      // Get invoice details
      const invoiceNumber = document.getElementById('invoice-number').value;
      const invoiceDate = document.getElementById('invoice-date').value;
      const yourBusinessName = document.getElementById('your-business-name').value;
      const yourAddress = document.getElementById('your-address').value;
      const clientBusinessName = document.getElementById('client-business-name').value;
      const clientAddress = document.getElementById('client-address').value;
      const totalAmount = document.getElementById('total-amount').textContent;
  
      // Add invoice title
      doc.setFontSize(18);
      doc.text("Invoice", 10, 10);
  
      // Add invoice details
      doc.setFontSize(12);
      doc.text(`Invoice No: ${invoiceNumber}`, 10, 20);
      doc.text(`Invoice Date: ${invoiceDate}`, 10, 30);
      doc.text(`Billed By: ${yourBusinessName}`, 10, 40);
      doc.text(yourAddress, 10, 50);
      doc.text(`Billed To: ${clientBusinessName}`, 10, 60);
      doc.text(clientAddress, 10, 70);
  
      // Add table header for items
      doc.text("Item Name", 10, 80);
      doc.text("Quantity", 80, 80);
      doc.text("Rate", 110, 80);
      doc.text("Amount", 140, 80);



function calculateAmount() {
  // Get values from the quantity and rate fields
  let quantity = document.getElementById('quantity').value;
  let rate = document.getElementById('rate').value;

  // Validate inputs and calculate amount
  if (quantity > 0 && rate > 0) {
    let amount = quantity * rate;

    // Set the calculated amount in the amount field
    document.getElementById('amount').value = amount.toFixed(2);  // Two decimal places
  } else {
    document.getElementById('amount').value = 0;
  }
}


  
      // Add item rows dynamically
      let currentY = 90;
      document.querySelectorAll('.item').forEach(item => {
        const itemName = item.querySelector('input[type="text"]').value;
        const quantity = item.querySelector('.quantity').value;
        const rate = item.querySelector('.rate').value;
        const amount = item.querySelector('.amount').value;
  
        doc.text(itemName, 10, currentY);
        doc.text(quantity, 80, currentY);
        doc.text(rate, 110, currentY);
        doc.text(amount, 140, currentY);
  
        currentY += 10; // Move to the next line for the next item
      });
       