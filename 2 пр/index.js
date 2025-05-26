// 1
let currentQuestion = 0;
let prav = 0;
const questions = [
    {
        text: "Зимой и летом одним цветом",
        answer: "ёлка"
    },
    {
        text: "Висит груша — нельзя скушать",
        answer: "лампочка"
    },
    {
      text: "Что не вместится в кастрюлю?",
      answer: "Крышка"
  }
];
function quiz() {
    currentQuestion = 0; 
    prav = 0;
    document.getElementById('quiz').innerHTML = ''; 
    showQuestion(); 
    // очистка блока с вопросами (самое начало), потом запуск первого вопроса 
}

function showQuestion() {
    const quizDiv = document.getElementById('quiz');   //блок для ввода ответа
    if (currentQuestion >= questions.length) {
        quizDiv.innerHTML = `<h3 class="result">Правильных ответов: ${prav} из 
        ${questions.length}</h3>`; 
        return;
    }

    quizDiv.innerHTML = `
        <h3>Вопрос ${currentQuestion + 1}:</h3>
        <p>${questions[currentQuestion].text}</p>
        <input type="text" id="answer" placeholder="Ваш ответ"> 
        <button onclick="checkAnswer()">Ответить</button>`; 
}
    function checkAnswer() {
        const userAnswer = document.getElementById('answer').value.toLowerCase().trim(); //делаем что бы засчитался ответ, регистр, пробелы
        const correctAnswer = questions[currentQuestion].answer.toLowerCase(); //получаем ответ
        const quizDiv = document.getElementById('quiz'); //вывод

    if (userAnswer === correctAnswer) {
        score++; //увел счет 
        quizDiv.innerHTML += `<p class="correct"> Верно!</p>`;  //присваиваем 
    } else {
        quizDiv.innerHTML += `<p class="wrong"> Неверно. Правильный ответ: ${correctAnswer}</p>`; //не присваиваем
    }

    currentQuestion++;
        setTimeout(showQuestion, 300); 
}

// 2
function sch() {
  const output = document.getElementById('output');
  for (let i = 1; i <= 10; i++) {
      const numberElement = document.createElement('div');
      numberElement.textContent = i; //число внутрь нового дива
      numberElement.classList.add('number');
      
      setTimeout(() => {
          output.appendChild(numberElement);
      }, i * 300); // задержка 
  }
}

// 3
function eee() {
  let answer; 
  const messageElement = document.getElementById('message'); // вывод сообщений

  do {
      answer = prompt('Еще по одной? (Введите 1, чтобы завершить)'); 
      messageElement.textContent = answer === "1" ? "Застолье завершено!" : "Продолжаем!"; 
  } while (answer !== "1"); // Проверка условия
}

// 4
function fact() {
  let number = 6; 
  let factorial = 1; 
  for (let i = 1; i <= number; i++) { 
      factorial *= i; //перемножение 
  }

  const resultElement = document.getElementById('result');
  
  // Выводим результат в формате: "6! = 720"
  resultElement.textContent = `${number}! = ${factorial}`; //обратные встраивают в строку результат 
}

// 6 
function porz() {
  const max = 6; 
  let prost = [];      // массив для чисел

  for (let num = 2; num <= max; num++) {
      let isProst = true; 

      for (let i = 2; i <= Math.sqrt(num); i++) { 
          if (num % i === 0) { //проверка на остаток
              isProst = false; 
              break;           //выход из внутр цикла 
          }
      }

      if (isProst) prost.push(num); //доб число в массив 
  }

  document.getElementById("result2").textContent = 
      `Простые числа: ${prost.join(", ")}`;   //джоин - в одну строку все эл массива 
}



