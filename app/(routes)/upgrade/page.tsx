"use client"
import React, { useRef } from 'react';
import Link from 'next/link';

export default function UpgradePage() {
  // const confettiRef = useRef<HTMLDivElement>(null);

  // const handleProClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (confettiRef.current) {
  //     confettiRef.current.classList.remove('hidden');
  //     confettiRef.current.classList.add('block');
  //   }
  //   setTimeout(() => {
  //     window.location.href = '/api/stripe/checkout';
  //   }, 1500);
  // };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white p-4 py-8">
      {/* Confetti animation */}
      {/* <div ref={confettiRef} className="hidden fixed inset-0 z-50 pointer-events-none">
        <ConfettiAnimation />
      </div> */}
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 text-center">Mejora tu experiencia</h1>
        <p className="mb-8 text-gray-500 text-center max-w-xl text-lg font-medium">
          Consigue <span className="text-violet-600 font-bold">más peticiones</span>, <span className="text-violet-600 font-bold">soporte prioritario</span> y accede a todo el potencial de la API con el plan <span className="text-violet-600 font-bold">Pro</span>.<br />¡Haz crecer tu proyecto sin límites!
        </p>
        <div className="flex flex-col sm:flex-row gap-8 w-full max-w-3xl justify-center items-center">
          {/* Plan Free */}
          <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center border border-gray-100 max-w-xs w-full">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Free</h2>
            <div className="text-3xl font-bold text-gray-400 mb-2">0€</div>
            <div className="text-gray-500 mb-4">10 peticiones/mes</div>
            <ul className="text-sm text-gray-500 mb-6 list-disc list-inside">
              <li>Acceso a la API</li>
              <li>Hasta 10 peticiones al mes</li>
              <li>Sin soporte prioritario</li>
            </ul>
            <button className="bg-gray-200 text-gray-500 font-semibold px-6 py-2 rounded-full cursor-not-allowed" disabled>Plan actual</button>
          </div>
          {/* Plan Pro */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-2 border-violet-500 relative max-w-xs w-full">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow">Más popular</span>
            <h2 className="text-xl font-semibold mb-2 text-violet-700">Pro</h2>
            <div className="text-3xl font-bold text-violet-600 mb-2">2€<span className="text-base font-normal text-gray-500">/mes</span></div>
            <div className="text-gray-500 mb-4">150 peticiones/mes</div>
            <ul className="text-sm text-gray-600 mb-6 list-disc list-inside">
              <li>Acceso completo a la API</li>
              <li>Hasta 150 peticiones al mes</li>
              <li>Soporte prioritario</li>
            </ul>
            <button
              onClick={async () => {
                try {
                  const response = await fetch('/api/stripe/checkout', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  const data = await response.json();
                  if (response.ok && data.url) {
                    window.location.href = data.url; // Redirige directamente sin animación
                  } else {
                    let errorMessage = 'Error desconocido al iniciar el checkout de Stripe.';
                    try {
                      const errorData = await response.json();
                      errorMessage = errorData.error || errorMessage;
                    } catch {
                      errorMessage = await response.text();
                    }
                    alert(`Error al iniciar el checkout de Stripe: ${errorMessage}`);
                  }
                } catch (error: any) {
                  console.error('Error en la petición a Stripe:', error);
                  alert(`Error de conexión. Inténtalo de nuevo más tarde. Detalles: ${error.message || error}`);
                }
              }}
              className="bg-gradient-to-r from-violet-600 to-blue-500 text-white font-bold px-10 py-3 rounded-full shadow-lg hover:from-violet-700 hover:to-blue-600 transition text-lg mt-2"
            >
              ¡Quiero ser Pro!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente simple de confeti SVG animado (comentado)
// function ConfettiAnimation() {
//   return (
//     <svg className="w-full h-full" viewBox="0 0 800 600">
//       <g>
//         {/* Puedes mejorar este SVG o usar una librería real de confeti si lo deseas */}
//         <circle cx="100" cy="100" r="8" fill="#a78bfa">
//           <animate attributeName="cy" from="100" to="600" dur="1.2s" repeatCount="1" />
//         </circle>
//         <circle cx="200" cy="120" r="6" fill="#6366f1">
//           <animate attributeName="cy" from="120" to="600" dur="1.1s" repeatCount="1" />
//         </circle>
//         <circle cx="300" cy="80" r="7" fill="#818cf8">
//           <animate attributeName="cy" from="80" to="600" dur="1.3s" repeatCount="1" />
//         </circle>
//         <circle cx="400" cy="110" r="8" fill="#f472b6">
//           <animate attributeName="cy" from="110" to="600" dur="1.2s" repeatCount="1" />
//         </circle>
//         <circle cx="500" cy="90" r="6" fill="#facc15">
//           <animate attributeName="cy" from="90" to="600" dur="1.1s" repeatCount="1" />
//         </circle>
//         <circle cx="600" cy="130" r="7" fill="#34d399">
//           <animate attributeName="cy" from="130" to="600" dur="1.3s" repeatCount="1" />
//         </circle>
//         <circle cx="700" cy="100" r="8" fill="#60a5fa">
//           <animate attributeName="cy" from="100" to="600" dur="1.2s" repeatCount="1" />
//         </circle>
//       </g>
//     </svg>
//   );
// } 