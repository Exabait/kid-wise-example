export default function CompanyInfoPageEn() {
  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Kid-Wise - Contact Information & Company Details
      </h1>

      {/* Quick Contact Section - Prominently displayed */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold mb-2">📧 Email</h3>
            <a
              href="mailto:v.step2327@gmail.com"
              className="text-blue-100 hover:text-white underline text-lg"
            >
              v.step2327@gmail.com
            </a>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📞 Phone</h3>
            <a
              href="tel:+380664484251"
              className="text-blue-100 hover:text-white underline text-lg"
            >
              +380-664-484-251
            </a>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🌐 Website</h3>
            <a
              href="https://kid-wise.app"
              className="text-blue-100 hover:text-white underline text-lg"
            >
              kid-wise.app
            </a>
          </div>
        </div>
      </section>

      <div className="space-y-8">
        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            Official Company Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Organization Name:
              </h3>
              <p className="text-gray-700">
                Individual Entrepreneur Stepanenko Vsevolod Vitaliyovych
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tax ID:</h3>
              <p className="text-gray-700">3609003655</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Legal Address:
              </h3>
              <p className="text-gray-700">
                Ukraine, 37200, Poltava region, Lohvitsa, Lugova str., 1
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Registration Date:
              </h3>
              <p className="text-gray-700">2024</p>
            </div>
          </div>
        </section>

        <section className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-800">
            Services Description and Pricing
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Main Service:</h3>
            <p className="text-gray-700 leading-relaxed">
              Providing access to an intelligent service for creating simple and
              understandable explanations of words and concepts for children
              using artificial intelligence. The service includes generation of
              explanations, poems, games, interesting facts and images.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Free Plan</h4>
              <p className="text-3xl font-bold text-green-600 mb-3">Free</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ 3 explanations per day</li>
                <li>✓ Basic word explanations</li>
                <li>✓ Ukrainian and English language support</li>
                <li>✓ Web version and mobile apps</li>
              </ul>
            </div>

            <div className="border-2 border-blue-400 p-4 rounded-lg bg-blue-50">
              <h4 className="font-semibold text-lg mb-2">
                Monthly Subscription
              </h4>
              <p className="text-3xl font-bold text-blue-600 mb-3">$5/month</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Unlimited explanations</li>
                <li>✓ Poems for each word</li>
                <li>✓ Game ideas</li>
                <li>✓ Interesting facts</li>
                <li>✓ Image generation</li>
                <li>✓ Priority support</li>
              </ul>
            </div>

            <div className="border-2 border-purple-400 p-4 rounded-lg bg-purple-50">
              <h4 className="font-semibold text-lg mb-2">
                Annual Subscription
              </h4>
              <p className="text-3xl font-bold text-purple-600 mb-1">
                $50/year
              </p>
              <p className="text-green-600 text-sm font-semibold mb-3">
                Save $10!
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ All monthly subscription benefits</li>
                <li>✓ Save 2 months</li>
                <li>✓ Exclusive features</li>
                <li>✓ VIP support</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-800">
            Service Delivery Terms
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Service Delivery Method:
              </h3>
              <p className="text-gray-700">
                Services are provided exclusively electronically through the
                kid-wise.app website and mobile applications for iOS and
                Android.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Delivery Time:
              </h3>
              <p className="text-gray-700">
                Access to services is provided instantly after successful
                payment and account activation. Subscriptions are activated
                automatically.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Service Operating Hours:
              </h3>
              <p className="text-gray-700">
                24/7, 7 days a week. Technical breaks for maintenance are
                conducted with prior notification to users via website and
                email.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Technical Support:
              </h3>
              <p className="text-gray-700">
                Business days: 9:00-18:00 (Kyiv time). Response to inquiries
                within 24 hours.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-red-800">
            Refund Policy
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Refund Period:
              </h3>
              <p className="text-gray-700">
                According to the Law of Ukraine &ldquo;On Consumer Rights
                Protection&rdquo;, users have the right to get a refund within
                14 calendar days from the moment of payment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How to Request a Refund:
              </h3>
              <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                <li>
                  Send a written request to{' '}
                  <strong>v.step2327@gmail.com</strong>
                </li>
                <li>
                  Provide full name, contact details and transaction number
                </li>
                <li>Specify the reason for the refund</li>
                <li>Provide details for the refund</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Refund Timeframe:
              </h3>
              <p className="text-gray-700">
                Funds are returned within 14 working days to the same payment
                method from which the payment was made.
              </p>
            </div>
            <div className="bg-yellow-100 p-4 rounded border-l-4 border-yellow-500">
              <p className="text-gray-700">
                <strong>Important:</strong> Services that have already been used
                in full are not refundable, except in cases provided by current
                legislation of Ukraine.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Payment Methods
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded border text-center">
              <div className="font-semibold text-blue-600">LiqPay</div>
              <div className="text-sm text-gray-600 mt-1">
                Visa, Mastercard, Privat24
              </div>
            </div>
            <div className="bg-white p-4 rounded border text-center">
              <div className="font-semibold text-purple-600">Stripe</div>
              <div className="text-sm text-gray-600 mt-1">
                International cards
              </div>
            </div>
            <div className="bg-white p-4 rounded border text-center">
              <div className="font-semibold text-gray-800">Apple Pay</div>
              <div className="text-sm text-gray-600 mt-1">For iOS devices</div>
            </div>
            <div className="bg-white p-4 rounded border text-center">
              <div className="font-semibold text-green-600">Google Pay</div>
              <div className="text-sm text-gray-600 mt-1">
                For Android devices
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              All payments are processed through secure payment systems. Your
              data is fully protected according to PCI DSS standards.
            </p>
          </div>
        </section>

        <section className="bg-indigo-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
            Detailed Business Information
          </h2>
          <div className="bg-white p-4 rounded border">
            <p className="text-lg font-semibold mb-2">
              Individual Entrepreneur Stepanenko Vsevolod Vitaliyovych
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 mb-1">
                  <strong>Tax ID:</strong> 3609003655
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Registration Address:</strong> Ukraine, 37200, Poltava
                  region, Lohvitsa, Lugova str., 1
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Phone:</strong> +380-664-484-251
                </p>
              </div>
              <div>
                <p className="text-gray-700 mb-1">
                  <strong>Email:</strong> v.step2327@gmail.com
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Official Website:</strong>
                  <a
                    href="https://kid-wise.app"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    kid-wise.app
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Business Hours:</strong> Mon-Fri 9:00-18:00 (Kyiv
                  time)
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8 pt-6 border-t">
        <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
        <p className="mt-2">
          All information is current and complies with the requirements of
          current legislation of Ukraine
        </p>
        <p className="mt-1">
          For questions and complaints, please contact us using the provided
          contact information
        </p>
      </div>
    </main>
  );
}
