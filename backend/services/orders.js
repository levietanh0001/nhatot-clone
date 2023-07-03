const fs = require('fs');
const path = require('path');
const PDFDoc = require('pdfkit');

const Order = require('../models/order');


function createOrder(req, res, next) {

    let fetchedCart;

    // produce order from current user's cart
    req.user
        .getCart()
        .then(cart => {
            // current user's cart
            fetchedCart = cart;
            // return products in cart
            return cart.getProducts()
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                    return order.addProducts(
                        products.map(product => {
                            // get quantity of products in cart
                            product.orderItem = { quantity: product.cartItem.quantity };
                            return product;
                        }
                    ));
                })
                .catch(error => res.send(error))
            ;        
        })
        .then(order => {
            // drop cart after order is created
            fetchedCart.setProducts(null); // magic association method
            res.send(order);
        })
        .catch(e => {
            const error = new Error(e);
            error.statusCode = 500;
            return next(error);
        });

}


function getOrders(req, res, next) {

    // choose whether to include an (indrectly) associated model Product, 
    // 'products' because Order has many Products and lowercase by default
    req.user.getOrders({ include: ['products'] })
        .then(orders => {
            res.send(orders);
        })
        .catch(e => {
            const error = new Error(e);
            error.statusCode = 500;
            return next(error);
        });
}


// download invoice
function downloadInvoice(req, res, next) {
    const orderId = req.params['orderId'];
    const invoiceName = 'invoice-' + orderId + '.pdf';
    const invoicePath = path.join('data', 'invoices', invoiceName);

    let currentOrder;
    Order
        .findByPk(orderId)
        .then(order => {
            if(!order) {
                return res.send('Order is not found');
            }

            currentOrder = order;

            return currentOrder.getUser();
        })
        .then(user => {
            if(!user) {
                return res.status(403).send('Not authorized');
            }

            return currentOrder.getProducts({ raw: true })
        })
        .then(products => {  
            const pdfDoc = new PDFDoc();
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);
            pdfDoc.text('Invoice');
            
            let totalPrice = products.reduce((total, current) => {
                return total + current.price;
            }, 0);

            products.forEach(product => {
                pdfDoc.text(`${product.title} ${product.price}`);
            });

            
            pdfDoc.text(`Total price: ${totalPrice}`);
            pdfDoc.end();
            
            // fs.readFile(invoicePath, (error, data) => {
            //     if(error) {
            //         const error = new Error(e);
            //         error.statusCode = 500;
            //         return next(error);
            //     }
        
            //     res.setHeader('Content-Type', 'application/pdf');
            //     res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`); // open in current tab
            //     res.send(data);
            // });
    
            // // stream file 
            // const file = fs.createReadStream(invoicePath);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`); // open in current tab
            // file.pipe(res);
        })                
        .catch(e => {
            const error = new Error(e);
            error.statusCode = 500;
            return next(error);
        });
}


module.exports = {
    createOrder,
    getOrders,
    downloadInvoice
};
