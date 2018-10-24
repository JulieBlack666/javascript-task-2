'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
const isStar = false;

/**
 * Телефонная книга
 */
let phoneBook = [];

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
function add(phone, name, email) {
    if (!(/^\d{10}$/.test(phone)) || !name || phoneBook.some(x => x.phone === phone)) {
        return false;
    }

    phoneBook.push({ name, phone, email });

    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
function update(phone, name, email) {
    if (!phoneBook.some(x => x.phone === phone) || phoneBook.some(e => e.name === name &&
        e.phone === phone && e.email === email)) {
        return false;
    }

    phoneBook = phoneBook.filter(e => e.phone !== phone);
    phoneBook.push({ name, phone, email });

    return true;
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
function findAndRemove(query) {
    if (!query) {
        return 0;
    }
    const lengthBeforeRemoval = phoneBook.length;
    phoneBook = phoneBook.filter(e => !e.name.includes(query) && !e.phone.includes(query) &&
        (typeof e.email === 'undefined' || !e.email.includes(query)));

    return lengthBeforeRemoval - phoneBook.length;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */
function find(query) {
    if (!query) {
        return [];
    }

    const resultNotes = query === '*' ? phoneBook
        : phoneBook.filter(e => e.name.includes(query) || e.phone.includes(query) ||
                        typeof e.email !== 'undefined' && e.email.includes(query));

    return resultNotes.map(e => `${e.name}, ${formatPhoneNumber(e.phone)}` +
            (typeof e.email !== 'undefined' ? `, ${e.email}` : '')).sort();
}

function formatPhoneNumber(phone) {
    return `+7 (${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 8)}` +
            `-${phone.substring(8, 10)}`;
}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
function importFromCsv(csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует

    return csv.split('\n').length;
}

module.exports = {
    add,
    update,
    findAndRemove,
    find,
    importFromCsv,

    isStar
};
