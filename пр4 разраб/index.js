// Генерация карточек задач
function renderTasks() {
const container = document.getElementById('Cont');
container.innerHTML = '';
            
const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
tasks.forEach(task => {
    if (searchTerm && 
        !task.id.toString().includes(searchTerm) && 
        !task.title.toLowerCase().includes(searchTerm) &&
        !task.description.toLowerCase().includes(searchTerm)) {
        return;
    }
                
const taskCard = document.createElement('div');
taskCard.className = 'card';
taskCard.innerHTML = `
    <div class="cd-header">
        <span class="task-number">Задача ${task.id}</span>
        <h3 class="title">${task.title}</h3>
    </div>
    <div class="cd-body">
        <p class="task-description">${task.description}</p>
        <div class="task-inputs" id="inputs-${task.id}"></div>
        <button onclick="executeTask(${task.id})">Нажми</button>
        <div class="task-result" id="result-${task.id}">Результат будет здесь...</div>
    </div>
    `;
                
// поля ввода
const inputsContainer = taskCard.querySelector(`#inputs-${task.id}`);
if (task.inputs) {
task.inputs.forEach(input => {
    const inputGroup = document.createElement('div');
    inputGroup.className = 'group';
                        
    if (input.type === 'select') {
    const label = document.createElement('label');
    label.textContent = input.label;
                            
    const select = document.createElement('select');
    select.id = `input-${task.id}-${input.id}`;
                            
    input.options.forEach(option => {
        const optionElem = document.createElement('option');
        optionElem.value = option.value;
        optionElem.textContent = option.text;
        select.appendChild(optionElem);
    });
                            
        inputGroup.appendChild(label);
        inputGroup.appendChild(select);
    } else {
    const label = document.createElement('label');
    label.textContent = input.label;
                            
    const inputElem = document.createElement('input');
    inputElem.type = input.type;
    inputElem.id = `input-${task.id}-${input.id}`;
    inputElem.placeholder = input.placeholder;
                            
    inputGroup.appendChild(label);
    inputGroup.appendChild(inputElem);
    }
                        
    inputsContainer.appendChild(inputGroup);
    });
}
                
    container.appendChild(taskCard);
    });
}
        
// выполнение задачи
        function executeTask(taskId) {
            const task = tasks.find(t => t.id === taskId); // Находим задачу по ID в массиве tasks
            if (task) {
                try {
                    const result = task.solve();
                    document.getElementById(`result-${taskId}`).innerHTML = result; // Выводим результат в соответствующий блок
                } catch (error) {
                    document.getElementById(`result-${taskId}`).innerHTML = 
                        `<span class="error">Ошибка: ${error.message}</span>`;
                }
            }
        }
        
        // Инициализация
        document.addEventListener('DOMContentLoaded', () => {
            renderTasks();
            document.getElementById('searchInput').addEventListener('input', renderTasks); // Добавляем обработчик ввода в поисковую строку
        });
const tasks = [
    {
//1    
id: 1,
        title: "Високосный год",
        description: "Определить, является ли год високосным и содержит ли месяц 31 день.",
        inputs: [
            { id: "year", type: "number", label: "Год:", placeholder: "Введите год", value: "2025" },
            {
                id: "month", type: "select", label: "Месяц:", 
                options: [
                    { value: "1", text: "Январь (31 день)" },
                    { value: "2", text: "Февраль (28/29 дней)" },
                    { value: "3", text: "Март (31 день)" },
                    { value: "4", text: "Апрель (30 дней)" },
                    { value: "5", text: "Май (31 день)" },
                    { value: "6", text: "Июнь (30 дней)" },
                    { value: "7", text: "Июль (31 день)" },
                    { value: "8", text: "Август (31 день)" },
                    { value: "9", text: "Сентябрь (30 дней)" },
                    { value: "10", text: "Октябрь (31 день)" },
                    { value: "11", text: "Ноябрь (30 дней)" },
                    { value: "12", text: "Декабрь (31 день)" }
                ]
            }
        ],
        solve: function() {
            const year = parseInt(document.getElementById('input-1-year').value);
            const month = parseInt(document.getElementById('input-1-month').value);
            
            // Проверка високосного года
            const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
            
            // Месяцы с 31 днем
            const has31Days = [1, 3, 5, 7, 8, 10, 12].includes(month);
            
            // Название месяца
            const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
                              "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
            
            return `Год: ${year}, Месяц: ${monthNames[month-1]}<br>
                    Високосный: <strong>${isLeap ? "Да" : "Нет"}</strong><br>
                    31 день: <strong>${has31Days ? "Да" : "Нет"}</strong><br>
                    Условие выполняется: <strong>${isLeap && has31Days ? "Да" : "Нет"}</strong>`;
        }
    },
    {
        id: 2,
        title: "Ладья в шахматах",
        description: "Определить, бьет ли ладья фигуру на другой клетке.",
        inputs: [
            { id: "rook-row", type: "number", label: "Строка ладьи (1-8):", placeholder: "1-8", value: "1" },
            { id: "rook-col", type: "number", label: "Столбец ладьи (1-8):", placeholder: "1-8", value: "1" },
            { id: "figure-row", type: "number", label: "Строка фигуры (1-8):", placeholder: "1-8", value: "8" },
            { id: "figure-col", type: "number", label: "Столбец фигуры (1-8):", placeholder: "1-8", value: "8" }
        ],
        solve: function() {
            const rookRow = parseInt(document.getElementById('input-2-rook-row').value);
            const rookCol = parseInt(document.getElementById('input-2-rook-col').value);
            const figureRow = parseInt(document.getElementById('input-2-figure-row').value);
            const figureCol = parseInt(document.getElementById('input-2-figure-col').value);
            
            // Проверка диапазона
            if ([rookRow, rookCol, figureRow, figureCol].some(v => v < 1 || v > 8)) {
                return "Координаты должны быть в диапазоне от 1 до 8";
            }
            
            // Ладья бьет по горизонтали или вертикали
            const isHit = rookRow === figureRow || rookCol === figureCol;
            
            return `Ладья на позиции (${rookRow}, ${rookCol})<br>
                    Фигура на позиции (${figureRow}, ${figureCol})<br>
                    Результат: <strong>${isHit ? "Ладья бьет фигуру" : "Ладья не бьет фигуру"}</strong>`;
        }
    },
    {
        id: 3,
        title: "Успеваемость студентов",
        description: "Вывести студентов со средним баллом больше 4.0.",
        solve: function() {
            // Массив студентов
            const students = [
                { 
                    fullName: "Иванов И.И.", 
                    group: "101", 
                    performance: [4, 5, 5, 4, 5] 
                },
                { 
                    fullName: "Петрова А.С.", 
                    group: "102", 
                    performance: [5, 5, 5, 5, 5] 
                },
                { 
                    fullName: "Сидоров П.К.", 
                    group: "101", 
                    performance: [3, 4, 4, 3, 4] 
                },
                { 
                    fullName: "Козлова М.И.", 
                    group: "103", 
                    performance: [5, 4, 5, 5, 4] 
                },
                { 
                    fullName: "Никитин Д.В.", 
                    group: "102", 
                    performance: [3, 3, 4, 3, 4] 
                }
            ];
            
            // средний балл
            students.forEach(student => {
                const sum = student.performance.reduce((acc, grade) => acc + grade, 0);
                student.averageGrade = sum / student.performance.length;
            });
            
            const goodStudents = students.filter(student => student.averageGrade > 4.0);
            
            if (goodStudents.length === 0) {
                return "Студентов со средним баллом > 4.0 не найдено";
            }
            
            let result = "<strong>Студенты со средним баллом > 4.0:</strong><br><ul>";
            goodStudents.forEach(student => {
                result += `<li>${student.fullName} (${student.group}) - ${student.averageGrade.toFixed(2)}</li>`;
            });
            result += "</ul>";
            
            return result;
        }
    },
    {
        id: 4,
        title: "Слон в шахматах",
        description: "Определить, бьет ли слон фигуру на другой клетке.",
        inputs: [
            { id: "bishop-row", type: "number", label: "Строка слона (1-8):", placeholder: "1-8", value: "1" },
            { id: "bishop-col", type: "number", label: "Столбец слона (1-8):", placeholder: "1-8", value: "3" },
            { id: "figure-row", type: "number", label: "Строка фигуры (1-8):", placeholder: "1-8", value: "4" },
            { id: "figure-col", type: "number", label: "Столбец фигуры (1-8):", placeholder: "1-8", value: "6" }
        ],
        solve: function() {
            const bishopRow = parseInt(document.getElementById('input-4-bishop-row').value);
            const bishopCol = parseInt(document.getElementById('input-4-bishop-col').value);
            const figureRow = parseInt(document.getElementById('input-4-figure-row').value);
            const figureCol = parseInt(document.getElementById('input-4-figure-col').value);
            
            // Проверка диапазона
            if ([bishopRow, bishopCol, figureRow, figureCol].some(v => v < 1 || v > 8)) {
                return "Координаты должны быть в диапазоне от 1 до 8";
            }
            
            // Слон бьет по диагонали (разность координат по строкам и столбцам одинакова)
            const rowDiff = Math.abs(bishopRow - figureRow);
            const colDiff = Math.abs(bishopCol - figureCol);
            const isHit = rowDiff === colDiff;
            
            return `Слон на позиции (${bishopRow}, ${bishopCol})<br>
                    Фигура на позиции (${figureRow}, ${figureCol})<br>
                    Результат: <strong>${isHit ? "Слон бьет фигуру" : "Слон не бьет фигуру"}</strong>`;
        }
    },
        {
        id: 5,
        title: "Проверка строки",
        description: "Проверить, начинается ли строка с буквы 'a'.",
        inputs: [
            { id: "string", type: "text", label: "Строка:", placeholder: "Введите строку", value: "apple" }
        ],
        solve: function() {
            const str = document.getElementById('input-5-string').value;
            const startsWithA = str.charAt(0).toLowerCase() === 'a';
            
            return `Строка: "${str}"<br>
                    Начинается с 'а': <strong>${startsWithA}</strong>`;
        }
    },
    {
        id: 6,
        title: "Свойства автомобиля",
        description: "Вывести случайное свойство объекта 'автомобиль'.",
        solve: function() {
            const car = {
                brand: "Toyota",
                model: "Camry",
                year: 2022,
                color: "Серебристый",
                engine: "2.5L Hybrid",
                price: 3500000,
                mileage: 15000
            };
            
            // Получаем все ключи объекта
            const keys = Object.keys(car);
            
            // Выбираем случайный ключ
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            const randomValue = car[randomKey];
            
            return `Автомобиль: ${car.brand} ${car.model}<br>
                    Случайное свойство: <strong>${randomKey}</strong><br>
                    Значение: <strong>${randomValue}</strong>`;
        }
    },
        {
        id: 7,
        title: "Ферзь в шахматах",
        description: "Определить, бьет ли ферзь фигуру на другой клетке.",
        inputs: [
            { id: "queen-row", type: "number", label: "Строка ферзя (1-8):", placeholder: "1-8", value: "4" },
            { id: "queen-col", type: "number", label: "Столбец ферзя (1-8):", placeholder: "1-8", value: "4" },
            { id: "figure-row", type: "number", label: "Строка фигуры (1-8):", placeholder: "1-8", value: "7" },
            { id: "figure-col", type: "number", label: "Столбец фигуры (1-8):", placeholder: "1-8", value: "7" }
        ],
        solve: function() {
            const queenRow = parseInt(document.getElementById('input-7-queen-row').value);
            const queenCol = parseInt(document.getElementById('input-7-queen-col').value);
            const figureRow = parseInt(document.getElementById('input-7-figure-row').value);
            const figureCol = parseInt(document.getElementById('input-7-figure-col').value);
            
            // Проверка диапазона
            if ([queenRow, queenCol, figureRow, figureCol].some(v => v < 1 || v > 8)) {
                return "Координаты должны быть в диапазоне от 1 до 8";
            }
            
            // Ферзь бьет по горизонтали, вертикали или диагонали
            const rowDiff = Math.abs(queenRow - figureRow);
            const colDiff = Math.abs(queenCol - figureCol);
            const isHit = queenRow === figureRow || 
                         queenCol === figureCol || 
                         rowDiff === colDiff;
            
            return `Ферзь на позиции (${queenRow}, ${queenCol})<br>
                    Фигура на позиции (${figureRow}, ${figureCol})<br>
                    Результат: <strong>${isHit ? "Ферзь бьет фигуру" : "Ферзь не бьет фигуру"}</strong>`;
        }
    },
        {
        id: 8,
        title: "Массив случайных объектов",
        description: "Создать массив объектов со случайными значениями свойств.",
        inputs: [
            { id: "array-size", type: "number", label: "Количество объектов:", placeholder: "1-10", value: "3" }
        ],
        solve: function() {
            const size = parseInt(document.getElementById('input-8-array-size').value) || 3;
            
            if (size < 1 || size > 10) {
                return "Пожалуйста, введите число от 1 до 10";
            }
            
            const names = ["Алексей", "Мария", "Дмитрий", "Екатерина", "Иван", "Ольга", "Карина", "Алиса","Олег"];
            const cities = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань"];
            const colors = ["Красный", "Синий", "Зеленый", "Желтый", "Черный", "Белый"];
            
            const randomArray = [];
            for (let i = 0; i < size; i++) {
                randomArray.push({
                    id: i + 1,
                    name: names[Math.floor(Math.random() * names.length)],
                    age: Math.floor(Math.random() * 50) + 18,
                    city: cities[Math.floor(Math.random() * cities.length)],
                    score: Math.floor(Math.random() * 100),
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
            
            return `<pre>${JSON.stringify(randomArray, null, 2)}</pre>`;
        }
    },
    {
        id: 9,
        title: "Статус читателя",
        description: "Отобразить статус читателей: книга, автор и статус чтения.",
        solve: function() {
            const readers = [
                {
                    name: "Иван Иванов",
                    book: {
                        title: "Война и мир",
                        author: "Лев Толстой"
                    },
                    status: "Читает"
                },
                {
                    name: "Мария Петрова",
                    book: {
                        title: "Преступление и наказание",
                        author: "Федор Достоевский"
                    },
                    status: "Прочитано"
                },
                {
                    name: "Алексей Сидоров",
                    book: {
                        title: "Мастер и Маргарита",
                        author: "Михаил Булгаков"
                    },
                    status: "Планирует прочитать"
                }
            ];
            
            let result = "<strong>Статус читателей:</strong><br>";
            readers.forEach(reader => {
                result += `<div class="reader-card">
                            <strong>${reader.name}</strong><br>
                            Книга: "${reader.book.title}"<br>
                            Автор: ${reader.book.author}<br>
                            Статус: <strong>${reader.status}</strong>
                          </div>`;
            });
            
            return result;
        }
    },
    {
        id: 10,
        title: "Сортировка объектов",
        description: "Отсортировать массив объектов по разным критериям.",
        solve: function() {
            const products = [
                { name: "Ноутбук", price: "75,000", rating: 4.5 },
                { name: "Смартфон", price: "45,000", rating: 4.7 },
                { name: "Планшет", price: "32,000", rating: 4.3 },
                { name: "Наушники", price: "8,000", rating: 4.8 }
            ];
            
            const byName = [...products].sort((a, b) => a.name.localeCompare(b.name)); // по имени
        
            const byPrice = [...products].sort((a, b) => a.price - b.price);// по цене
            
            const byRating = [...products].sort((a, b) => b.rating - a.rating); // по рейтингу
            
            return `<strong>По названию:</strong><br>${byName.map(p => p.name).join(', ')}<br><br>
                    <strong>По цене (по возрастанию):</strong><br>${byPrice.map(p => `${p.name} (${p.price}₽)`).join(', ')}<br><br>
                    <strong>По рейтингу (по убыванию):</strong><br>${byRating.map(p => `${p.name} (${p.rating})`).join(', ')}`;
        }
    },
    {
        id: 11,
        title: "Объект в список пар",
        description: "Преобразовать объект в список пар [ключ, значение].",
        solve: function() {
            const person = {
                name: "Иван",
                age: 30,
                city: "Москва",
                profession: "Разработчик"
            };
            
            const pairs = Object.entries(person);
            
            return `<pre>${JSON.stringify(pairs, null, 2)}</pre>`;
        }
    },
    {
        id: 12,
        title: "Проверка свойств",
        description: "Проверить, содержит ли объект введенные свойства.",
        inputs: [
            { id: "props", type: "text", label: "Свойства (через запятую):", placeholder: "name, age", value: "name, age" }
        ],
        solve: function() {
            const person = {
                name: "Мария",
                age: 28,
                city: "Санкт-Петербург"
            };
            
            const propsInput = document.getElementById('input-12-props').value;
            const props = propsInput.split(',').map(p => p.trim()).filter(p => p);
            
            const missingProps = [];
            props.forEach(prop => {
                if (!(prop in person)) {
                    missingProps.push(prop);
                }
            });
            
            if (missingProps.length > 0) {
                return `Объект не содержит следующие свойства: <strong>${missingProps.join(', ')}</strong>`;
            }
            
            return `Все указанные свойства присутствуют в объекте`;
        }
    },
    {
        id: 13,
        title: "Описание городов",
        description: "Уточняющие данные про города.",
        solve: function() {
            // Создаем объекты городов с методами
            const city1 = {
                name: "Москва",
                population: 12678079,
                country: "Россия",
                getDescription: function() {
                    return `${this.name}, ${this.country}. Население: ${this.population.toLocaleString()} человек.`;
                }
            };
            
            const city2 = {
                name: "Нью-Йорк",
                population: 8336817,
                country: "США",
                getDescription: function() {
                    return `${this.name}, ${this.country}. Население: ${this.population.toLocaleString()} человек.`;
                }
            };
            
            return `<div>${city1.getDescription()}</div><div style="margin-top: 10px;">${city2.getDescription()}</div>`;
        }
    },
    {
        id: 15,
        title: "Перемножение свойств",
        description: "Перемножить числовые свойства и сравнить с числом.",
        inputs: [
            { id: "number", type: "number", label: "Число для сравнения:", placeholder: "Введите число", value: "100" }
        ],
        solve: function() {
            const obj = {
                a: 5,
                b: 10,
                c: 2,
                d: 8,
                name: "Тестовый объект"
            };
            
            const compareNumber = parseFloat(document.getElementById('input-15-number').value) || 0;
        
            let product = 1;
            for (const key in obj) {
                if (typeof obj[key] === 'number') {
                    product *= obj[key];
                }
            }
            
            const comparison = product > compareNumber ? "больше" : 
                              product < compareNumber ? "меньше" : "равно";
            
            return `Произведение числовых свойств: <strong>${product}</strong><br>
                    Сравнение с ${compareNumber}: <strong>${comparison}</strong>`;
        }
    },
    {
        id: 16,
        title: "Гласные и согласные",
        description: "Определить количество гласных и согласных букв в строке.",
        inputs: [
            { id: "string", type: "text", label: "Строка:", placeholder: "Введите строку", value: "Программирование" }
        ],
        solve: function() {
            const str = document.getElementById('input-16-string').value.toLowerCase();
            const vowels = 'аеёиоуыэюяaeiou';
            const consonants = 'бвгджзйклмнпрстфхцчшщbcdfghjklmnpqrstvwxyz';
            
            let vowelCount = 0;
            let consonantCount = 0;
            
            for (let char of str) {
                if (vowels.includes(char)) {
                    vowelCount++;
                } else if (consonants.includes(char)) {
                    consonantCount++;
                }
            }
            
            return `Строка: "${str}"<br>
                    Гласных букв: <strong>${vowelCount}</strong><br>
                    Согласных букв: <strong>${consonantCount}</strong>`;
        }
    },
    {
        id: 18,
        title: "Жарка котлет",
        description: "Рассчитать минимальное время для жарки котлет.",
        inputs: [
            { id: "k", type: "number", label: "Котлет на сковороде (k):", placeholder: "Введите k", value: "2" },
            { id: "m", type: "number", label: "Минут с одной стороны (m):", placeholder: "Введите m", value: "5" },
            { id: "n", type: "number", label: "Количество котлет (n):", placeholder: "Введите n", value: "3" }
        ],
        solve: function() {
            const k = parseInt(document.getElementById('input-18-k').value);
            const m = parseInt(document.getElementById('input-18-m').value);
            const n = parseInt(document.getElementById('input-18-n').value);
            
            if (k <= 0 || m <= 0 || n <= 0) {
                return "Все значения должны быть положительными числами";
            }
            
            if (n <= k) {
                return `Минимальное время: <strong>${2 * m}</strong> минут`;
            }

            const sides = 2 * n; //расчет времени
            const batches = Math.ceil(sides / k);
            const time = batches * m;
            
            return `Минимальное время: <strong>${time}</strong> минут`;
        }
    },
    {
        id: 19,
        title: "День недели",
        description: "Преобразовать номер дня недели в название.",
        inputs: [
            { id: "day", type: "number", label: "Номер дня (1-7):", placeholder: "1-7", value: "3" }
        ],
        solve: function() {
            const dayNumber = parseInt(document.getElementById('input-19-day').value);
            const days = [
                "Понедельник", "Вторник", "Среда", 
                "Четверг", "Пятница", "Суббота", "Воскресенье"
            ];
            
            if (dayNumber < 1 || dayNumber > 7) {
                return `<span class="error">Ошибка:</span> введите число от 1 до 7`;
            }
            
            return `День недели: <strong>${days[dayNumber - 1]}</strong>`;
        }
    },
    {
        id: 20,
        title: "Наименьшее числовое свойство",
        description: "Вывести наименьшее числовое значение свойства объекта.",
        solve: function() {
            const obj = {
                a: 15,
                b: 2,
                c: 23,
                d: 4,
                e: 42,
                name: "Объект с числами"
            };
            
            const numbers = Object.values(obj).filter(val => typeof val === 'number');
            const min = Math.min(...numbers);
            
            return `Наименьшее числовое значение: <strong>${min}</strong>`;
        }
    },
    {
        id: 23,
        title: "Умножение числовых свойств",
        description: "Умножить числовые свойства на случайное число.",
        solve: function() {
            const obj = {
                a: 10,
                b: 20,
                c: 30,
                d: 40,
                name: "Объект с числами"
            };

            const values = Object.values(obj).filter(val => typeof val === 'number');
            const min = Math.min(...values);
            const max = Math.max(...values);

            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

            const modifiedObj = { ...obj };

            for (const key in modifiedObj) {
                if (typeof modifiedObj[key] === 'number') { //перемножение
                    modifiedObj[key] *= randomNum;
                }
            }
            
            return `Исходный объект: <pre>${JSON.stringify(obj, null, 2)}</pre><br>
                    Случайное число: <strong>${randomNum}</strong><br>
                    Измененный объект: <pre>${JSON.stringify(modifiedObj, null, 2)}</pre>`;
        }
    },
    {
        id: 24,
        title: "Билеты в метро",
        description: "Рассчитать оптимальное количество билетов для поездок.",
        inputs: [
            { id: "n", type: "number", label: "Количество поездок (n):", placeholder: "Введите n", value: "100" }
        ],
        solve: function() {
            const n = parseInt(document.getElementById('input-24-n').value);
            
            if (n <= 0) {
                return "Количество поездок должно быть положительным числом";
            }
            
            const ticket1 = { rides: 1, price: 15 };
            const ticket10 = { rides: 10, price: 125 };
            const ticket60 = { rides: 60, price: 440 };

            let count60 = Math.floor(n / ticket60.rides); //оптимальное колво
            let remaining = n % ticket60.rides;
            
            let count10 = Math.floor(remaining / ticket10.rides);
            remaining = remaining % ticket10.rides;
            

            if (remaining * ticket1.price > ticket10.price) {
                count10++;
                remaining = 0;
            }
            
            let count1 = remaining;
            
            return `Для ${n} поездок оптимально купить:<br>
                    Билетов на 60 поездок: <strong>${count60}</strong><br>
                    Билетов на 10 поездок: <strong>${count10}</strong><br>
                    Билетов на 1 поездку: <strong>${count1}</strong>`;
        }
    },
    {
        id: 25,
        title: "Копирование свойств",
        description: "Копировать значения свойств, если они не равны.",
        solve: function() {
            const first = {
                name: "Иван",
                age: 30,
                city: "Москва",
                profession: "разработчик", 
            };
            
            const second = {
                name: "Петр",
                age: 30,
                city: "Санкт-Петербург",
                home: "big",
                hobby: "Фотография"
            };

            for (const key in first) {
                if (first[key] !== second[key]) {
                    second[key] = first[key];
                }
            }
            
            return `<strong>Исходный объект:</strong><pre>${JSON.stringify(first, null, 2)}</pre><br>
                    <strong>Измененный объект:</strong><pre>${JSON.stringify(second, null, 2)}</pre>`;
        }
    }
];