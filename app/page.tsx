"use client"
import Image from "next/image";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  // const user = useAuthContext();
  // console.log(user?.user)

  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-[#111827] text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-5 max-w-[1200px] w-full mx-auto">
        <div className="flex items-center gap-3">
          {/* <Image src={'/logo.svg'} alt="logo" width={56} height={56} /> */}
          <span className="font-extrabold text-2xl tracking-tight text-white">Anime API Platform</span>
                </div>
        <div>
          {!user ? (
            <SignInButton mode='modal' signUpForceRedirectUrl={'/dashboard'}>
              <button className="bg-[#FF640A] text-white px-5 py-2 rounded font-bold shadow hover:bg-orange-500 transition">Iniciar sesión</button>
              </SignInButton>
          ) : (
                <UserButton />
          )}
          </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-[1200px] w-full mx-auto px-8 pt-8 gap-10">
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            <span className="text-[#FF640A]">La API de Anime</span> para creadores, bots y apps modernas
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
            Accede a <span className="text-[#FF640A] font-bold">más de 38,000 animes</span>, películas y OVAs con datos actualizados, imágenes y metadatos.<br />
            <span className="text-white font-semibold">Potencia tu proyecto con la API más fácil y potente del mundo otaku.</span>
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-[#FF640A] text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Consigue tu API Key Gratis
          </a>
          <div className="mt-4 text-gray-400 text-sm">Sin tarjeta de crédito. Empieza en segundos.</div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-md mb-4">
            <video src="/naruto-1.mp4" autoPlay loop muted playsInline className="w-full h-[260px] object-cover" poster="/streamingbanner-2.webp" />
          </div>
        </div>
      </section>

      {/* Logos de confianza */}
      <section className="max-w-[1200px] w-full mx-auto flex flex-wrap justify-center items-center gap-16 py-10">
        <Image src="/Amazon.svg" alt="Amazon" width={90} height={40} className="object-contain" />
        <Image src="/Netflix.svg" alt="Netflix" width={90} height={40} className="object-contain" />
        <Image src="/Spotify.svg" alt="Spotify" width={90} height={40} className="object-contain" />
        <Image src="/Uber.svg" alt="Uber" width={90} height={40} className="object-contain" />
      </section>

      {/* Beneficios para desarrolladores */}
      <section className="max-w-[1200px] w-full mx-auto mt-20 flex flex-col md:flex-row items-center gap-16 px-8">
        <div className="flex-1 flex justify-center">
          <Image src="/anime-platform.webp" alt="Beneficios para desarrolladores" width={420} height={260} className="rounded-lg shadow-2xl w-full object-cover" />
          </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#FF640A]">Pensada para desarrolladores</h2>
          <ul className="text-gray-200 text-lg space-y-3 mb-4 list-disc list-inside">
            <li><b>+38,000 animes</b> con endpoints rápidos y flexibles</li>
            <li>Documentación clara y ejemplos listos para usar</li>
            <li>Autenticación sencilla con API Key</li>
            <li>Filtros avanzados por tipo, estado, tags y más</li>
            <li>Perfecta para bots, apps móviles, dashboards y proyectos comerciales</li>
          </ul>
          <div className="text-gray-400 text-base">Únete a cientos de devs que ya integran Anime API Platform en sus proyectos.</div>
          </div>
      </section>

      {/* Plataformas compatibles y ejemplo de integración */}
      <section className="max-w-[1200px] w-full mx-auto mt-20 mb-20 px-8 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 order-2 md:order-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#FF640A]">Úsala en cualquier plataforma</h2>
          <ul className="text-gray-200 text-lg space-y-3 mb-4 list-disc list-inside">
            <li>Web, móvil, bots de Discord, Telegram, apps de escritorio y más</li>
            <li>Fácil integración con cualquier lenguaje o framework</li>
            <li>Respuestas en JSON listas para consumir</li>
          </ul>
          <div className="bg-[#181F2A] rounded-lg p-4 text-sm font-mono text-[#FF640A] border border-[#232B3A] mb-2">
            {`GET https://animeapi.dev/api/v1/anime?title=naruto`}
            <br />
            {`{
  "title": "Naruto",
  "episodes": 220,
  "type": "TV",
  "status": "Finished",
  ...
}`}
          </div>
          <div className="text-gray-400 text-base">Crea tu propia plataforma de anime en minutos.</div>
        </div>
        <div className="flex-1 flex justify-center order-1 md:order-2">
          <Image src="/streamingbanner-2.webp" alt="Plataformas compatibles" width={600} height={260} className="rounded-lg shadow-2xl w-full object-cover" />
      </div>
      </section>

      {/* Beneficios */}
      <section className="max-w-[1200px] w-full mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 px-8">
        <div className="bg-[#181F2A] rounded-xl shadow p-7 flex flex-col items-center border border-[#232B3A]">
          <span className="text-4xl mb-3">⚡</span>
          <h3 className="font-bold mb-2 text-lg text-[#FF640A]">Ultra rápida y estable</h3>
          <p className="text-gray-300 text-base text-center">Infraestructura cloud, baja latencia y alta disponibilidad para tus proyectos.</p>
            </div>
        <div className="bg-[#181F2A] rounded-xl shadow p-7 flex flex-col items-center border border-[#232B3A]">
          <span className="text-4xl mb-3">🔄</span>
          <h3 className="font-bold mb-2 text-lg text-[#FF640A]">Datos siempre actualizados</h3>
          <p className="text-gray-300 text-base text-center">Información de anime, imágenes y metadatos sincronizados a diario.</p>
            </div>
        <div className="bg-[#181F2A] rounded-xl shadow p-7 flex flex-col items-center border border-[#232B3A]">
          <span className="text-4xl mb-3">🛠️</span>
          <h3 className="font-bold mb-2 text-lg text-[#FF640A]">Integración instantánea</h3>
          <p className="text-gray-300 text-base text-center">Documentación clara y ejemplos para cualquier lenguaje y plataforma.</p>
            </div>
      </section>

      {/* Sección PRO */}
      <section className="max-w-[900px] w-full mx-auto mt-20 mb-16 px-8">
        <div className="bg-gradient-to-tr from-[#181F2A] to-[#232B3A] rounded-2xl shadow-xl p-10 text-center border border-[#232B3A]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FF640A] mb-4">¿Por qué hacerse PRO?</h2>
          <div className="text-gray-300 text-base mb-4">Accede a miles de datos por lo que cuesta un café</div>
          <ul className="text-gray-200 text-left max-w-md mx-auto mb-6 list-disc list-inside space-y-2">
            <li>🔓 <b>Más peticiones por minuto</b> y límites ampliados</li>
            <li>📈 <b>Acceso prioritario</b> a nuevas features y endpoints</li>
            <li>💬 <b>Soporte premium</b> y canal privado de Discord</li>
            <li>🚀 <b>Ideal para bots, apps y proyectos comerciales</b></li>
          </ul>
          <a
            href="/dashboard"
            className="inline-block mt-2 bg-[#FF640A] text-white px-8 py-3 rounded font-semibold shadow hover:bg-orange-500 transition"
          >
            Hazte PRO y lleva tu proyecto al siguiente nivel
          </a>
            </div>
      </section>

      {/* Showcase de dispositivos */}
      <section className="max-w-[1200px] w-full mx-auto mb-20 px-8 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-[#FF640A] mb-6">Compatible con cualquier plataforma</h3>
        <Image src="/anime-box-smart-tv.png" alt="Anime en todos tus dispositivos" width={900} height={300} className="rounded-xl shadow-2xl w-full object-contain" />
      </section>

      {/* FAQ */}
      <section className="max-w-[900px] w-full mx-auto mb-12 px-8">
        <h3 className="text-xl font-bold text-[#FF640A] mb-4 text-center">Preguntas frecuentes</h3>
        <div className="space-y-4">
          <details className="bg-[#181F2A] rounded shadow p-5 border border-[#232B3A]">
            <summary className="font-semibold cursor-pointer text-white">¿Cómo obtengo mi API key?</summary>
            <div className="mt-2 text-gray-300">Regístrate o inicia sesión, accede al dashboard y genera tu API key gratis en segundos.</div>
          </details>
          <details className="bg-[#181F2A] rounded shadow p-5 border border-[#232B3A]">
            <summary className="font-semibold cursor-pointer text-white">¿Puedo usar la API gratis?</summary>
            <div className="mt-2 text-gray-300">Sí, puedes empezar gratis. Si necesitas más límites o funciones avanzadas, puedes hacerte PRO.</div>
          </details>
          <details className="bg-[#181F2A] rounded shadow p-5 border border-[#232B3A]">
            <summary className="font-semibold cursor-pointer text-white">¿Qué datos ofrece la API?</summary>
            <div className="mt-2 text-gray-300">Títulos, imágenes, sinopsis, temporadas, episodios, tipo, estado, tags y más de miles de animes.</div>
          </details>
          <details className="bg-[#181F2A] rounded shadow p-5 border border-[#232B3A]">
            <summary className="font-semibold cursor-pointer text-white">¿Cómo integro la API en mi app?</summary>
            <div className="mt-2 text-gray-300">Consulta la documentación y ejemplos en el dashboard. Es fácil de usar desde cualquier lenguaje.</div>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#181F2A] py-8 text-center text-gray-400 text-sm border-t border-[#232B3A] mt-auto">
        <div>© {new Date().getFullYear()} Anime API Platform. Hecho con <span className="text-[#FF640A]">❤️</span> para la comunidad otaku.</div>
      </footer>
    </div>
  );
}
