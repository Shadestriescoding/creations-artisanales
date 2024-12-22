require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eva_boutique',
    env: process.env.NODE_ENV || 'development',
    uploadLimits: {
        fileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB par défaut
        allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(',')
    }
}; 