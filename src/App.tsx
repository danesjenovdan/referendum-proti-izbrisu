import { useState, useEffect } from 'react';
import { Printer, MapPin, AlertTriangle, ChevronRight, Clock } from 'lucide-react';

export default function App() {
  const targetDate = new Date('2026-06-22T23:59:59');

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft: Record<string, number> = {};

    if (difference > 0) {
      timeLeft = {
        DNI: Math.floor(difference / (1000 * 60 * 60 * 24)),
        UR: Math.floor((difference / (1000 * 60 * 60)) % 24),
        MIN: Math.floor((difference / 1000 / 60) % 60),
        SEK: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (timeLeft[interval] === undefined) return null;
    return (
      <div key={interval} className="flex flex-col items-center justify-center p-3 sm:p-6 bg-black text-[#A52BA7]">
        <span className="text-4xl sm:text-6xl md:text-8xl font-black">{timeLeft[interval]}</span>
        <span className="text-sm sm:text-lg font-bold tracking-widest text-white mt-1">{interval}</span>
      </div>
    );
  });

  const locationsData = [
    {
      city: "Ljubljana",
      spots: [
        {
          name: "Društvo Ljiljan",
          address: "Dunajska cesta 50, 1000 Ljubljana, Podhod Plava Laguna",
          query: "Društvo Ljiljan Dunajska cesta 50 Ljubljana",
          times: [
            "Sreda 17. 6. 2026. od 17.00 do 19.00",
            "Četrtek 18. 6. 2026. od 17.00 do 19.00",
            "Petek 19. 6. 2026. od 17.00 do 19.00",
            "Sobota 20. 6. 2026. od 17:00 do 23.00",
            "Nedelja 21. 6. 2026. od 13.00 do 18.00"
          ]
        },
        {
          name: "Pritličje",
          address: "Mestni trg 2, Ljubljana",
          query: "Pritličje Mestni trg 2 Ljubljana",
          times: [
            "Četrtek 18. 6. od 9.00 do 00.00",
            "Petek 19. 6. od 9.00 do 00.00",
            "Sobota 20. 6. od 9.00 do 00.00",
            "Nedelja 21. 6. od 9.00 do 00.00"
          ]
        },
        {
          name: "Slovenska filantropija",
          address: "Cesta Dolomitskega odreda 11, Ljubljana",
          query: "Slovenska filantropija Cesta Dolomitskega odreda 11 Ljubljana",
          times: [
            "Četrtek 18. 6. od 9.00 do 17.00",
            "Petek 19. 6. od 9.00 do 17.00"
          ]
        },
        {
          name: "Adamič-Lundrovo nabrežje (stojnica)",
          address: "",
          query: "Adamič-Lundrovo nabrežje Ljubljana",
          times: [
            "Petek 19. 6. od 8.00 do 20.00",
            "Sobota 20. 6. od 8.00 do 15.00"
          ]
        },
        {
          name: "Linhartova (stojnica pred upravno enoto)",
          address: "",
          query: "Upravna enota Ljubljana Linhartova",
          times: [
            "Petek 19. 6. od 8.00 do 13.00"
          ]
        },
        {
          name: "Tobačna (stojnica pred upravno enoto)",
          address: "",
          query: "Upravna enota Ljubljana Tobačna",
          times: [
            "Petek 19. 6. od 8.00 do 13.00"
          ]
        },
        {
          name: "Društvo Migjeni",
          address: "Celovška 177, Ljubljana",
          query: "Društvo Migjeni Celovška 177 Ljubljana",
          times: [
            "Sobota 20. 6. od 16.30 do 19.30"
          ]
        },
        {
          name: "Afriška vas, Šprica",
          address: "Grudnovo nabrežje, 1000 Ljubljana",
          query: "Grudnovo nabrežje Ljubljana",
          times: [
            "Četrtek 18. 6. od 14.00 do 20.00"
          ]
        }
      ]
    },
    {
      city: "Maribor",
      spots: [
        {
          name: "Pekarna Magdalenske mreže",
          address: "Ob železnici 16, 2000 Maribor",
          query: "Pekarna Magdalenske mreže Ob železnici 16 Maribor",
          times: [
            "Četrtek 18. 6. 2026. od 10.00 do 18.00",
            "Petek 19. 6. 2026. od 10.00 do 17.00",
            "Sobota 20. 6. 2026. od 9:00 do 14.00"
          ]
        }
      ]
    },
    {
      city: "Koper",
      spots: [
        {
          name: "KD Iliria",
          address: "Istrska cesta 41, 6000 Koper",
          query: "KD Iliria Istrska cesta 41 Koper",
          times: [
            "Četrtek 18. 6. 2026. od 9.00 do 18.00",
            "Petek 19. 6. 2026. od 9.00 do 18.00",
            "Sobota 20. 6. 2026. od 9:00 do 14.00"
          ]
        }
      ]
    },
    {
      city: "Velenje",
      spots: [
        {
          name: "Center Nova, KD Liria",
          address: "Šaleška cesta 21, 3320 Velenje",
          query: "Center Nova Šaleška cesta 21 Velenje",
          times: [
            "Petek 19. 6. 2026. od 12.00 do 17.00",
            "Sobota 20. 6. 2026. od 9:00 do 14.00"
          ]
        },
        {
          name: "Okrepčevalnica Mladost",
          address: "Prešernova cesta 10a, 3320 Velenje",
          query: "Okrepčevalnica Mladost Prešernova cesta 10a Velenje",
          times: [
            "Četrtek 18. 6. od 8.00 do 00.00",
            "Petek 19. 6. od 8.00 do 00.00",
            "Sobota 20. 6. od 8.00 do 00.00",
            "Nedelja 21. 6. od 8.00 do 00.00"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#CCCF5D] text-black font-sans selection:bg-[#A52BA7] selection:text-white px-4 py-8 md:px-8 md:py-16">
      
      {/* 1. TYPOGRAPHIC HERO SECTION */}
      <header className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="bg-black text-[#A52BA7] px-6 py-2 md:py-3 text-2xl md:text-4xl font-black tracking-widest uppercase mb-8 md:mb-12 shadow-[6px_6px_0px_#A52BA7]">
          PODPIŠI ZA REFERENDUM
        </div>
        
        <div className="w-full flex flex-col items-center text-[#A52BA7] font-black uppercase leading-[0.8] tracking-tighter mb-8 max-w-full overflow-hidden">
          <div className="text-[18vw] sm:text-[18vw] md:text-[180px] hover:scale-[1.02] transition-transform duration-300">PROTI</div>
          <div className="text-[18vw] sm:text-[18vw] md:text-[180px] hover:scale-[1.02] transition-transform duration-300">IZBRISU</div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 font-black uppercase text-white text-3xl sm:text-5xl md:text-7xl tracking-tighter mb-16">
          <span className="bg-[#A52BA7] px-4 py-1">VOLILNE</span>
          <span className="bg-[#A52BA7] px-4 py-1">PRAVICE</span>
          <span className="bg-[#A52BA7] px-4 py-1">TUJCEM</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        
        {/* 2. CONTEXT & URGENCY */}
        <section className="bg-white p-6 md:p-10 border-4 border-black border-b-[8px] border-r-[8px] mb-16">
          <p className="text-xl md:text-3xl font-medium leading-normal mb-8">
            Podpiši pobudo za referendum proti Zakonu o lokalnih volitvah (ZLV-M), ki <strong className="bg-[#A52BA7] text-white px-1">jemlje volilno pravico tujcem s stalnim prebivališčem</strong> na občinskih volitvah, ki so jo imeli vse od leta 2002.
          </p>
          <div className="flex items-start gap-4 p-4 bg-white/50 border-4 border-black font-bold text-lg md:text-2xl pt-5">
            <AlertTriangle className="shrink-0 w-8 h-8 md:w-10 md:h-10 text-[#A52BA7]" />
            <p className="leading-tight">
              Do ponedeljka <span className="text-[#A52BA7]">22. 6.</span> je treba zbrati <span className="text-[#A52BA7]">2500 podpisov</span> in jih predložiti parlamentu.
            </p>
          </div>
        </section>

        {/* 3. COUNTDOWN TIMER */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-black uppercase text-center mb-6 tracking-tight">Do ponedeljka 22. 6. je še:</h2>
          {mounted && (
            <div className="grid grid-cols-4 gap-2 md:gap-4 w-full border-4 border-black border-b-[8px] bg-black p-2 shadow-[8px_8px_0px_#A52BA7]">
              {timerComponents.some(c => c !== null) ? timerComponents : <span className="col-span-4 text-center text-[#A52BA7] text-4xl p-10 font-black">ČAS JE POTEKEL!</span>}
            </div>
          )}
        </section>

        {/* 4. ACTION & PRINT */}
        <section className="bg-black text-white p-6 md:p-10 border-4 border-black mb-16 shadow-[8px_8px_0px_#A52BA7]">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 text-[#A52BA7]">Kako oddam podpis?</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b-2 border-white/20 pb-10 relative">
              <div className="flex-1">
                <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
                  <span className="bg-[#A52BA7] text-white w-8 h-8 flex items-center justify-center rounded-full text-lg">1</span>
                  Natisni in prinesi
                </h3>
                <p className="text-lg md:text-xl font-medium text-white/90">
                  Natisni obrazec, naberi nekaj podpisov prijateljev in družine in ga prinesi na zbirno mesto.
                </p>
              </div>
              <div className="inline-block relative shrink-0">
                <div className="absolute inset-0 border-2 border-white bg-white translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2"></div>
                <a
                  href="/assets/obrazec.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center gap-3 bg-[#A52BA7] text-white px-6 py-4 border-2 border-white font-black text-xl md:text-2xl uppercase hover:bg-white hover:text-[#A52BA7] hover:border-black transition-colors duration-200 active:translate-x-1 active:translate-y-1 active:shadow-none z-10 w-full md:w-auto justify-center"
                >
                  <Printer className="w-6 h-6" />
                  Natisni obrazec
                </a>
              </div>
              
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#CCCF5D] text-black font-black px-6 py-2 uppercase text-lg tracking-widest -skew-x-6 z-20 shadow-[4px_4px_0px_#A52BA7]">
                ALI
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
                <span className="bg-[#A52BA7] text-white w-8 h-8 flex items-center justify-center rounded-full text-lg">2</span>
                Podpiši na zbirnem mestu
              </h3>
              <p className="text-lg md:text-xl font-medium text-white/90">
                Obišči zbirno mesto in oddaj podpis na lokaciji (obrazca ni potrebno tiskati).
              </p>
            </div>
          </div>
        </section>

        {/* 5. LOCATIONS */}
        <section className="bg-white text-black p-6 md:p-12 border-4 border-black border-b-[8px] border-r-[8px] mb-16 shadow-[8px_8px_0px_#A52BA7]">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-10 text-black border-b-4 border-black pb-4 inline-block">Zbirna mesta</h2>
          
          <div className="space-y-12">
            {locationsData.map((cityData) => (
              <div key={cityData.city}>
                <h3 className="font-black text-3xl md:text-4xl mb-6 text-[#A52BA7] uppercase flex items-center gap-3">
                  <MapPin className="w-8 h-8" />
                  {cityData.city}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {cityData.spots.map((spot, idx) => (
                    <div key={idx} className="bg-[#CCCF5D]/20 p-5 border-2 border-black">
                      <div className="mb-4">
                        <a 
                          href={`https://maps.google.com/?q=${encodeURIComponent(spot.query)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-black text-xl hover:text-[#A52BA7] hover:underline underline-offset-4 decoration-2 inline-flex items-start gap-2"
                        >
                          <span className="mt-1"><ChevronRight className="w-5 h-5 text-[#A52BA7] shrink-0" /></span>
                          <span>
                            {spot.name}
                            {spot.address && (
                              <span className="block text-base font-medium text-black/70 mt-1 uppercase tracking-tight">{spot.address}</span>
                            )}
                          </span>
                        </a>
                      </div>
                      
                      <ul className="space-y-2 text-base md:text-lg font-medium font-sans border-l-2 border-[#A52BA7] pl-4 ml-2">
                        {spot.times.map((time, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2 text-black/80">
                            <Clock className="w-4 h-4 mt-1 shrink-0 text-[#A52BA7]" />
                            {time}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 6. FOOTER */}
      <footer className="max-w-4xl mx-auto border-t-4 border-black pt-8 pb-12 mt-12 text-center md:text-left text-lg font-medium opacity-80">
        <p className="mb-2"><strong>Iniciativa:</strong></p>
        <p className="text-base leading-relaxed text-black">
          Kulturno društvo Gmajna, Kulturni center Danilo Kiš in Albansko kulturno društvo – AKD LIRI ter prvopodpisana Svetlana Slapšak.
        </p>
      </footer>
    </div>
  );
}
