const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const enrollmentModel = require('../models/enrollmentModel');
const bookingspare = require('../models/bookingspare');

const router = express.Router();


router.post('/verify-payment',authMiddleware, async (req, res) => {

  
 

  try {
    // Step 1: Save enrollment details in the database
    const newEnrollment = new enrollmentModel({
      userId: req.user.userId, // Authenticated user ID
      itemId: req.body.itemId,
      amountPaid: req.body.amount,
      status: 'Paid',
      createdAt: new Date(),
    });

    await newEnrollment.save();
   
    console.log("Payment verified and enrollment saved:", newEnrollment);

    res.status(200).json({ success: true, message: 'Payment verified and booking successful.' });
  } catch (error) {
    console.error("Error during enrollment:", error);
    res.status(500).json({ success: false, message: 'Enrollment saving failed.', error });
  }
});

router.post('/verify-payment/spare',authMiddleware, async (req, res) => {

 

  try {
    // Step 1: Save enrollment details in the database
    const newEnrollment = new bookingspare({
      userId: req.user.userId, // Authenticated user ID
      itemId: req.body.itemId,
      amountPaid: req.body.amount,
      status: 'Paid',
      createdAt: new Date(),
    });

    await newEnrollment.save();
   
    console.log("Payment verified and enrollment saved:", newEnrollment);

    res.status(200).json({ success: true, message: 'Payment verified and booking successful.' });
  } catch (error) {
    console.error("Error during enrollment:", error);
    res.status(500).json({ success: false, message: 'Enrollment saving failed.', error });
  }
});

module.exports = router;
