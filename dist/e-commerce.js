let nextProductId = 1;
let nextOrderId = 1;
let nextOrderDate = new Date();
class NoDiscount {
    applyDiscount(price) {
        return price;
    }
}
class PercentageDiscount {
    percentage;
    constructor(percentage) {
        this.percentage = percentage;
    }
    applyDiscount(price) {
        return price * (1 - this.percentage / 100);
    }
}
class FixedAmountDiscount {
    amount;
    constructor(amount) {
        this.amount = amount;
    }
    applyDiscount(price) {
        return price - this.amount;
    }
}
class Cart {
    customerId;
    items = [];
    discount = new NoDiscount();
    constructor(customerId) {
        this.customerId = customerId;
    }
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.productId === product.productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            this.items.push({ product, quantity });
        }
    }
    removeItem(productId, quantity = 1) {
        const itemIndex = this.items.findIndex(item => item.product.productId === productId);
        if (itemIndex !== -1) {
            if (this.items[itemIndex].quantity <= quantity) {
                this.items.splice(itemIndex, 1);
            }
            else {
                this.items[itemIndex].quantity -= quantity;
            }
        }
    }
    setDiscount(strategy) {
        this.discount = strategy;
    }
    calculateSubtotal() {
        return this.items.reduce((total, item) => {
            const discountedPrice = this.discount.applyDiscount(item.product.productPrice);
            return total + (discountedPrice * item.quantity);
        }, 0);
    }
    calculateTotal() {
        const subtotal = this.calculateSubtotal();
        const tax = this.items.reduce((total, item) => {
            return total + (item.product.productPrice * (item.product.productTax / 100) * item.quantity);
        }, 0);
        return subtotal + tax;
    }
    getItems() {
        return this.items.map(item => item.product);
    }
    isEmpty() {
        return this.items.length === 0;
    }
    clear() {
        this.items = [];
    }
    display() {
        console.log(`Cart for custormer ${this.customerId}:`);
        this.items.forEach(item => {
            console.log(`${item.quantity} x ${item.product.productName} - KES${item.product.productPrice.toFixed(2)}`);
        });
        console.log(` Subtotal: KES${this.calculateSubtotal().toFixed(2)}`);
        console.log(` Total: KES${this.calculateTotal().toFixed(2)}`);
    }
}
class User {
    name;
    email;
    password;
    role;
    userId;
    constructor(_name, _email, _password, _role) {
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.role = _role;
        this.userId = `user_${Math.random().toString(36).substring(2, 9)}`;
    }
}
class Admin extends User {
    constructor(_name, _email, _password) {
        super(_name, _email, _password, 'Admin');
    }
    addUser(user) {
        console.log(`${user.role} ${user.name} added by Admin ${this.name}`);
    }
    manageSystem() {
        console.log(`${this.name} is managing the system.`);
    }
}
class Seller extends User {
    products = [];
    constructor(_name, _email, _password) {
        super(_name, _email, _password, 'Seller');
    }
    addElectronicProduct(product) {
        const newProduct = {
            productId: nextProductId++,
            productType: 'Electonics',
            productTotalPrice: this.calculateTotalPrice(product),
            ...product
        };
        this.products.push(newProduct);
        return newProduct;
    }
    addClothingProduct(product) {
        const newProduct = {
            productId: nextProductId++,
            productType: 'Clothing',
            productTotalPrice: this.calculateTotalPrice(product),
            ...product
        };
        this.products.push(newProduct);
        return newProduct;
    }
    addFurnitureProduct(product) {
        const newProduct = {
            productId: nextProductId++,
            productType: 'Furniture',
            productTotalPrice: this.calculateTotalPrice(product),
            ...product
        };
        this.products.push(newProduct);
        return newProduct;
    }
    calculateTotalPrice(product) {
        return product.productPrice +
            (product.productPrice * product.productTax / 100) -
            (product.productPrice * product.productDiscount / 100);
    }
    removeProduct(product) {
        const removeProduct = this.products.find((p) => p.productName === product.productName);
        if (removeProduct) {
            this.products = this.products.filter((p) => p.productName !== product.productName);
            // console.log(`Product ${product.productName} removed by Seller ${this.name}`);
        }
    }
    listProducts() {
        console.log(`Products from ${this.name}:`);
        this.products.forEach(product => {
            console.log(`[${product.productType}] ${product.productName} - KES${product.productPrice.toFixed(2)}`);
            if (product.productType === 'Electonics') {
                console.log(` Brand: ${product.brand}, Warranty: ${product.warrantyPeriod} months`);
            }
            else if (product.productType === 'Clothing') {
                console.log(` Size: ${product.size}, Color ${product.color}`);
            }
            else if (product.productType === 'Furniture') {
                console.log(`Dimensions: ${product.dimensions}, Weight: ${product.weight}kg`);
            }
        });
    }
}
class Customer extends User {
    shippingAddress;
    cart;
    orders = [];
    constructor(_name, _email, _password, shippingAddress) {
        super(_name, _email, _password, 'Customer');
        this.shippingAddress = shippingAddress;
        this.cart = new Cart(this.userId);
    }
    addToCart(product, quantity = 1) {
        this.cart.addItem(product, quantity);
        console.log(`Added ${quantity} ${product.productName} to cart`);
    }
    removeFromCart(productId, quantity = 1) {
        this.cart.removeItem(productId, quantity);
        console.log(`Removed ${quantity} of product ID ${productId} from cart`);
    }
    applyDiscount(discount) {
        this.cart.setDiscount(discount);
        console.log(`Discount applied to the cart`);
    }
    viewCart() {
        this.cart.display();
    }
    placeOrder(paymentMethod, trackingNumber) {
        if (this.cart.isEmpty()) {
            console.log(`Cannot place order: Cart is Empty`);
            return null;
        }
        const newOrder = {
            orderId: nextOrderId++,
            orderDate: nextOrderDate,
            orderStatus: 'Pending',
            products: this.cart.getItems(),
            customerId: this.userId,
            shippingAddress: this.shippingAddress,
            paymentMethod,
            trackingNumber
        };
        this.orders.push(newOrder);
        this.cart.clear();
        console.log(`Order ${newOrder.orderId} has been placed successfully`);
        return newOrder;
    }
    makePayment(orderId) {
        const selectedOrder = this.orders.find((o) => o.orderId === orderId);
        if (selectedOrder) {
            selectedOrder.orderStatus = 'Shipped';
            console.log(`Payment has been made for Order ${orderId} by ${this.name}`);
        }
        else {
            console.log(`Order ${orderId} not found`);
        }
    }
    trackOrder(orderId) {
        const order = this.orders.find(o => o.orderId === orderId);
        if (order) {
            console.log(`Order ${order.orderId}:`);
            console.log(` Status: ${order.orderStatus}`);
            console.log(` Date: ${order.orderDate.toLocaleDateString()}`);
            if (order.trackingNumber) {
                console.log(` Tracking: ${order.trackingNumber}`);
            }
        }
        else {
            console.log(`Order ${orderId} not found`);
        }
    }
}
// Create users
const admin = new Admin('System Admin', 'admin@example.com', 'secure123');
const seller1 = new Seller('Tech Store', 'tech@example.com', 'seller123');
const seller2 = new Seller('Fashion House', 'fashion@example.com', 'seller123');
const customer = new Customer('John Doe', 'john@example.com', 'customer123', '123 Main St, City');
// Add products
const laptop = seller1.addElectronicProduct({
    productName: 'Lenovo x13',
    productPrice: 45000.00,
    productTax: 10,
    productDiscount: 5,
    sellerId: seller1.userId,
    warrantyPeriod: 24,
    brand: 'TechMaster'
});
const smartphone = seller1.addElectronicProduct({
    productName: 'Iphone X',
    productPrice: 59900.00,
    productTax: 8,
    productDiscount: 0,
    sellerId: seller1.userId,
    warrantyPeriod: 12,
    brand: 'MobileTech'
});
const tshirt = seller2.addClothingProduct({
    productName: 'Cotton T-Shirt',
    productPrice: 2000.00,
    productTax: 5,
    productDiscount: 0,
    sellerId: seller2.userId,
    size: 'M',
    color: 'Blue',
    material: 'Cotton'
});
const chair = seller1.addFurnitureProduct({
    productName: 'Office Chair',
    productPrice: 19900.00,
    productTax: 7,
    productDiscount: 10,
    sellerId: seller1.userId,
    dimensions: '24x24x36',
    weight: 8,
    material: 'Leather'
});
// List products
seller1.listProducts();
seller2.listProducts();
// Customer actions
customer.addToCart(laptop);
customer.addToCart(smartphone, 2);
customer.addToCart(tshirt);
customer.viewCart();
// Apply discount
customer.applyDiscount(new PercentageDiscount(10));
customer.viewCart();
// Place order
const order = customer.placeOrder('Credit Card', 'TRACK123456');
if (order) {
    customer.trackOrder(order.orderId);
    customer.makePayment(order.orderId);
    customer.trackOrder(order.orderId);
}
customer.viewCart();
