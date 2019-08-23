const util = require('util') // ایپمورت کردن ماژول util برای استفاده از تابع Promisify
const mysql = require('mysql') // ایمپورت کردن mysql برای اتصال به دیتابیس در نود جی اس
const pool = mysql.createPool({ // ایجاد یک کانکشن جدید به دیتابیس و ذخیره آن در ثابت pool
    connectionLimit: 10, // تعداد کانکشن های همزمان به دیتابیس
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
})

// چک کردن کانکشن به دیتابیس
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error(کانکشن دیتابیس بسته شد.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('تعداد کانکشن ها به دیتابیس زیاد است.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('کانکشن به دیتابیس رد شد.')
        }
    }

    if (connection) connection.release()

    return
})

// Promisify برای Node.js async/await.
pool.query = util.promisify(pool.query) // تبدیل متود pool.query به تابعی با پشتیبانی از Async/Await

module.exports = pool // اکسپورت کردن ماژول برای استفاده در دیگر فایل ها