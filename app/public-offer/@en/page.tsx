export default async function PublicOfferPageEn() {
  const exchangeRateResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/money/exchange?currency=USD`
  );
  const exchangeRate = await exchangeRateResponse.json();
  const now = new Date();
  const today = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`;

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        PUBLIC CONTRACT (OFFER)
      </h1>
      <p className="text-center text-lg font-semibold mb-8">
        for services using the Kid-Wise service
      </p>

      <div className="text-gray-700 text-base space-y-6 leading-relaxed">
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm">
            This contract is an offer to conclude a contract for the provision
            of services for using the Kid-Wise service, posted on the website{' '}
            <strong>kidwise.com.ua</strong>. The contract is considered
            concluded from the moment of account creation or payment for
            services.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            1. GENERAL PROVISIONS
          </h2>
          <div className="space-y-3">
            <p>
              <strong>1.1.</strong> This contract (hereinafter -
              &quot;Contract&quot;) is a public offer in accordance with Article
              633 of the Civil Code of Ukraine, addressed to individuals who
              have reached the age of majority (hereinafter - &quot;User&quot;).
            </p>
            <p>
              <strong>1.2.</strong> Subject of the contract - providing access
              to the Kid-Wise service for creating explanations of words and
              concepts for children using artificial intelligence.
            </p>
            <p>
              <strong>1.3.</strong> Internet service - website at kidwise.com.ua
              and mobile applications designed to provide services for
              explaining words and concepts to children.
            </p>
            <p>
              <strong>1.4.</strong> User - an individual who has reached 18
              years of age, has full civil capacity, registered on the site and
              uses Kid-Wise services.
            </p>
            <p>
              <strong>1.5.</strong> Provider - Individual Entrepreneur
              Stepanenko Vsevolod Vitaliyovych, registered at: Ukraine, Poltava
              region, Lohvitsa, Lugova str., 1, tel. +380-664-484-251, email:
              v.step2327@gmail.com
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. SUBJECT OF CONTRACT
          </h2>
          <div className="space-y-3">
            <p>
              <strong>2.1.</strong> The Provider undertakes to provide the User
              with access to the Kid-Wise service, and the User undertakes to
              pay for the services provided according to tariff plans.
            </p>
            <p>
              <strong>2.2.</strong> The list of Internet service services
              includes:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>
                Free explanation of words and concepts (limited quantity per
                day)
              </li>
              <li>Premium subscription with unlimited explanations</li>
              <li>Additional materials: poems, games, interesting facts</li>
              <li>Image generation for concept visualization</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            3. ORDER PROCEDURE
          </h2>
          <div className="space-y-3">
            <p>
              <strong>3.1.</strong> The User places an order on the Internet
              service by registering an account and choosing a tariff plan.
            </p>
            <p>
              <strong>3.2.</strong> To order services, the User must provide the
              following mandatory information:
            </p>
            <ul className="list-disc pl-8 space-y-1">
              <li>Email address</li>
              <li>Password for account access</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            4. PRICES AND PAYMENT
          </h2>
          <div className="space-y-3">
            <p>
              <strong>4.1.</strong> Service costs are indicated on the website
              in hryvnias and US dollars. Prices may be changed by the Provider
              unilaterally.
            </p>
            <p>
              <strong>4.2.</strong> Current tariffs:
            </p>
            <ul className="list-disc pl-8 space-y-1">
              <li>Free plan: 3 explanations per day</li>
              <li>
                Monthly subscription: $5 USD/month. Based on the NBU exchange
                rate on the day of payment. As of {today}:{' '}
                {(exchangeRate.rate * 5).toFixed(2)} UAH/month.
              </li>
              <li>
                Annual subscription: $50 USD/year. Based on the NBU exchange
                rate on the day of payment. As of {today}:{' '}
                {(exchangeRate.rate * 50).toFixed(2)} UAH/year.
              </li>
            </ul>
            <p>
              <strong>4.3.</strong> Payment is made through LiqPay.
            </p>
            <p>
              <strong>4.4.</strong> Subscription renews automatically. To cancel
              contact customer support.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            5. SERVICE PROVISION
          </h2>
          <div className="space-y-3">
            <p>
              <strong>5.1.</strong> Services are provided 24/7 through the
              Internet service with technical breaks for maintenance.
            </p>
            <p>
              <strong>5.2.</strong> The Provider has the right to temporarily
              suspend the provision of services for technical work with prior
              notification to Users.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">6. REFUNDS</h2>
          <div className="space-y-3">
            <p>
              <strong>6.1.</strong> The User may refuse services within 14
              calendar days from the moment of payment in accordance with the
              Law of Ukraine &quot;On Consumer Rights Protection&quot;.
            </p>
            <p>
              <strong>6.2.</strong> To get a refund, the User must send a
              written request to v.step2327@gmail.com indicating:
            </p>
            <ul className="list-disc pl-8 space-y-1">
              <li>Full name and contact details</li>
              <li>Transaction number</li>
              <li>Reason for return</li>
              <li>Refund details</li>
            </ul>
            <p>
              <strong>6.3.</strong> Refunds are made within 14 working days to
              the same payment method from which the payment was made.
            </p>
            <p>
              <strong>6.4.</strong> Services that have already been used are not
              refundable, except in cases provided by current legislation of
              Ukraine.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">7. RESPONSIBILITY</h2>
          <div className="space-y-3">
            <p>
              <strong>7.1.</strong> The Provider is not responsible for damages
              caused by improper use of the service or technical failures in the
              Internet.
            </p>
            <p>
              <strong>7.2.</strong> The User bears full responsibility for the
              accuracy of the information provided and the lawfulness of using
              the service.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            8. DISPUTE RESOLUTION
          </h2>
          <div className="space-y-3">
            <p>
              <strong>8.1.</strong> All disputes are resolved through
              negotiations. In case of failure to reach agreement, disputes are
              subject to consideration in the courts of Ukraine in accordance
              with current legislation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">9. OTHER TERMS</h2>
          <div className="space-y-3">
            <p>
              <strong>9.1.</strong> This contract is valid until the parties
              fulfill their obligations.
            </p>
            <p>
              <strong>9.2.</strong> The Provider has the right to make changes
              to the contract with prior notification to Users on the website.
            </p>
          </div>
        </section>

        <section className="mt-12 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">PROVIDER DETAILS:</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>
              <strong>
                Individual Entrepreneur Stepanenko Vsevolod Vitaliyovych
              </strong>
            </p>
            <p>Tax ID: 3609003655</p>
            <p>
              Address: Ukraine, 37200, Poltava region, Lohvitsa, Lugova str., 1
            </p>
            <p>Phone: +380-664-484-251</p>
            <p>Email: v.step2327@gmail.com</p>
            <p>Website: kid-wise.app</p>
          </div>
        </section>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            The contract takes effect from the moment the User accepts the offer
          </p>
          <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
        </div>
      </div>
    </main>
  );
}
