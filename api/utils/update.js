const Product = require('../models/Product');
const sendNotification = require('./sendMail');

// Function to check if a product is about to expire
function checkExpiry(product) {
  const expirationDate = new Date(product.expiredAt);
  const currentDate = new Date();
  const noticed = product.isNoticed;

  // Set the notification threshold, for example, 7 days before expiration
  const notificationThreshold = 7;
  const thresholdDate = new Date(expirationDate);
  thresholdDate.setDate(expirationDate.getDate() - notificationThreshold);

  if (currentDate >= thresholdDate && currentDate <= expirationDate && !noticed) {
    return true;
  }

  return false;
}

/// Function to schedule the expiration check every 5 minutes
async function scheduleExpirationCheck() {
  console.log("schedule function called")
  try {
    const products = await Product.find();
    await Promise.all(
      await products.map(async(product) => {
        try {
          if (checkExpiry(product)) {
            sendNotification(product);
            product.isNoticed = true;
            await product.save()
          }
        }catch(err) {
          console.log(err)
        }
      })
    )
  }catch(err) {
    console.log(err);
  }
}
module.exports = scheduleExpirationCheck