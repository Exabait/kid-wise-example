export default function CompanyInfoPageUk() {
  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Kid-Wise - Контактна інформація та реквізити компанії
      </h1>

      {/* Quick Contact Section - Prominently displayed */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Зв&apos;яжіться з нами
        </h2>
        <div className="grid md:flex justify-evenly items-center gap-6 text-center">
          <div>
            <h3 className="font-semibold mb-2">📧 Електронна пошта</h3>
            <a
              href="mailto:v.step2327@gmail.com"
              className="text-blue-100 hover:text-white underline text-lg"
            >
              v.step2327@gmail.com
            </a>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📞 Телефон</h3>
            <a
              href="tel:+380664484251"
              className="text-blue-100 hover:text-white underline text-lg"
            >
              +380-664-484-251
            </a>
          </div>
        </div>
      </section>

      <div className="space-y-8">
        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            Офіційні реквізити компанії
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Повне найменування:
              </h3>
              <p className="text-gray-700">
                ФОП Степаненко Всеволод Віталійович
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Код ЄДРПОУ:</h3>
              <p className="text-gray-700">3609003655</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Юридична адреса:
              </h3>
              <p className="text-gray-700">
                Україна, 37200, Полтавська область, м. Лохвиця, вул. Лугова, 1
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Дата реєстрації:
              </h3>
              <p className="text-gray-700">05.03.2021</p>
            </div>
          </div>
        </section>

        <section className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-800">
            Опис послуг з цінами
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Основна послуга:</h3>
            <p className="text-gray-700 leading-relaxed">
              Надання доступу до інтелектуального сервісу для створення простих
              та зрозумілих пояснень слів і понять для дітей за допомогою
              штучного інтелекту. Сервіс включає генерацію пояснень, віршів,
              ігор, цікавих фактів та зображень.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Безкоштовний план</h4>
              <p className="text-3xl font-bold text-green-600 mb-3">0 грн</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ 3 пояснення на день</li>
                <li>✓ Базові пояснення слів</li>
                <li>✓ Приклади використання слова</li>
                <li>✓ Ігрові ідеї</li>
                <li>✓ Підтримка української та англійської мов</li>
              </ul>
            </div>

            <div className="border-2 border-blue-400 p-4 rounded-lg bg-blue-50">
              <h4 className="font-semibold text-lg mb-2">Місячна підписка</h4>
              <p className="text-3xl font-bold text-blue-600 mb-3">
                125 грн/місяць
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Всі переваги безкоштовного плану</li>
                <li>✓ Необмежені пояснення</li>
                <li>✓ Цікаві факти</li>
                <li>✓ Генерація зображень</li>
                <li>✓ Пріоритетна підтримка</li>
              </ul>
            </div>

            <div className="border-2 border-purple-400 p-4 rounded-lg bg-purple-50">
              <h4 className="font-semibold text-lg mb-2">Річна підписка</h4>
              <p className="text-3xl font-bold text-purple-600 mb-1">
                1250 грн/рік
              </p>
              <p className="text-green-600 text-sm font-semibold mb-3">
                Економія 250 грн!
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Всі переваги місячної підписки</li>
                <li>✓ Економія 2 місяці</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-800">
            Умови надання та доставки послуг
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Спосіб надання послуг:
              </h3>
              <p className="text-gray-700">
                Послуги надаються виключно в електронному вигляді через веб-сайт
                kid-wise.app .
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Термін надання:
              </h3>
              <p className="text-gray-700">
                Доступ до послуг надається миттєво після успішної оплати та
                активації облікового запису. Підписка активується автоматично.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Режим роботи сервісу:
              </h3>
              <p className="text-gray-700">
                Цілодобово, 7 днів на тиждень. Технічні перерви для
                обслуговування проводяться з попереднім повідомленням
                користувачів на сайті та email.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Технічна підтримка:
              </h3>
              <p className="text-gray-700">
                Робочі дні: 9:00-18:00 (Київський час). Відповідь на запити
                протягом 24 годин.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-red-800">
            Умови повернення коштів
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Термін повернення:
              </h3>
              <p className="text-gray-700">
                Згідно з Законом України &ldquo;Про захист прав
                споживачів&rdquo;,
              </p>
              <p className="text-gray-700">
                користувач має право повернути кошти протягом 14 календарних
                днів з моменту оплати.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Як оформити повернення:
              </h3>
              <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                <li>
                  Надіслати письмову заяву на{' '}
                  <strong>v.step2327@gmail.com</strong>
                </li>
                <li>Вказати ПІБ, контактні дані та номер транзакції</li>
                <li>Зазначити причину повернення коштів</li>
                <li>Надати реквізити для повернення коштів</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Терміни повернення:
              </h3>
              <p className="text-gray-700">
                Кошти повертаються протягом 14 робочих днів на той же платіжний
                засіб, з якого була здійснена оплата.
              </p>
            </div>
            <div className="bg-yellow-100 p-4 rounded border-l-4 border-yellow-500">
              <p className="text-gray-700">
                <strong>Важливо:</strong> Послуги, які вже були використані в
                повному обсязі, поверненню не підлягають, крім випадків,
                передбачених чинним законодавством України.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Способи оплати
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded border text-center">
              <div className="font-semibold text-blue-600">LiqPay</div>
              <div className="text-sm text-gray-600 mt-1">
                Visa, Mastercard, Privat24
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Всі платежі проходять через захищені платіжні системи. Ваші дані
              повністю захищені за стандартами PCI DSS.
            </p>
          </div>
        </section>

        <section className="bg-indigo-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
            Детальна інформація про підприємство
          </h2>
          <div className="bg-white p-4 rounded border">
            <p className="text-lg font-semibold mb-2">
              ФОП Степаненко Всеволод Віталійович
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 mb-1">
                  <strong>Код ЄДРПОУ:</strong> 3609003655
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Адреса реєстрації:</strong> Україна, 37200, Полтавська
                  область, м. Лохвиця, вул. Лугова, 1
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Телефон:</strong> +380-664-484-251
                </p>
              </div>
              <div>
                <p className="text-gray-700 mb-1">
                  <strong>Електронна пошта:</strong> v.step2327@gmail.com
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Офіційний сайт:</strong>
                  <a
                    href="https://kid-wise.app"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    kid-wise.app
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Режим роботи:</strong> Пн-Пт 9:00-18:00 (Київський
                  час)
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8 pt-6 border-t">
        <p>
          Дата останнього оновлення: {new Date().toLocaleDateString('uk-UA')}
        </p>
        <p className="mt-2">
          Вся інформація є актуальною та відповідає вимогам чинного
          законодавства України
        </p>
        <p className="mt-1">
          Для питань та скарг звертайтеся за вказаними контактами
        </p>
      </div>
    </main>
  );
}
