const catchAsync = require('../utils/catchAsync');
const otpService = require('../services/otp.service');

// Step 1: Request OTP
exports.requestOtp = catchAsync(async (req, res) => {
    const { phone } = req.body;
    const otp = await otpService.generateAndStoreOtp(phone);
    await otpService.sendSms(phone, `Your XG Mouse verification code: ${otp}`);
    
    res.status(200).json({ status: 'success', message: 'OTP sent!' });
});

// Step 2: Verify OTP and Login
exports.verifyOtp = catchAsync(async (req, res) => {
    const { phone, otp } = req.body;
    const isValid = await otpService.verifyOtp(phone, otp);
    
    if (!isValid) throw new Error('Invalid or expired OTP');
    
    const token = generateJwtToken(phone);
    res.status(200).json({ status: 'success', token });
});