// Стандартная дополнительная информация
const standardAdditionalInfo = "1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.";

// Функция для отображения модального окна
function showModal(isCorrect, description, additionalInfo = "", nextSlideIndex) {
    const modal = document.getElementById('modal');
    const correctContainer = document.getElementById('correct-container');
    const wrongContainer = document.getElementById('wrong-container');
    const additionalInfoElement = document.getElementById('modal-additional-info');
    const okButton = document.getElementById('modal-ok-button');

    if (modal && correctContainer && wrongContainer && additionalInfoElement && okButton) {
        if (isCorrect) {
            correctContainer.classList.remove('hidden');
            wrongContainer.classList.add('hidden');
            correctContainer.querySelector('.modal-description.correct').innerHTML = description;
        } else {
            wrongContainer.classList.remove('hidden');
            correctContainer.classList.add('hidden');
            wrongContainer.querySelector('.modal-description.wrong').innerHTML = description;
        }

        additionalInfoElement.innerHTML = additionalInfo || standardAdditionalInfo;
        modal.classList.remove('hidden');
        modal.style.display = 'flex';

        // Прокрутка вверх для контента внутри модального окна
        modal.querySelector('.modal-content').scrollTop = 0;

        okButton.onclick = function() {
            modal.style.display = 'none';
            if (nextSlideIndex !== undefined) {
                currentSlideIndex = nextSlideIndex;
                showSlide(currentSlideIndex);
            }
        };

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                if (nextSlideIndex !== undefined) {
                    currentSlideIndex = nextSlideIndex;
                    showSlide(currentSlideIndex);
                }
            }
        };
    } else {
        console.error('Не удалось найти один или несколько элементов модального окна.');
    }
}



// Функция для отображения слайда
let currentSlideIndex = 0;

function showSlide(index) {
    console.log('Показ слайда:', index);  
    if (index >= slides.length) {
        console.error('Индекс слайда выходит за пределы массива.');
        return;
    }

    const slide = slides[index];
    const contentContainer = document.getElementById('content-container');
    const slideImage = document.getElementById('slideImage');

    slideImage.src = slide.background;
    contentContainer.innerHTML = slide.content;

    // Прокрутка вверх при загрузке нового слайда
    window.scrollTo({ top: 0, behavior: 'smooth' }); 

   
    document.body.classList.remove('body-question');

    if (slide.type === 'info') {
        const nextButton = document.getElementById('nextButton');
        const nextButtonChild = document.getElementById('nextButtonChild');

        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentSlideIndex = slide.nextSlide;
                showSlide(currentSlideIndex);
            });
        }

        if (nextButtonChild) {
            nextButtonChild.addEventListener('click', function() {
                currentSlideIndex = slide.nextSlide;
                showSlide(currentSlideIndex);
            });
        }
    } else if (slide.type === 'question') {
        displayQuestion(slide.questionData);

        //  .body-question только для слайдов с вопросами
        document.body.classList.add('body-question');
    }
}




function displayQuestion(questionData) {
    const qaContainer = document.getElementById('qa-container');
    qaContainer.innerHTML = `
        <div class="question">
            <img src="images/WarningCircle.png" alt="Warning" class="warning-icon">
            <h2>${questionData.text}</h2>
        </div>
        <div class="question-container">
            <div class="answers">
                ${questionData.answers.map(answer => `
                    <label>
                        <input type="radio" name="answer${questionData.id}" value="${answer.value}">
                        <span class="custom-radio"></span>
                        ${answer.text}
                    </label>
                `).join('')}
            </div>
            <button id="answerButton">Ответить</button>
        </div>
    `;

    const answerButton = document.getElementById('answerButton');

    if (answerButton) {
        answerButton.addEventListener('click', function() {
            const selectedAnswer = document.querySelector(`input[name="answer${questionData.id}"]:checked`);
            if (!selectedAnswer) {
                alert("Пожалуйста, выберите ответ.");
                return;
            }

            const isCorrect = selectedAnswer.value === "correct-answer-value";
            const description = isCorrect 
                ? questionData.correctDescription 
                : questionData.wrongDescription[selectedAnswer.value] || questionData.wrongDescription;

            const additionalInfo = questionData.additionalInfo[selectedAnswer.value] || "";

            showModal(isCorrect, description, additionalInfo, questionData.nextSlide);
        });
    } else {
        console.error('Не удалось найти элемент с id="answerButton".');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    showSlide(currentSlideIndex);
});
function toggleDetails(element) {
    
    const allItems = document.querySelectorAll('.test-item');

    
    allItems.forEach(item => {
        
        if (item !== element.parentNode) {
            
            item.classList.remove('active');
            const button = item.querySelector('.toggle-button');
            button.textContent = '+';
            button.style.color = 'black';
        }
    });


    element.parentNode.classList.toggle('active');

   
    const button = element.querySelector('.toggle-button');
    if (element.parentNode.classList.contains('active')) {
        button.textContent = '-';
        button.style.color = 'rgba(237, 27, 36, 1)'; 
    } else {
        button.textContent = '+';
        button.style.color = 'black'; 
    }
}

// Определение слайдов и вопросов
const slides = [
    {
        type: 'info',
        background: 'images/slide1.png',
        content: `
            <div class="container_end">
                <p class="title">Интерактивный <br>клинический случай</p>
                <p class="introduction">Предлагаем вашему вниманию интерактивный клинический случай пациента с диагнозом Прогрессирующая мышечная дистрофия Дюшенна. На конкретном примере вы разберете, какие исследования для постановки диагноза стоит назначить пациенту, а также изучите дальнейшее лечение.</p>
                <button id="nextButton">Начать</button>
            </div>
        `,
        nextSlide: 1
    },
    {
        type: 'info',
        background: 'images/slide2.png',
        content: `
            <div class="sign">
                <div class="information">
                    <div class="patient">
                        <p><strong>Ф.И.О. Пациента:</strong><br> <span class="text-block">Алексей Алексеевич Алексеев</span></p>
                                <p><strong>Дата рождения (возраст):</strong><br> <span class="text-block">2018 (5 лет)</span></p>
                                <p><strong>Адрес проживания:</strong><br> <span class="text-block">Ул. Пушкина</span></p>
                                <p><strong>Социальный статус:</strong><br> <span class="text-block">Дошкольник (неорганизован)</span></p>
                    </div>
                    <hr class="dashed-line">
                    <p><strong>Основной диагноз:</strong></p>
                    <p class="text-block">G71.0 - Прогрессирующая мышечная дистрофия Дюшенна (дупликация экзона 19 гена DMD в гемизиготном состоянии).</p>
                    <p><strong>Сопутствующие заболевания:</strong></p>
                    <p class="text-block">I42.9 - Кардиопатия неуточнённая у ребёнка с ПМД Дюшенна (умеренная дилатация полости ЛЖ). Эквиновальгусная деформация стоп. Дизартрия. Сложная дислалия.</p>
                    <p><strong>Жалобы при поступлении:</strong></p>
                    <p class="text-block">Нарушение походки, затрудненный подъем по лестнице.</p>
                    <p><strong>Анамнез заболевания:</strong></p>
                    <p class="text-block">Ребенок от I беременности. Роды 1 срочные самостоятельные. Масса тела при рождении 4146 г. Оценка по шкале Апгар 8/9 баллов. Выписан из роддома на 5-е сутки. Развитие на 1-м году жизни согласно возрасту: голову держит с 2 месяцев, сидит с 7 месяцев, ползает с 8 месяцев, ходит самостоятельно с 12 месяцев. Наследственность: у младшего брата (3 года) - ПМД Дюшенна. У брата бабушки по материнской линии отмечалась мышечная слабость, перестал ходить в 7 лет, умер после 30 лет.</p>
                    <button id="nextButton">Далее</button>
                </div>
            </div>
        `,
        nextSlide: 2
    },
    {
        type: 'question',
        background: 'images/slide3.png',
        content: `
            <div id="qa-container">
                <!-- Вопрос и ответы вставляются динамически -->
            </div>
        `,
        questionData: {
            id: 3,
            text: "Какие данные могли позволить поставить диагноз ПМДД уже на этапе сбора семейного анамнеза?",
            answers: [
                { id: 1, text: "Пол пациента (мужской), установленный диагноз «Прогрессирующая миодистрофия» у родственников мужского пола по материнской линии или неуточненное нервномышечное заболевание, дебют клинических проявлений в возрасте 2–5 лет.", value: "correct-answer-value" },
                { id: 2, text: "Пол пациента (женский), установленный диагноз «Прогрессирующая миодистрофия» у родственников мужского пола по материнской линии или неуточненное нервномышечное заболевание, дебют клинических проявлений в возрасте 2–5 лет.", value: "wrong-answer-value" },
                { id: 3, text: "Пол пациента (мужской), установленный диагноз «Прогрессирующая миодистрофия» у родственников мужского пола по материнской линии или неуточненное нервномышечное заболевание, дебют клинических проявлений в возрасте 7–10 лет.", value: "wrong-answer-value" }
            ],
            correctDescription: "Мужской пол пациента, диагноз «прогрессирующая миодистрофия» у родственников по материнской линии и дебют клинических проявлений в возрасте 2–5 лет могут указывать на прогрессирующую мышечную дистрофию Дюшенна. Этот диагноз подтверждается генетическими исследованиями и клиническими проявлениями.",
            wrongDescription: "Правильный ответ: Пол пациента (мужской), установленный диагноз «прогрессирующая миодистрофия» у родственников мужского пола по материнской линии или неуточненное нервно-мышечное заболевание, дебют клинических проявлений в возрасте 2–5 лет. Эти анамнестические данные указывают на мышечную дистрофию Дюшенна.",
            additionalInfo: {
                "correct-answer-value": "1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.",
                "wrong-answer-value": "1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год."
            },
            nextSlide: 3
        }
    },

    {
        type: 'question',
        background: 'images/slide4.png',
        content: `
            <div id="qa-container">
                <!-- Вопрос и ответы вставляются динамически -->
            </div>
        `,
        questionData: {
            id: 4,
            text: "Что необходимо уточнить у родителей/опекунов пациентов для полноценного сбора анамнеза при подозрении на МДД?",
            answers: [
                { id: 1, text: "Наблюдается ли у ребенка повышенная утомляемость (снижение выносливости)?", value: "wrong-answer-value" },
                { id: 2, text: "Есть ли у ребенка сложности выполнения физической нагрузки (приседания, бег или преодоление препятствий), неспособность прыгать?", value: "wrong-answer-value" },
                { id: 3, text: "Были ли у ребенка задержка речевого развития или нарушения артикуляции?", value: "wrong-answer-value" },
                { id: 4, text: "Всё вышеперечисленное.", value: "correct-answer-value" }
            ],
            correctDescription: "Для полноценного сбора анамнеза при подозрении на МДД у родителей необходимо получить ответы на все эти вопросы:<br><br> 1. Наблюдается ли у ребенка повышенная утомляемость (снижение выносливости)?<br> 2. Есть ли у ребенка сложности выполнения физической нагрузки (приседания, бег или преодоление препятствий), неспособность прыгать?<br> 3. Были ли у ребенка задержка речевого развития или нарушения артикуляции?<sup>1</sup>",
            wrongDescription: "Правильный ответ: Всё вышеперечисленное.<br><br> Для полноценного сбора анамнеза при подозрении на МДД у родителей необходимо получить ответы на все эти вопросы:<br><br> 1. Наблюдается ли у ребенка повышенная утомляемость (снижение выносливости)?<br> 2. Есть ли у ребенка сложности выполнения физической нагрузки (приседания, бег или преодоление препятствий), неспособность прыгать?<br> 3. Были ли у ребенка задержка речевого развития или нарушения артикуляции?<sup>1</sup>",
            additionalInfo: "1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.",
            nextSlide: 4
        }
        
    },
    {
        type: 'info',
        background: 'images/slide12.png',
        content: `
            <div class="sign">
                <div class="patient-child">
                    <img src="images/heart_rate_01.png" alt="Warning" class="warning-icon">
                    <h2 class="about_patient">О пациенте</h2>
                </div>
                <hr class="dashed-line">
                <p class="text-block-child">У ребенка всегда были увеличенные икры, двигательных проблем мама не отмечала.</p>
                <button id="nextButton">Далее</button>
            </div>
        `,
        nextSlide: 5
    },
    {
        type: 'question',
        background: 'images/slide3.png',
        content: `
            <div id="qa-container">
                <!-- Вопрос и ответы вставляются динамически -->
            </div>
        `,
        questionData: {
            id: 6,
            text: "На какой симптом, позволяющий заподозрить МДД, может обратить внимание врач-педиатр при осмотре пациента?",
            answers: [
                { id: 1, text: "Поясничный гиперлордоз, тугоподвижность или контрактуры крупных суставов, сколиоз, «крыловидные» лопатки, деформация грудной клетки, уплощение и деформация стоп, псевдогипертрофия мышц голени.", value: "correct-answer-value" },
                { id: 2, text: "Голубые склеры со склонностью к перфорации, укорочение и искривление конечностей, слабость связочного аппарата суставов, низкий мышечный тонус, малый рост.", value: "wrong-answer-value" },
                { id: 3, text: "Готическое нёбо со скученностью зубов, высокое и «тонкое» тело с длинными конечностями, арахнодактилия и деформация грудной клетки, атрофические кожные стрии.", value: "another-wrong-answer-value" },
                { id: 4, text: "Гипертелоризм, арахнодактилия, сколиоз, воронкообразная/килевидная деформация грудной клетки и долихостеномелия, контрактуры пальцев кистей и стоп, косолапость, краниостеноз.", value: "third-wrong-answer-value" }
            ],
            correctDescription: "Для пациентов с МДД характерны поясничный гиперлордоз, тугоподвижность или контрактуры крупных суставов, сколиоз, «крыловидные» лопатки, деформация грудной клетки, уплощение и деформация стоп, псевдогипертрофия мышц голени<sup>1</sup>.",
            wrongDescription: {
                "wrong-answer-value": "Правильный ответ: Поясничный гиперлордоз, тугоподвижность или контрактуры крупных суставов, сколиоз, «крыловидные» лопатки, деформация грудной клетки, уплощение и деформация стоп, псевдогипертрофия мышц голени.<br><br>Голубые склеры со склонностью к перфорации, укорочение и искривление конечностей, слабость связочного аппарата суставов, низкий мышечный тонус, малый рост характерны для синдрома Лобштейна-Экмана (периосталъная аплазия, синдром несовершенного замедленного остеогенеза)<sup>1</sup>.",
                "another-wrong-answer-value": "Правильный ответ: Поясничный гиперлордоз, тугоподвижность или контрактуры крупных суставов, сколиоз, «крыловидные» лопатки, деформация грудной клетки, уплощение и деформация стоп, псевдогипертрофия мышц голени.<br><br>Готическое нёбо со скученностью зубов, высокое и «тонкое» тело с длинными конечностями, арахнодактилия и деформация грудной клетки, атрофические кожные стрии характерны для синдрома Марфана<sup>1</sup>.",
                "third-wrong-answer-value": "Правильный ответ: Поясничный гиперлордоз, тугоподвижность или контрактуры крупных суставов, сколиоз, «крыловидные» лопатки, деформация грудной клетки, уплощение и деформация стоп, псевдогипертрофия мышц голени.<br><br>Гипертелоризм, арахнодактилия, сколиоз, воронкообразная/килевидная деформация грудной клетки и долихостеномелия, контрактуры пальцев кистей и стоп, косолапость, краниостеноз характерны для синдрома Лоеса-Дитца<sup>1</sup>."
            },
            additionalInfo: {
                "wrong-answer-value": "1. Диагностика и лечение наследственных и мультифакториальных нарушений соединительной ткани. Национальные клинические рекомендации. 2014 год.",
                "another-wrong-answer-value": "1. Кужель Д. А., Матюшин Г. В., Шульман В. А., Штегман О. А., Савченко Е. А. Синдром Марфана // Сибирское медицинское обозрение. 2007. №3."
            },
            nextSlide: 6
        }
    },
    {
        type: 'info',
        background: 'images/slide12.png',
        content: `
            <div class="sign">
                <div class="patient-child">
                    <img src="images/chest.png" alt="Warning" class="warning-icon">
                    <h2 class="about_patient">История болезни</h2>
                </div>
                <hr class="dashed-line">
                <p class="text-block-child">07.01.2023 С тошнотой, рвотой, бледностью кожных покровов поступил в<br> отделение токсикологии, где были выявлены неоднократные повышения<br> трансаминаз и КФК (до 11070 Ед/л), проводилась дезинтоксиканционная,<br> гепатопротекторная терапия. Учитывая отсутствие снижения трансаминаз и КФК<br> в динамике, у ребенка было заподозрено нервно-мышечное заболевание.</p>
                <button id="nextButton">Далее</button>
            </div>
        `,
        nextSlide: 7 
    },
    {
        type: 'question',
        background: 'images/slide3.png',
        content: `<div id="qa-container">
                <!-- Вопрос и ответы вставляются динамически -->
            </div>
        `,
        questionData: {
            id: 7,
            text: "При каких показателях <br> креатинфосфокиназы (КФК) стоит<br> заподозрить ПМДД?",
            answers: [
                { id: 1, text: "Повышение КФК в 300–500 раз", value: "wrong-answer-value" },
                { id: 2, text: "Повышение КФК в 3–5 раз", value: "wrong-answer-value" },
                { id: 3, text: "Повышение КФК в 10–100 раз", value: "correct-answer-value" }
            ],
            correctDescription: "Заподозрить ПМДД можно при повышении КФК в 10–100 раз<sup>1</sup>.",
            wrongDescription: "Правильный ответ: Повышение КФК в 10–100 раз.<br><br> Заподозрить ПМДД можно при повышении КФК в 10–100 раз<sup>1</sup>",
            additionalInfo: "1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.",
            nextSlide: 8 
        }
    },
    {
        type: 'question',
        background: 'images/slide3.png', 
        content: `
            <div id="qa-container">
                <!-- Вопрос и ответы вставляются динамически -->
            </div>
        `,
        questionData: {
            id: 8,
            text: "В каких ситуациях в обязательном порядке у пациентов должен определяться уровень КФК?",
            answers: [
                { id: 1, text: "Ребенок не ходит в 16–18 месяцев, применяет прием Говерса при вставании или ходит на пальцах.", value: "wrong-answer-value" },
                { id: 2, text: "Имеется отягощенный анамнез по МДД или наличие у близких родственников неуточненного нервно-мышечного заболевания.", value: "wrong-answer-value" },
                { id: 3, text: "Наблюдается повышение трансаминаз (АЛТ, АСТ) неясного генеза у детей в доклинической стадии.", value: "wrong-answer-value" },
                { id: 4, text: "Всё вышеперечисленное.", value: "correct-answer-value" }
            ],
            correctDescription: "Уровень КФК в обязательном порядке должен определяться, если<sup>1</sup>:<br><br>• Ребенок не ходит в 16–18 месяцев, применяет прием Говерса при вставании или ходит на пальцах.<br>• Имеется отягощенный анамнез по МДД или наличие у близких родственников неуточненного нервно-мышечного заболевания.<br>• Наблюдается повышение трансаминаз (АЛТ, АСТ) неясного генеза у детей в доклинической стадии.",
            wrongDescription: "Правильный ответ: Всё вышеперечисленное.<br><br>Уровень КФК в обязательном порядке должен определяться, если<sup>1</sup>:<br><br>• Ребенок не ходит в 16–18 месяцев, применяет прием Говерса при вставании или ходит на пальцах.<br>• Имеется отягощенный анамнез по МДД или наличие у близких родственников неуточненного нервно-мышечного заболевания.<br>• Наблюдается повышение трансаминаз (АЛТ, АСТ) неясного генеза у детей в доклинической стадии.",
            additionalInfo: "1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.",
            nextSlide: 9 
        }
    },
    {
        type: 'info',
        background: 'images/slide12.png',
        content: `
                    <div class="sign">
                <div class="patient-child">
                    <img src="images/heart_rate_02.png" alt="Warning" class="warning-icon">
                    <h2 class="about_patient">Обследования</h2>
                </div>
                    <hr class="dashed-line">
                    <p class="text-block-child">ЭМГ: первично-мышечный процесс.</p>
                    <button id="nextButton">Далее</button>
                </div>
            </div>

        `,
        nextSlide: 10 
    },
    {
        type: 'question',
        background: 'images/slide3.png', 
        content: `
            <div id="qa-container">
                <!-- Вопрос и ответы вставляются динамически -->
            </div>
        `,
        questionData: {
            id: 10,
            text: "Какое обследование необходимо <br>провести пациенту с повышенным не<br>менее чем в 20 раз уровнем КФК?",
            answers: [
                { id: 1, text: "Молекулярно-генетическое исследование в гене DMD.", value: "correct-answer-value" },
                { id: 2, text: "Молекулярно-генетическое исследование в гене TGFβR1 или TGFβR2.", value: "wrong-answer-value" },
                { id: 3, text: "Молекулярно-генетическое исследование в генах COL3A1, COL1A2, PLOD1.", value: "wrong-answer-value" }
            ],
            correctDescription: "При повышении уровня КФК не менее чем в 20 раз пациенту необходимо провести молекулярно-генетическое исследование в гене DMD<sup>1</sup>.",
            wrongDescription: {
                "wrong-answer-value": "Правильный ответ: молекулярно-генетическое исследование в гене DMD<sup>1</sup>.<br><br>Молекулярно-генетическое исследование в гене TGFβR1 или TGFβR2 проводят при болезни Марфана<sup>2</sup>.",
                "another-wrong-answer-value": "Правильный ответ: молекулярно-генетическое исследование в гене DMD<sup>1</sup>.<br><br>Молекулярно-генетическое исследование в генах COL3A1, COL1A2, PLOD1 проводят при синдроме Элерса-Данлоса<sup>2</sup>."
            },
            additionalInfo: {
                "wrong-answer-value": `
                    1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.<br>
                    2. Диагностика и лечение наследственных и мультифакториальных нарушений соединительной ткани. Национальные клинические рекомендации. 2014 год.
                `,
            },
            nextSlide: 11 
        }
    },
    {
        type: 'info',
        background: 'images/slide12.png',
        content: `
                    <div class="sign">
        <div class="patient-child">
            <img src="images/heart_rate_02.png" alt="Warning" class="warning-icon">
            <h2 class="about_patient">Обследования</h2>
        </div>
            <hr class="dashed-line">
            <p class="text-block-child">
                Пациент был направлен на молекулярно-генетическое исследование.<br>
                Поиск делеций и дупликаций в гене DMD методом MLPA - дупликация экзона 19<br>
                гена DMD в гемизиготном состоянии.</p>
            <button id="nextButton">Далее</button>
        </div>
    </div>
        `,
        nextSlide: 12 
    },
    {
        type: 'question',
        background: 'images/slide3.png', 
        content: `
            <div id="qa-container">
                <!-- Вопрос и ответы вставляются динамически -->
            </div>
        `,
        questionData: {
            id: 12,
            text: "С какими заболеваниями чаще всего проводят дифференциальный диагноз МДД?",
            answers: [
                { id: 1, text: "Воспалительная миопатия, врожденные миопатии, метаболические миопатии.", value: "wrong-answer-value" },
                { id: 2, text: "Воспалительная миопатия, врожденные миопатии, метаболические миопатии, болезни мотонейрона, болезни нервно-мышечной передачи, асимптомное повышение КК.", value: "correct-answer-value" },
                { id: 3, text: "Болезни мотонейрона, болезни нервно-мышечной передачи, асимптомное повышение КК.", value: "wrong-answer-value" }
            ],
            correctDescription: `
                Дифференциальную диагностику МДД проводят со следующими заболеваниями:<br><br>
                1. Воспалительная миопатия.<br>
                2. Врожденные миопатии.<br>
                3. Метаболические миопатии.<br>
                4. Болезни мотонейронов.<br>
                5. Болезни нервно-мышечной передачи.<br>
                6. Асимптомное повышение КК.<sup>1</sup>
            `,
            wrongDescription: `
                Правильный ответ: Воспалительная миопатия, врожденные миопатии, метаболические миопатии, болезни мотонейрона, болезни нервно-мышечной передачи, асимптомное повышение КК.<br><br>
                Дифференциальную диагностику МДД проводят со следующими заболеваниями:<br><br>
                1. Воспалительная миопатия.<br>
                2. Врожденные миопатии.<br>
                3. Метаболические миопатии.<br>
                4. Болезни мотонейронов.<br>
                5. Болезни нервно-мышечной передачи.<br>
                6. Асимптомное повышение КК.<sup>1</sup>
            `,
            additionalInfo: "", 
            nextSlide: 13 
        }
    },
    {
        type: 'info',
        background: 'images/slide12.png',
        content: `
                    <div class="sign">
        <div class="patient-child">
            <img src="images/chest.png" alt="Warning" class="warning-icon">
            <h2 class="about_patient">История болезни</h2>
        </div>
            <hr class="dashed-line">
            
        
            <p class="text-block-child">С августа 2023 года получает стероиды ежедневно, витамин Д 2000 МЕ. Проводятся растяжки, стоит на уголке. Туторов, обуви нет.<br>
                Поступает впервые для оценки состояния, коррекции терапии, восстановительного лечения.</p>
            
            
            
            <button id="nextButton">Далее</button>
        </div>
    </div>
        `,
        nextSlide: 14 
    },
    {
        type: 'info',
        background: 'images/slide12.png',
        content: `
                   <div class="sign">
        <div class="patient-child">
            <img src="images/blood_pressure_02.png" alt="Warning" class="warning-icon">
            <h2 class="about_patient">Данные осмотра</h2>
        </div>
            <hr class="dashed-line">
            
        
            <p class="text-block-baby">Состояние пациента: средней тяжести. Сознание: ясное. Ребенок: контактен. Положение: активное. Вес/масса тела: 23 кг. Индекс 
                массы тела: 17,85. Рост/длина: 113,5 см. (перцентиль 50-75%). Физическое развитие: дисгармоничное за счет избытка массы. Мышечная 
                система развита: удовлетворительно. Тонус мышц: нормальный. Форма грудной клетки: правильная. Костные деформации: нет. Деформация нижних конечностей: стопы вальгусная деформация, плоскостопие. Частота дыхания: 20 в мин. Одышка: утомляемость. Принимает стероиды ежедневно. Психическое развитие: соответствует возрасту. дизартрия, гиперактивность. Психоневрологическое состояние по основному заболеванию Больной в сознании, в контакт вступает, эмоциональный, обращенную речь понимает, команды выполняет. Отмечается гиперактивность. Речь – развернутая фраза, дизартрия. Повороты головы в полном объёме. Поднимание плеч не затруднено. Язык по средней линии. Глотание не нарушено, жевание не нарушено. Фонация удовлетворительная..
                <br><br>Рефлекторно - двигательная сфера: Голову держит хорошо, из положения лежа поднимает. Сидит с кифозированной спиной. Самостоятельно садится. Походка миопатическая. Прыгает на двух ногах с затруднениями, бегает неловко. Эквиновальгусная деформация стоп. Контрактуры голеностопных суставов. Псевдогипертрофия икроножных мышц. Верхние конечности: Движения в суставах не ограничены. Мышечный тонус гипотонический. Сила мышц снижена. Сухожильные рефлексы не вызываются, D=S. Нижние конечности: мышечный тонус гипотонический. Сила мышц снижена. Сухожильные рефлексы – не вызываются D=S. Чувствительность ориентировочно не нарушена. Координаторных нарушений нет. 6-минутный тест 382.</p>
            
            
            
            <button id="nextButtonChild">Далее</button>
        </div>
    </div>
        `,
        nextSlide: 15 
    },
    {
        type: 'question',
        background: 'images/slide3.png', 
        content: `
            <div id="qa-container">
                <!-- Вопрос и ответы вставляются динамически -->
            </div>
        `,
        questionData: {
            id: 15,
            text: "Что включает физикальное обследование при подозрении на МДД?",
            answers: [
                { id: 1, text: "Измерение роста и веса", value: "wrong-answer-value" },
                { id: 2, text: "Визуальная оценка походки", value: "wrong-answer-value" },
                { id: 3, text: "Визуальный осмотр мышц и исследование мышечного тонуса, мышечной силы", value: "wrong-answer-value" },
                { id: 4, text: "Исследование сухожильных рефлексов", value: "wrong-answer-value" },
                { id: 5, text: "Оценка симптома Говерса и вспомогательных приемов при поднимании головы и при вставании из положения лежа на спине", value: "wrong-answer-value" },
                { id: 6, text: "Осмотр костно-суставной системы", value: "wrong-answer-value" },
                { id: 7, text: "Оценка поведенческих и эмоциональных расстройств", value: "wrong-answer-value" },
                { id: 8, text: "Обследование сердечно-сосудистой и дыхательной систем", value: "wrong-answer-value" },
                { id: 9, text: "Всё вышеперечисленное", value: "correct-answer-value" }
            ],
            correctDescription: `
                Физикальное обследование при подозрении на МДД включает<sup>1</sup>:<br><br>
                • Измерение роста и веса.<br>
                • Визуальная оценка походки.<br>
                • Визуальный осмотр мышц и исследование мышечного тонуса, мышечной силы.<br>
                • Исследование сухожильных рефлексов.<br>
                • Оценка симптома Говерса и вспомогательных приемов при поднимании головы и при вставании из положения лежа на спине.<br>
                • Осмотр костно-суставной системы.<br>
                • Оценка поведенческих и эмоциональных расстройств.<br>
                • Обследование сердечно-сосудистой и дыхательной систем.
            `,
            wrongDescription: {
                "wrong-answer-value": `
                    Правильный ответ: Всё вышеперечисленное.<br><br>
                    Физикальное обследование при подозрении на МДД включает<sup>1</sup>:<br><br>
                    • Измерение роста и веса.<br>
                    • Визуальная оценка походки.<br>
                    • Визуальный осмотр мышц и исследование мышечного тонуса, мышечной силы.<br>
                    • Исследование сухожильных рефлексов.<br>
                    • Оценка симптома Говерса и вспомогательных приемов при поднимании головы и при вставании из положения лежа на спине.<br>
                    • Осмотр костно-суставной системы.<br>
                    • Оценка поведенческих и эмоциональных расстройств.<br>
                    • Обследование сердечно-сосудистой и дыхательной систем.
                `
            },
            additionalInfo: "1. Диагностика и лечение наследственных и мультифакториальных нарушений соединительной ткани. Национальные клинические рекомендации. 2014 год.",
            nextSlide: 16 
        }
    },
    {
        type: 'info',
        background: 'images/51.png',
        content: `
            <div class="sign">
        <div class="patient-child">
            <img src="images/blood_glucose.png" alt="Warning" class="warning-icon">
            <h2 class="about_patient">Лабораторные <br>исследования</h2>
        </div>
        <hr class="dashed-line">
        <div class="lab-tests">
            <div class="test-item">
                <div class="test-title" onclick="toggleDetails(this)">
                    <span>Общий анализ крови</span>
                    <button class="toggle-button">+</button>
                </div>
                <div class="test-details">
                    <!-- Содержимое таблицы для "Общий анализ крови" -->
                    <table>
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Результат</th>
                                <th>Нормы</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Лейкоциты (WBC),<br> 10*9/л</td>
                                <td>11</td>
                                <td class="highlight-green">4,50 - 11,50</td>
                            </tr>
                            <tr>
                                <td>Эритроциты (RBC),<br> 10*12/л</td>
                                <td>4.83</td>
                                <td class="highlight-green">3,90 - 5,50</td>
                            </tr>
                            <tr>
                                <td>Гемоглобин (HGB), г/<br>л</td>
                                <td>126</td>
                                <td class="highlight-green">110 - 140</td>
                            </tr>
                            <tr>
                                <td>Средний объем эритроцита (MCV),<br> фл</td>
                                <td>78.5</td>
                                <td class="highlight-green">73,0 - 87,0</td>
                            </tr>
                            <tr>
                                <td>Сред. сод. гемоглобина эритроците <br>(MCH), пг</td>
                                <td>26</td>
                                <td class="highlight-green">24,0 - 31,0</td>
                            </tr>
                            <tr>
                                <td>Сред. конц. гемоглобина в эр. <br>(MCHC), г/л</td>
                                <td>331</td>
                                <td class="highlight-green">300 - 380</td>
                            </tr>
                            <tr>
                                <td>Тромбоциты (PLT),<br> 10*9/л</td>
                                <td>406</td>
                                <td class="highlight-green">127 - 520</td>
                            </tr>
                            <tr>
                                <td>PLCC, 10*9/л</td>
                                <td>80</td>
                                <td class="highlight-green"></td>
                            </tr>
                            <tr>
                                <td>P-LCR, %</td>
                                <td>19.8</td>
                                <td class="highlight-green">13,00 - 43,00</td>
                            </tr>
                            <tr>
                                <td>Коэффициент анизотропии <br>эритроцитов, fL</td>
                                <td>42.5</td>
                                <td class="highlight-green">35,0 - 47,0</td>
                            </tr>
                            <tr>
                                <td>Распределение эритроцитов по<br> объему (RDW-CV), %</td>
                                <td>14.8</td>
                                <td class="highlight-green">12,0 - 15,0</td>
                            </tr>
                            <tr>
                                <td>Средний объем<br> тромбоцитов (MPV), <br>фл</td>
                                <td>9.2</td>
                                <td class="highlight-green">6,0 - 13,0</td>
                            </tr>
                            <tr>
                                <td>Тромбокрит (PCT), %</td>
                                <td>0.37</td>
                                <td class="highlight-green">0,10 - 0,50</td>
                            </tr>
                            <tr>
                                <td>Нейтрофилы (NEU), <br>%</td>
                                <td>2.16</td>
                                <td class="highlight-green">1,50 - 8,50</td>
                            </tr>
                            <tr>
                                <td>Лимфоциты (LYM), <br>%</td>
                                <td>9.61</td>
                                <td class="highlight-green">2,00 - 10,50</td>
                            </tr>
                            <tr>
                                <td>Моноциты (MONO), <br>%</td>
                                <td>0,60</td>
                                <td class="highlight-green">0,24 - 0,60</td>
                            </tr>
                            <tr>
                                <td>Эозинофилы (EOS), <br>%</td>
                                <td>0.16</td>
                                <td class="highlight-green">0,000 - 0,300</td>
                            </tr>
                            <tr>
                                <td>Базофилы (BASO), <br>10*9/л</td>
                                <td>0.02</td>
                                <td class="highlight-green">0,000 - 0,200</td>
                            </tr>
                            <tr>
                                <td>Нейтрофилы (NEU), <br>%</td>
                                <td>35,00</td>
                                <td class="highlight-green">35,00 - 55,00</td>
                            </tr>
                            <tr>
                                <td>Лимфоциты (LYM), <br>%</td>
                                <td>37,00</td>
                                <td class="highlight-green">33,00 - 61,00</td>
                            </tr>
                            <tr>
                                <td>Моноциты (MONO), <br>%</td>
                                <td>5.6</td>
                                <td class="highlight-green">3,00 - 10,00</td>
                            </tr>
                            <tr>
                                <td>Эозинофилы (EOS), <br>%</td>
                                <td>1.2</td>
                                <td class="highlight-green">0,000 - 5,000</td>
                            </tr>
                            <tr>
                                <td>СОЭ (Скорость оседания эритроцитов) <br>по Вестергрену, мм/час</td>
                                <td>2</td>
                                <td class="highlight-green">2 - 15</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="test-item">
                <div class="test-title" onclick="toggleDetails(this)">
                    <span>Биохимическое исследование крови</span>
                    <button class="toggle-button">+</button>
                </div>
                <div class="test-details">
                    <!-- Содержимое таблицы для "Биохимическое исследование крови" -->
                    <table>
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Результат</th>
                                <th>Нормы</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Осмолярность,<br> мОсм/л</td>
                                <td>271.2</td>
                                <td class="highlight-green">250,0 - 310,0</td>
                            </tr>
                            <tr>
                                <td>Глюкоза, мМоль/л</td>
                                <td>5</td>
                                <td class="highlight-green">3,3 - 5,6</td>
                            </tr>
                            <tr>
                                <td>Мочевина, мМоль/л</td>
                                <td>2.3</td>
                                <td class="highlight-green">1,7 - 8,3</td>
                            </tr>
                            <tr>
                                <td>Креатинин, мкмоль/<br>л</td>
                                <td>45</td>
                                <td class="highlight-green">45 - 105</td>
                            </tr>
                            <tr>
                                <td>Общий белок, г/л</td>
                                <td>62.7</td>
                                <td class="highlight-green">57,0 - 80,0</td>
                            </tr>
                            <tr>
                                <td>Альбумин, г/л</td>
                                <td>42.7</td>
                                <td class="highlight-green">35,0 - 52,0</td>
                            </tr>
                            <tr>
                                <td>Альбумин-<br>глобулиновый<br> коэффициент</td>
                                <td>1,9</td>
                                <td class="highlight-green">1,08 - 1,94</td>
                            </tr>
                            <tr>
                                <td>АСТ, МЕ/л</td>
                                <td>35</td>
                                <td class="highlight-green">0 - 40</td>
                            </tr>
                            <tr>
                                <td>АЛТ, МЕ/л</td>
                                <td>399</td>
                                <td class="highlight-green">0 - 45</td>
                            </tr>
                            <tr>
                                <td>Креатинкиназа, Ед/л</td>
                                <td>17570</td>
                                <td class="highlight-green">5 - 171</td>
                            </tr>
                            <tr>
                                <td>Лактатдегидрогеназа,<br> Ед/л</td>
                                <td>1556</td>
                                <td class="highlight-green">110 - 295</td>
                            </tr>
                            <tr>
                                <td>Щелочная <br>фосфатаза, МЕ/л</td>
                                <td>135</td>
                                <td class="highlight-green">93 - 309</td>
                            </tr>
                            <tr>
                                <td>Билирубин общий,<br> мкмоль/л</td>
                                <td>7.8</td>
                                <td class="highlight-green">2,0 - 21,0</td>
                            </tr>
                            <tr>
                                <td>Билирубин <br>связанный, мкмоль/л</td>
                                <td>1.2</td>
                                <td class="highlight-green">0,0 - 7,0</td>
                            </tr>
                            <tr>
                                <td>Билирубин <br>свободный, мкмоль/л</td>
                                <td>6.7</td>
                                <td class="highlight-green">0,5 - 20,0</td>
                            </tr>
                            <tr>
                                <td>Натрий, мМоль/л</td>
                                <td>137</td>
                                <td class="highlight-green">135,0 - 147,0</td>
                            </tr>
                            <tr>
                                <td>Калий, мМоль/л</td>
                                <td>4.3</td>
                                <td class="highlight-green">3,70 - 5,12</td>
                            </tr>
                            <tr>
                                <td>CA ++ (Кальций <br>ионизированный), <br>мМоль/л</td>
                                <td>1.21</td>
                                <td class="highlight-green">1,13 - 1,32</td>
                            </tr>
                            <tr>
                                <td>Кальций общий,<br> мМоль/л</td>
                                <td>2.37</td>
                                <td class="highlight-green">2,20 - 2,70</td>
                            </tr>
                            <tr>
                                <td>Гемолиз</td>
                                <td>0 (Не обнаружен)</td>
                                <td class="highlight-green"></td>
                            </tr>
                            <tr>
                                <td>Липемия</td>
                                <td>0 (Не обнаружен)</td>
                                <td class="highlight-green"></td>
                            </tr>
                            <tr>
                                <td>Иктеричность</td>
                                <td>0 (Не обнаружен)</td>
                                <td class="highlight-green"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="test-item">
                <div class="test-title" onclick="toggleDetails(this)">
                    <span>Иммунохимия</span>
                    <button class="toggle-button">+</button>
                </div>
                <div class="test-details">
                    <!-- Содержимое таблицы для "Иммунохимия" -->
                    <table>
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Результат</th>
                                <th>Нормы</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Паратиреоидный гормон, пг/мл</td>
                                <td>38.1</td>
                                <td class="highlight-green">16,0 - 62,0</td>
                            </tr>
                            <tr>
                                <td>Тиреотропный гормон, мкМЕ/мл</td>
                                <td>2.601</td>
                                <td class="highlight-green">1,100 - 8,430</td>
                            </tr>
                            <tr>
                                <td>Т4 свободный, пмоль/л</td>
                                <td>14</td>
                                <td class="highlight-green">7,87 - 14,30</td>
                            </tr>
                            <tr>
                                <td>Т3 свободный, пмоль/л</td>
                                <td>6.33</td>
                                <td class="highlight-green">4,98 - 12,28</td>
                            </tr>
                            <tr>
                                <td>Антитела к тиреопероксидазе, IU/ml</td>
                                <td>&lt;0,3</td>
                                <td class="highlight-green">0,0 - 9,0</td>
                            </tr>
                            <tr>
                                <td>Антитела к тиреоглобулину, IU/ml</td>
                                <td>&lt;0,9</td>
                                <td class="highlight-green">0,0 - 4,0</td>
                            </tr>
                            <tr>
                                <td>25 - ОН Витамин Д, нг/мл</td>
                                <td>23.4</td>
                                <td class="highlight-green">14,0 - 60,0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <button id="nextButtonChild" class="next-button">Далее</button>
        </div>
    </div>
        `,
        nextSlide: 17
    },
    {
        type: 'info',
        background: 'images/51.png',
        content: `
             <div class="sign">
        <div class="patient-child">
            <img src="images/heart_rate_02.png" alt="Warning" class="warning-icon">
            <h2 class="about_patient">Обследования</h2>
        </div>
        <hr class="dashed-line">
                    <div class="lab-tests">
                        <div class="test-item">
                            <div class="test-title" onclick="toggleDetails(this)">
                                <span>Электрокардиография</span>
                                <button class="toggle-button">+</button>
                            </div>
                            <div class="test-details">
                                <p class="text-block">Электрокардиография (клино+орто+физ.нагрузка)<br>
                                    Заключение: Незначительная синусовая аритмия, ЧСС - 115-103 уд. в мин. Вертикальное положение ЭОС. 
                                    <br>Признаки синдрома ранней реполяризации желудочков.</p>
                                
                            </div>
                        </div>
                        
                        <div class="test-item">
                            <div class="test-title" onclick="toggleDetails(this)">
                                <span>Эхокардиография</span>
                                <button class="toggle-button">+</button>
                            </div>
                            <div class="test-details">
                                <p class="text-block">                        
                                    Площадь поверхности тела 0,85 м2. Магистральные сосуды и предсердия: Аорта 22,5 мм (N 19 - 25)
                                    Легочная артерия 22,1 мм. Левое предсердие 27,7 мм. (N 17 - 29), V 23,4 мл., Vi 27,5. Правое предсердие V 20,1
                                    мл., Vi 23,6. Левый желудочек: Тзслж = 5,2 мм. (N 4 - 7) Тзслж = 26,1 мм. (N 17 - 28) УО = 49,4 мл. ФВ = 60,0 мм.
                                    (N>55% - по Симпсону) Масса миокарда = 61,3 г. ИОТС = 0,27 Правый желудочек: Правый желудочек = 14,2 мм.
                                    (N 5 - 15) TAPSE = 23,4 мм. Митральный клапан: створки тонкие Поток 1,14 м/сек. Регургитация нет 
                                    Аортальный клапан: трехстворчатый, створки тонкие. Поток 1,22 м/сек. Регургитация нет Трискуспидальный 
                                    клапан: створки тонкие. Поток 1,22 м/сек. Регургитация физиол. Клапан легочной артерии: створки тонкие. 
                                    Поток 1,19 м/сек. Регургитация физиол. МПП интактна. МЖП сокращается правильно. Дополнительные
                                    особенности: Фальшхорды в полости ЛЖ. Поток в нисх. Ао - 1,33 м/сек. . Заключение: Эхокг признаков 
                                    пороков сердца не выявлено. Умеренно выраженная тоногенная дилатация полости левого желудочка без 
                                    признаков снижения глобальной сократительной способности миокарда. Диастолическая функция не 
                                    нарушена. Клапаны интактны. Фальшхорды в полости левого желудочка.
                                </p>
                                
                            </div>
                        </div>
                        
                        <div class="test-item">
                            <div class="test-title" onclick="toggleDetails(this)">
                                <span>УЗИ брюшной полости и почек</span>
                                <button class="toggle-button">+</button>
                            </div>
                            <div class="test-details">
                                <p class="text-block">                        
                                    Печень: размеры резко увеличены, КВР правой доли - 11,7 см, I сегмент печени - 32% (норма до 30%), нижний край - выступает из-под реберной дуги по правой срединно-ключичной линии на 2,5 см, эхогенность паренхимы - обычная, эхоструктура паренхимы - однородная, сосуды - не расширены: воротная вена - 0,7 см, протоки - не расширены, доп.информация - Усилены сигналы от перипортальных зон. Желчный пузырь: форма - каплевидная, физиологический перегиб в пришеечной области, размер - увеличен, пузырь частично опорожнен после приема пищи, просвет - однороден. Поджелудочная железа: визуализируется удовлетворительно, осмотрена не натощак, размеры (головка) - 1.3 см., (тело) - 0.8 см., (хвост) - 1.8 см., контур - ровный, эхогенность паренхимы - обычная, эхоструктура - диффузно неоднородна. Селезенка: размеры - не увеличены: 8,2 х 3,6 см, эхогенность паренхимы - не изменена, эхоструктура - однородная, селезеночная вена - не расширена - 0,5 см. Почки: расположены - в типичном месте, подвижность - правой почки - 2,7% (норма до 1,8% от роста), левой почки в пределах нормы, контур - по задней поверхности правой почки в средней трети - фиброзный тяж (остаточные явления врожденной дольчатости), контур левой почки ровный, размеры (правая) - 8.4x5.7x5.7 см. объем 100.2 см3., размеры (левая) - 8.5x5.5x5.5 см. объем 102.7 см3., соотношение объема почек и массы тела - 0.87% норма (0,4-0,6 %), паренхима - обычной эхогенности, дифференцирована, утолщена, центральный эхокомплекс - слева расщеплен паренхимой, при ЦДК сосудистый рисунок не изменен, лоханки - справа: лоханка - 0,8 см (смешанный тип), чашечки - до 0,5 см слева: лоханка - 0,5 см (смешанный тип). Мочевой пузырь: хорошо заполнен, стенка утолщена - 0,53 см, просвет однороден, размеры - 3x5.1x4.7 см. Заключение: Гепатомегалия. Реактивные изменения печени, поджелудочной железы. Увеличение желчного пузыря. Увеличение объема почек. Утолщение паренхимы почек. Расширение лоханки правой почки. Повышение подвижности правой почки. Утолщение стенки мочевого пузыря. Резко выражен метеоризм.
                                </p>
                                
                            </div>
                        </div>
                        <div class="test-item">
                            <div class="test-title" onclick="toggleDetails(this)">
                                <span>Функция внешнего дыхания</span>
                                <button class="toggle-button">+</button>
                            </div>
                            <div class="test-details">
                                <p class="text-block">                        
                                    VC in = 77 %, VC ex = 78 %. Скоростные показатели форсированного выдоха достоверной оценке не подлежат. Можно предполагать умеренные рестриктивные нарушения функции внешнего дыхания. Исследование на фоне неудовлетворительного (среднего) взаимодействия с ребенком.
                                </p>
                            </div>
                        </div>
                        
                        <button id="nextButtonChild" class="next-button">Далее</button>
                    </div>
                    
                
                </div>`,
        nextSlide: 18
    },
    {
        type: 'question',
        background: 'images/slide3.png', 
        content: `
            <div id="qa-container">
                <!-- Вопрос и ответы вставляются динамически -->
            </div>
        `,
        questionData: {
            id: 18,
            text: "Какие лабораторные обследования рекомендованы пациентам с установленным диагнозом ПМДД?",
            answers: [
                { id: 1, text: "Исследование кислотно-основного состояния и газов крови для оценки степени компенсации дыхательных нарушений и определения тактики респираторной поддержки.", value: "correct-answer-value" },
                { id: 2, text: "Молекулярно-генетическое исследование в гене DMD.", value: "wrong-answer-value" },
                { id: 3, text: "Биопсия мышц и патологоанатомическое исследование биопсийного (операционного) материала мышечной ткани методом иммуногистохимии на наличие дистрофина.", value: "another-wrong-answer-value" },
                { id: 4, text: "Определение активности креатинкиназы в крови.", value: "third-wrong-answer-value" }
            ],
            correctDescription: "Пациентам с установленным диагнозом ПМДД рекомендуется исследование кислотно-основного состояния и газов крови для оценки степени компенсации дыхательных нарушений и определения тактики респираторной поддержки<sup>1</sup>.",
            wrongDescription: {
                "wrong-answer-value": "Правильный ответ: Исследование кислотно-основного состояния и газов крови для оценки степени компенсации дыхательных нарушений и определения тактики респираторной поддержки.<br><br>Молекулярно-генетическое исследование в гене DMD рекомендуется всем пациентам с клиническими симптомами, характерными для ПМДД, или пациентам без клинической симптоматики, но с повышенным уровнем КФК для подтверждения диагноза и проведения медико-генетического консультирования семьи<sup>1</sup>.",
                "another-wrong-answer-value": "Правильный ответ: Исследование кислотно-основного состояния и газов крови для оценки степени компенсации дыхательных нарушений и определения тактики респираторной поддержки.<br><br>Биопсия мышц и патологоанатомическое исследование биопсийного (операционного) материала мышечной ткани методом иммуногистохимии на наличие дистрофина показаны в случаях сомнительных результатов генетического обследования или невозможности его проведения с целью подтверждения диагноза<sup>1</sup>.",
                "third-wrong-answer-value": "Правильный ответ: Исследование кислотно-основного состояния и газов крови для оценки степени компенсации дыхательных нарушений и определения тактики респираторной поддержки.<br><br>Определение активности креатинкиназы в крови показано всем пациентам с клиническими симптомами, характерными для ПМДД, с целью ранней диагностики заболевания<sup>1</sup>."
            },
            additionalInfo: {
                "wrong-answer-value": `
                    1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.
                `,
                "another-wrong-answer-value": `
                    1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.
                `,
                "third-wrong-answer-value": `
                    1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.
                `
            },
            nextSlide: 19 
        }
    },
    {
        type: 'question',
        background: 'images/slide9.png', 
        content: `
            <div id="qa-container">
                <!-- Вопрос и ответы вставляются динамически -->
            </div>
        `,
        questionData: {
            id: 19,
            text: "Какие инструментальные обследования рекомендованы пациентам с установленным диагнозом ПМДД?",
            answers: [
                { id: 1, text: "МРТ мышечной системы, рентгенография или КТ грудного и поясничного отдела позвоночника, ЭКГ и Эхо-КГ сердца, рентгеноденситометрия поясничного отдела позвоночника, спирометрия.", value: "correct-answer-value" },
                { id: 2, text: "ЭКГ и Эхо-КГ сердца, спирометрия.", value: "wrong-answer-value" },
                { id: 3, text: "МРТ мышечной системы, рентгенография или КТ грудного и поясничного отдела позвоночника, рентгеноденситометрия поясничного отдела позвоночника.", value: "wrong-answer-value" }
            ],
            correctDescription: "Пациентам с установленным диагнозом ПМДД рекомендованы следующие инструментальные обследования<sup>1</sup>:<br><br>• МРТ мышечной системы (МРТ целевых мышц) с целью оценки степени поражения мышечной ткани.<br>• Рентгенография или КТ грудного и поясничного отдела позвоночника с целью оценки степени сколиоза, а также определения возможности и степени хирургического вмешательства.<br>• ЭКГ и Эхо-КГ сердца с целью выявления специфического поражения сердца.<br>• Спирометрия для оценки функционального состояния легких.<br>• Рентгеноденситометрия поясничного отдела позвоночника для исключения остеопороза.",
            wrongDescription: {
                "wrong-answer-value": "Правильный ответ: МРТ мышечной системы, рентгенография или КТ грудного и поясничного отдела позвоночника, ЭКГ и Эхо-КГ сердца, рентгеноденситометрия поясничного отдела позвоночника, спирометрия.<br><br>Эти обследования рекомендованы всем пациентам с диагнозом ПМДД<sup>1</sup>."
            },
            additionalInfo: {
                "wrong-answer-value": `
                    1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.
                `
            },
            nextSlide: 20
        }
    },
    {
        type: 'info',
        background: 'images/slide12.png',
        content: `
        <div class="sign">
        <div class="patient-child">
        <img src="images/healtcare.png" alt="Warning" class="warning-icon">
        <h2 class="about_patient">Консультация специалистов</h2>
        </div>
        <hr class="dashed-line">
        
        <p><strong>Консультация физиотерапевта</p></strong></p>
        <p class="text-block_diagnosis">Диагноз: G71.0 - Мышечная дистрофия<br>
        Рекомендации:<br>
        Назначен курс восстановительного лечения в виде: магнитотерапии сегментарно и подколенных обл №10<br>
        Стимуляция мышц спины бедер Миомед с БОС № 5</p>
        
    
        <p><strong>Консультация логопеда</strong></p>
        <p class="text-block_diagnosis">Диагноз: Дизартрия. Сложная дислалия.<br>
        Рекомендации:<br>
        Занятия с логопедом, дефектологом, психологом по месту жительства.</p>

        <p><strong>Консультация кардиолога:</strong></p>
        <p class="text-block_diagnosis">42.9 - Кардиопатия неуточнённая у ребёнка с ПМД Дюшенна(умеренная дилятация полости ЛЖ).</p>
        
        <button id="nextButtonChild">Далее</button>
        </div>
        </div>
        `,
        nextSlide: 21
        },
        {
            type: 'question',
            background:'images/slide3.png',
            content: `
                <div id="qa-container">
                    <!-- Вопрос и ответы вставляются динамически -->
                </div>
            `,
            questionData: {
                id: 21,
                text: "Какие дополнительные обследования рекомендованы пациентам с установленным диагнозом ПМДД?",
                answers: [
                    { id: 1, text: "Шестиминутный тест с ходьбой и функциональные временные тесты.", value: "another-wrong-answer-value" },
                    { id: 2, text: "Гониометрия и консультации узких специалистов.", value: "another-wrong-answer-value" },
                    { id: 3, text: "Шестиминутный тест с ходьбой, функциональные временные тесты, гониометрия, консультации узких специалистов.", value: "correct-answer-value" },
                    { id: 4, text: "Шестиминутный тест с ходьбой, функциональные временные тесты, гониометрия, консультации узких специалистов, ночная пульсоксиметрия.", value: "wrong-answer-value" }
                ],
                correctDescription: "Пациентам с установленным диагнозом ПМДД рекомендованы следующие дополнительные обследования<sup>1</sup>:<br><br>• Проведение 6-ти минутного теста с ходьбой для оценки моторных функций и выносливости.<br>• Функциональные временные тесты: подъем из положения сидя/лежа, время подъема/спуска на 4 ступени, время ходьбы/бега на 10 метров для оценки моторных функций.<br>• Проведение гониометрии для определения степени подвижности суставов и выявления наличия развивающихся контрактур.<br>• Консультации различных узких специалистов (генетика, пульмонолога, кардиолога, эндокринолога, гастроэнтеролога, ортопеда, диетолога, невролога, психиатра, офтальмолога, физиотерапевта и др.).",
                wrongDescription: {
                    "wrong-answer-value": "Правильный ответ: Шестиминутный тест с ходьбой, функциональные временные тесты, гониометрия, консультации узких специалистов.<br><br>Эти дополнительные обследования рекомендованы пациентам с установленным диагнозом ПМДД<sup>1</sup>, а ночная пульсоксиметрия относится к диагностическим инструментальным исследованиям и показана пациентам с МДД при снижении ЖЕЛ менее 50% для выявления синдрома обструктивного апноэ во сне.",
                    "another-wrong-answer-value": "Правильный ответ: Шестиминутный тест с ходьбой, функциональные временные тесты, гониометрия, консультации узких специалистов.<br><br>Эти дополнительные обследования рекомендованы пациентам с установленным диагнозом ПМДД<sup>1</sup>.",
                },
                additionalInfo: {
                    "another-wrong-answer-value": `
                        1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.
                    `
                },
                nextSlide: 22
            }
        },
        {
            type: 'info',
            background: 'images/slide12.png',
            content: `
    
             <div class="sign">
                 <div class="patient-child">
                <img src="images/treat.png" alt="Warning" class="warning-icon">
                 <h2 class="about_patient">Рекомендации</h2>
                </div>
                <hr class="dashed-line">
            
        
            <p class="text-block_diagnosis">1. Наблюдение кардиолога по месту жительства. Повторный осмотр через 6 мес, включая ЭКГ,<br> ЭХОКГ, при появлении жалоб-ранее.<br><br>
                2. Начать прием кардиопротективной терапии, учитывая основной диагноз (миопатия Дюшенна):<br> каптоприл (1 таб=25 мг) по 1/4 таб х 1 раз в день. Через месяц увеличить дозу и принимать  по 1/4<br> таб х 2 р/день. Принимать постоянно при хорошей переносимости.<br><br>
                3. Левокарнитин (раствор 30%) по 1 мл х 2 раза в день. Возможен постоянны приём.<br><br>
                4. Убидекаренон (раствор 3%) по 15 кап х 1 р/день утром. Возможен постоянный прием.</p>
            
            
            
            <button id="nextButtonChild">Далее</button>
        </div>
    </div>
            `,
            nextSlide: 23
            },
            {
                type: 'info',
                background: 'images/slide12.png',
                content: `
                <div class="sign">
        <div class="patient-child">
            <img src="images/treat.png" alt="Warning" class="warning-icon">
            <h2 class="about_patient">Рекомендации</h2>
        </div>
            <hr class="dashed-line">
            
        
            <div class="text-block_rec">
                <p>1. Наблюдение педиатра, невролога, кардиолога, ортопеда по месту жительства.</p>
                
                <p><strong>Препараты для постоянного приема:</strong></p>
                <p>1. Преднизолон по 12,5 мг 1 раз в день в одно и то же утреннее время не на голодный желудок (контроль веса еженедельно, артериального давления 3 раза в неделю и уровня глюкозы крови раз в 6 месяцев);</p>
                <p>2. Начать прием кардиопротективной терапии, учитывая основной диагноз (миопатия Дюшенна): каптоприл (1 таб = 25 мг) по 1/4 таб 1 раз в день. Через месяц увеличить дозу и принимать по 1/4 таб 2 раза в день. Принимать постоянно при хорошей переносимости;</p>
                <p>3. Колекальциферол (витамин D3) 3500 МЕ 1 раз в день в 18:00 ежедневно с октября по май.</p>
                
                <p><strong>Дополнительные препараты:</strong></p>
                <p>1. Левокарнитин (Элькар 30%) 20 капель 2 раза в день – постоянно;</p>
                <p>2. Убидекаренон (Кудесан) 10 капель 2 раза в день – курсами по 2 месяца, 2 месяца перерыв;</p>
                <p>3. Массаж конечностей противопоказан;</p>
                <p>4. Физиотерапия: МТ голеней, ягодиц, позвоночника; кинезотерапия; лечебные грязи, аппликации озокерита, парафина на голеностопные суставы №10 – 4 раза в год;</p>
                <p>5. Рекомендовано ЛФК в бассейне 2 раза в неделю;</p>
                <p>6. ЛФК – ежедневно по всем отделам, растяжки;</p>
                <p>7. 8-09-49 и 9-01-06 Тутор на голеностопный сустав (на ночь и на дневной отдых) 2 шт. в положении максимальной коррекции до угла 90 градусов, с ограничением подошвенного сгибания, с дополнительной фиксирующей вкладкой на стопу (вкладной башмачок), с фиксацией через голеностопный сустав с заменой по мере физиологического роста ребенка или изменения его функционального состояния;</p>
                <p>8. 9-01-01 Обувь ортопедическая сложная без утепленной подкладки;</p>
                <p>9. 9-02-01 Обувь ортопедическая сложная на утепленной подкладке;</p>
                <p>10. Профилактика респираторных заболеваний. При ОРВИ противопоказано применение муколитической терапии, при необходимости рекомендовано применение ингаляций с беродуалом и пульмикортом через небулайзер и раннее назначение антибактериальной терапии;</p>
                <p>11. При планировании беременности на 8-10 неделе провести пренатальную диагностику на ранее выявленную мутацию (МГНЦ РАМН);</p>
                <p>12. С учетом проградиентного характера течения основного заболевания с нарушением функции самостоятельного перемещения и самообслуживания, рекомендовано прохождение МСЭ с целью получения инвалидности;</p>
                <p>13. Рекомендованы постоянные занятия на тренажере пассивно-активной нагрузки;</p>
                <p>14. Рекомендовано санаторно-курортное лечение на морском побережье в летний период – 1 раз в год;</p>
                <p>15. При необходимости проведения оперативного лечения под наркозом необходимо учитывать риск развития злокачественной гипертермии и исключить сукцинилхолин и ингаляционные анестетики, предпочтительно применять наркоз с пропофолом.</p>
            </div>
            
            
            
            <button id="nextButtonChild">Далее</button>
        </div>
    </div>
                `,
                nextSlide: 24
                },
                {
                    type: 'info',
                    background: 'images/slide12.png',
                    content: `
                    
    <div class="sign">
        <div class="patient-child">
            <img src="images/pill.png" alt="Warning" class="warning-icon">
            <h2 class="about_patient">Лечение</h2>
        </div>
            <hr class="dashed-line">
            
            
            <p class="normal-text25">
            
                <strong class="bold_text_25">Проведено лечение:</strong><br><br>
                

                Проведено лечение по ОМС.<br>
                Стол: ОВД.<br>
                Режим: общий.<br>
                Назначения:<br>
                Колекальциферол* (Аквадетрим (капли для приема внутрь 15 000 МЕ/мл)) ежедневно per os 5 капель вечером.<br>
                Проведено восстановительное лечение:<br>
                A17.02.001.001: Электростимуляция мышц ( 2 и более полей) (5 раз(а)).<br>
                A17.30.019.001: Воздействие переменным магнитным полем (ПеМП) (магнитотерапия) (3 и более полей) (10 раз(а)).<br>
                Кинезотерапия на тренажере Мотомед с БОС 7 раз.<br>
                Ортопедические растяжки 7 раз.</p>
            <button id="nextButtonChild">Далее</button>
        </div>
    </div>

                    `,
                    nextSlide: 25
                    },
                    {
                        type: 'question',
                        background: 'images/slide3.png',
                        content: `
                            <div id="qa-container">
                                <!-- Вопрос и ответы вставляются динамически -->
                            </div>
                        `,
                        questionData: {
                            id: 25,
                            text: "Перечислите основные подходы к<br> ведению пациентов с МДД?",
                            answers: [
                                { id: 1, text: "Патогенетическая терапия.", value: "wrong-answer-value" },
                                { id: 2, text: "Симптоматическая терапия.", value: "wrong-answer-value" },
                                { id: 3, text: "Диета, обогащенная белками, микроэлементами, включение в рацион пищевых добавок, содержащих кальций, витамины группы В, D, левокарнитин для поддержания мышечной массы.", value: "wrong-answer-value" },
                                { id: 4, text: "Хирургическое лечение: коррекция контрактур, эквиноварусной деформации стоп, сколиоза.", value: "wrong-answer-value" },
                                { id: 5, text: "Всё вышеперечисленное.", value: "correct-answer-value" }
                            ],
                            correctDescription: "Основные подходы к ведению пациентов с МДД<sup>1</sup>:<br>• Патогенетическая терапия.<br>• Симптоматическая терапия.<br>• Диета, обогащенная белками, микроэлементами, включение в рацион пищевых добавок, содержащих кальций, витамины группы В, D, левокарнитин для поддержания мышечной массы.<br>• Хирургическое лечение: коррекция контрактур, эквиноварусной деформации стоп, сколиоза.",
                            wrongDescription: {
                                "wrong-answer-value": "Правильный ответ: Всё вышеперечисленное.<br><br>Основные подходы к ведению пациентов с МДД<sup>1</sup>:<br>• Патогенетическая терапия.<br>• Симптоматическая терапия.<br>• Диета, обогащенная белками, микроэлементами, включение в рацион пищевых добавок, содержащих кальций, витамины группы В, D, левокарнитин для поддержания мышечной массы.<br>• Хирургическое лечение: коррекция контрактур, эквиноварусной деформации стоп, сколиоза.",
                            },
                            additionalInfo: {
                                "wrong-answer-value": `
                                    1. Клинические рекомендации. Прогрессирующая мышечная дистрофия Дюшенна. Прогрессирующая мышечная дистрофия Беккера. 2023 год.
                                `,
                            },
                            nextSlide: 26
                        }
                    },
                    {
                        type: 'info',
                        background: 'images/end.png',
                        content: `
                            <div class="container_end" id="container_end">
                            <p class="title" id="title_end">Спасибо за участие</p>
                            <div class="button-container" id="container_end_btn">
                                <button id="nextButton">Пройти заново</button>
                            </div>
                        </div>
                        `,
                        nextSlide: 0
                    }
];
