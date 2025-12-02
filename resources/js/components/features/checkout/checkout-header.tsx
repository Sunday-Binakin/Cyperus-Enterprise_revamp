interface CheckoutHeaderProps {
  step?: 'cart' | 'checkout' | 'payment';
}

export function CheckoutHeader({ step = 'checkout' }: CheckoutHeaderProps) {
  const steps = [
    { id: 'cart', label: 'Cart', active: step === 'cart' },
    { id: 'checkout', label: 'Checkout', active: step === 'checkout' },
    { id: 'payment', label: 'Payment', active: step === 'payment' }
  ];

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2">Checkout</h1>
      <div className="flex items-center gap-2 text-gray-400">
        {steps.map((s, index) => (
          <div key={s.id} className="flex items-center gap-2">
            <span className={s.active ? 'text-[#EFE554]' : ''}>{s.label}</span>
            {index < steps.length - 1 && <span>→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

