export default async function PublicOfferPageUk() {
  const exchangeRateResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/money/exchange?currency=USD`
  );
  const exchangeRate = await exchangeRateResponse.json();
  const now = new Date();
  const today = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`;

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        ПУБЛІЧНИЙ ДОГОВІР (ОФЕРТА)
      </h1>
      <p className="text-center text-lg font-semibold mb-8">
        на послуги з використання сервісу Kid-Wise
      </p>

      <div className="text-gray-700 text-base space-y-6 leading-relaxed">
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm">
            Цей договір є офертою для укладення договору про надання послуг з
            використання сервісу Kid-Wise, розміщеної на сайті{' '}
            <strong>kidwise.com.ua</strong>. Договір вважається укладеним з
            моменту створення облікового запису або здійснення платежу за
            послуги.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            1. ЗАГАЛЬНІ ПОЛОЖЕННЯ
          </h2>
          <div className="space-y-3">
            <p>
              <strong>1.1.</strong> Даний договір (далі - «Договір») - публічна
              оферта відповідно до статті 633 Цивільного кодексу України,
              адресована фізичним особам, які досягли повноліття (далі -
              «Користувач»).
            </p>
            <p>
              <strong>1.2.</strong> Предмет договору – надання доступу до
              сервісу Kid-Wise для створення пояснень слів та понять для дітей
              за допомогою штучного інтелекту.
            </p>
            <p>
              <strong>1.3.</strong> Інтернет-сервіс – веб-сайт за адресою
              kidwise.com.ua та мобільні додатки, призначені для надання послуг
              з пояснення слів та понять дітям.
            </p>
            <p>
              <strong>1.4.</strong> Користувач – фізична особа, яка досягла 18
              років, володіє цивільною дієздатністю в повному обсязі,
              зареєструвалася на сайті та використовує послуги Kid-Wise.
            </p>
            <p>
              <strong>1.5.</strong> Постачальник – ФОП Степаненко Всеволод
              Віталійович, зареєстрований за адресою: Україна, 37200, Полтавська
              область, м. Лохвиця, вул. Лугова, 1, тел. +380-664-484-251, email:
              v.step2327@gmail.com
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. ПРЕДМЕТ ДОГОВОРУ
          </h2>
          <div className="space-y-3">
            <p>
              <strong>2.1.</strong> Постачальник зобов&apos;язується надавати
              Користувачу доступ до сервісу Kid-Wise, а Користувач
              зобов&apos;язується сплачувати за надані послуги згідно з
              тарифними планами.
            </p>
            <p>
              <strong>2.2.</strong> Перелік послуг інтернет-сервісу включає в
              себе:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>
                Безкоштовне пояснення слів та понять (обмежена кількість на
                день)
              </li>
              <li>Преміум підписка з необмеженими поясненнями</li>
              <li>Додаткові матеріали: вірші, ігри, цікаві факти</li>
              <li>Генерація зображень для візуалізації понять</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            3. ПОРЯДОК ЗАМОВЛЕННЯ
          </h2>
          <div className="space-y-3">
            <p>
              <strong>3.1.</strong> Користувач розміщує замовлення на
              інтернет-сервісі шляхом реєстрації облікового запису та вибору
              тарифного плану.
            </p>
            <p>
              <strong>3.2.</strong> Для замовлення послуг Користувач повинен
              надати наступну обов&apos;язкову інформацію:
            </p>
            <ul className="list-disc pl-8 space-y-1">
              <li>Електронна адреса</li>
              <li>Пароль для доступу до облікового запису</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">4. ЦІНИ ТА ОПЛАТА</h2>
          <div className="space-y-3">
            <p>
              <strong>4.1.</strong> Вартість послуг вказана на сайті в гривнях
              та доларах США. Ціни можуть змінюватися Постачальником в
              односторонньому порядку.
            </p>
            <p>
              <strong>4.2.</strong> Поточні тарифи:
            </p>
            <ul className="list-disc pl-8 space-y-1">
              <li>Безкоштовний план: 3 пояснення на день</li>
              <li>
                Місячна підписка: 5 USD/місяць. За курсом НБУ на день оплати.
                Станом на {today}: {(exchangeRate.rate * 5).toFixed(2)}{' '}
                грн/місяць.
              </li>
              <li>
                Річна підписка: 50 USD/рік. За курсом НБУ на день оплати. Станом
                на {today}: {(exchangeRate.rate * 50).toFixed(2)} грн/рік.
              </li>
            </ul>
            <p>
              <strong>4.3.</strong> Оплата здійснюється через платіжну систему
              LiqPay.
            </p>
            <p>
              <strong>4.4.</strong> Підписка автоматично поновлюється. Для
              скасування зверніться до служби підтримки.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">5. НАДАННЯ ПОСЛУГ</h2>
          <div className="space-y-3">
            <p>
              <strong>5.1.</strong> Послуги надаються цілодобово через
              інтернет-сервіс з технічними перервами для обслуговування.
            </p>
            <p>
              <strong>5.2.</strong> Постачальник має право тимчасово припинити
              надання послуг для проведення технічних робіт з попереднім
              повідомленням Користувачів.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            6. ПОВЕРНЕННЯ КОШТІВ
          </h2>
          <div className="space-y-3">
            <p>
              <strong>6.1.</strong> Користувач може відмовитися від послуг
              протягом 14 календарних днів з моменту оплати відповідно до Закону
              України &quot;Про захист прав споживачів&quot;.
            </p>
            <p>
              <strong>6.2.</strong> Для повернення коштів Користувач повинен
              направити письмову заяву на електронну адресу{' '}
              <a href="mailto:v.step2327@gmail.com">v.step2327@gmail.com</a> з
              зазначенням:
            </p>
            <ul className="list-disc pl-8 space-y-1">
              <li>ПІБ та контактних даних</li>
              <li>Номера транзакції</li>
              <li>Причини повернення</li>
              <li>Реквізитів для повернення коштів</li>
            </ul>
            <p>
              <strong>6.3.</strong> Повернення коштів здійснюється протягом 14
              робочих днів на той же платіжний засіб, з якого була здійснена
              оплата.
            </p>
            <p>
              <strong>6.4.</strong> Послуги, які вже були використані,
              поверненню не підлягають, крім випадків, передбачених чинним
              законодавством України.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            7. ВІДПОВІДАЛЬНІСТЬ
          </h2>
          <div className="space-y-3">
            <p>
              <strong>7.1.</strong> Постачальник не несе відповідальності за
              збитки, спричинені неправильним використанням сервісу або
              технічними збоями в роботі інтернету.
            </p>
            <p>
              <strong>7.2.</strong> Користувач несе повну відповідальність за
              достовірність наданої інформації та правомірність використання
              сервісу.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            8. ВИРІШЕННЯ СПОРІВ
          </h2>
          <div className="space-y-3">
            <p>
              <strong>8.1.</strong> Всі спори вирішуються шляхом переговорів. У
              разі недосягнення згоди спори підлягають розгляду в судах України
              згідно з чинним законодавством.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">9. ІНШІ УМОВИ</h2>
          <div className="space-y-3">
            <p>
              <strong>9.1.</strong> Цей договір діє до виконання сторонами своїх
              зобов&apos;язань.
            </p>
            <p>
              <strong>9.2.</strong> Постачальник має право вносити зміни до
              договору з попереднім повідомленням Користувачів на сайті.
            </p>
          </div>
        </section>

        <section className="mt-12 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">
            РЕКВІЗИТИ ПОСТАЧАЛЬНИКА:
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>
              <strong>ФОП Степаненко Всеволод Віталійович</strong>
            </p>
            <p>Код ЄДРПОУ: 3609003655</p>
            <p>
              Адреса: Україна, 37200, Полтавська область, м. Лохвиця, вул.
              Лугова, 1
            </p>
            <p>Телефон: +380-664-484-251</p>
            <p>Email: v.step2327@gmail.com</p>
            <p>Сайт: kid-wise.app</p>
          </div>
        </section>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Договір набуває чинності з моменту акцептування оферти Користувачем
          </p>
          <p>
            Дата останнього оновлення: {new Date().toLocaleDateString('uk-UA')}
          </p>
        </div>
      </div>
    </main>
  );
}
