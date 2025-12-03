import { Head } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function PaymentTest() {
  const testCards = [
    {
      name: 'Successful Card Payment',
      number: '4084 0840 8408 4081',
      expiry: 'Any future date',
      cvv: 'Any 3 digits',
      pin: '0000',
      description: 'Use this for successful test payments'
    },
    {
      name: 'Insufficient Funds',
      number: '4068 0000 0000 0021',
      expiry: 'Any future date', 
      cvv: 'Any 3 digits',
      pin: '0000',
      description: 'Use this to test failed payments'
    }
  ];

  const mobileMoneyTest = [
    {
      name: 'MTN Mobile Money',
      provider: 'MTN',
      number: '054XXXXXXX',
      pin: 'Any 4 digits',
      description: 'Test MTN Mobile Money payments'
    },
    {
      name: 'Vodafone Cash',
      provider: 'Vodafone',
      number: '020XXXXXXX', 
      pin: 'Any 4 digits',
      description: 'Test Vodafone Cash payments'
    },
    {
      name: 'AirtelTigo Money',
      provider: 'AirtelTigo',
      number: '027XXXXXXX',
      pin: 'Any 4 digits',
      description: 'Test AirtelTigo Money payments'
    }
  ];

  return (
    <>
      <Head title="Payment Test - Cyperus Enterprise" />
      <Header />
      
      <main className="min-h-screen bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Payment Testing</h1>
            
            <div className="bg-gray-900 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-[#EFE554]">Paystack Test Cards</h2>
              <p className="text-gray-300 mb-6">
                Use these test cards to simulate different payment scenarios:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testCards.map((card, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#4A651F] mb-3">{card.name}</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Card Number:</span> <span className="font-mono text-white">{card.number}</span></p>
                      <p><span className="text-gray-400">Expiry:</span> <span className="text-white">{card.expiry}</span></p>
                      <p><span className="text-gray-400">CVV:</span> <span className="text-white">{card.cvv}</span></p>
                      <p><span className="text-gray-400">PIN:</span> <span className="text-white">{card.pin}</span></p>
                    </div>
                    <p className="text-gray-300 text-xs mt-3">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-[#EFE554]">Mobile Money Test</h2>
              <p className="text-gray-300 mb-6">
                Test mobile money payments with these providers:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mobileMoneyTest.map((provider, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#4A651F] mb-3">{provider.name}</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Provider:</span> <span className="text-white">{provider.provider}</span></p>
                      <p><span className="text-gray-400">Number:</span> <span className="font-mono text-white">{provider.number}</span></p>
                      <p><span className="text-gray-400">PIN:</span> <span className="text-white">{provider.pin}</span></p>
                    </div>
                    <p className="text-gray-300 text-xs mt-3">{provider.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#EFE554]">How to Test</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li>Go to the <a href="/products" className="text-[#4A651F] hover:underline">products page</a> and add items to cart</li>
                <li>Proceed to <a href="/checkout" className="text-[#4A651F] hover:underline">checkout</a></li>
                <li>Fill out your details and click "Pay Now"</li>
                <li><strong>NEW:</strong> A Paystack popup window will appear with payment options</li>
                <li>Choose your preferred payment method (Card, Mobile Money, Bank, USSD)</li>
                <li>Complete the payment using test details above</li>
                <li>You'll be automatically redirected back with the result</li>
              </ol>

              <div className="mt-8 p-4 bg-amber-900/20 border border-amber-700 rounded-lg">
                <h3 className="text-amber-500 font-semibold mb-2">Payment Options Available:</h3>
                <ul className="list-disc list-inside space-y-1 text-amber-200 text-sm">
                  <li>✅ Card Payments (Visa, Mastercard, Verve)</li>
                  <li>✅ Mobile Money (MTN, Vodafone, AirtelTigo)</li>
                  <li>✅ Bank Transfer</li>
                  <li>✅ USSD Payments</li>
                  <li>✅ QR Code Payments</li>
                  <li>💡 Choose your preferred method on the Paystack page</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
                <h3 className="text-blue-500 font-semibold mb-2">🆕 Updated Payment Flow:</h3>
                <ul className="list-disc list-inside space-y-1 text-blue-200 text-sm">
                  <li><strong>Popup Payment Window:</strong> No more redirects - payment opens in a popup</li>
                  <li><strong>All Payment Options Visible:</strong> Cards, Mobile Money, Banks all in one place</li>
                  <li><strong>Mobile Money Options:</strong> MTN, Vodafone, AirtelTigo will show PIN prompts</li>
                  <li><strong>Bank Transfer:</strong> Direct bank selection and transfer instructions</li>
                  <li><strong>USSD Codes:</strong> Dial codes for different banks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}