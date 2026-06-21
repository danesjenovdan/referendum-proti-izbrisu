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
            "Nedelja 21. 6. od 9.00 do 00.00",
            "Nedelja 22. 6. od 9.00 do 12.00"
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
      city: "Celje",
      spots: [
        {
          name: "Društvo Besa Celje",
          address: "Mariborska cesta 68/a, 3000 Celje",
          query: "Mariborska cesta 68/a Celje",
          times: [
            "Petek 19. 6. od 9.00 do 21.00",
            "Sobota 20. 6. od 9.00 do 21.00"
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
                  href="/obrazec.pdf"
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

      {/* 7. PODPISNIKI & VIRI */}
      <div className="max-w-4xl mx-auto space-y-12 mt-4 mb-16">

        {/* Izjava */}
        <section className="bg-white border-4 border-black border-b-[8px] border-r-[8px] p-6 md:p-10 shadow-[8px_8px_0px_#A52BA7]">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-8 leading-tight">Odvzem volilne pravice soobčankam in soobčanom</h2>

          <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/85">
            <p>V sredo, 10. junija 2026, so poslanci in poslanke na 5. nujni seji Odbora za notranje zadeve potrdili spremembe Zakona o lokalnih volitvah, ki med drugim odvzema volilno pravico državljanom tretjih držav, ki imajo dovoljenje za stalno prebivanje v Republiki Sloveniji. Te osebe tukaj živijo že vrsto let, delajo, plačujejo davke, vzgajajo otroke, soustvarjajo lokalne skupnosti in predstavljajo njihov nepogrešljiv del.</p>

            <p>Sprememba je sporna, saj omejuje politične pravice skupine prebivalcev, ki so jih pridobili pred več kot dvemi desetletji. Obravnavana je bila po skrajšanem zakonodajnem postopku in na začetku mandata, s čimer je onemogočena širša javna in strokovna razprava, ki bi jo takšen poseg v demokratične standarde nedvomno zahteval. Gre za spodkopavanje politične participacije v širšem smislu, saj se volilna zakonodaja spreminja tik pred jesenskimi lokalnimi volitvami.</p>

            <p className="bg-[#CCCF5D] px-5 py-4 font-semibold border-l-4 border-[#A52BA7]">Odvzem volilne pravice bo utišal približno <strong>100.000 glasov</strong>. Volilno pravico spreminja v politično orodje – morda v hiter obliž, s katerim naj bi se "pomirila" javnost v času vse večje globalne negotovosti in draginje. Tujci so ponovno postali izgovor za preusmerjanje pozornosti od številnih težav lokalne uprave. Pri tem se sprašujemo, ali niso predlagatelji odvzeli volilne pravice tudi tistim upravičencem, ki so zanje glasovali na preteklih lokalnih volitvah.</p>

            <p>Volilna pravica je eden temeljnih institutov demokracije, ki temelji na načelu, da imajo ljudje, ki živijo v določeni skupnosti, možnost sodelovati pri odločanju o vprašanjih, ki vplivajo na njihovo vsakdanje življenje. Volilna pravica ni privilegij, temveč mehanizem vključevanja in politične participacije ljudi, ki so trajno povezani z okoljem, v katerem živijo. Ne gre zgolj za tehnično vprašanje, temveč za občutek pripadnosti in družbeno kohezijo. Paradoksalno je od priseljenk in priseljencev pričakovati, da se bodo vključili v novo okolje, hkrati pa jim odvzeti možnost soodločanja o skupnosti, katere del naj bi postali.</p>

            <p>Državljani tretjih držav s stalnim prebivališčem imajo po trenutno veljavni zakonodaji volilno pravico na občinski oziroma lokalni ravni, ne pa tudi na državni. To pomeni, da lahko v občini, kjer imajo stalno prebivališče, volijo župana in člane občinskega sveta, nimajo pa pravice sodelovati na volitvah v Državni zbor ali na volitvah predsednika republike. Na lokalni ravni jim je zagotovljena aktivna volilna pravica, to je pravica glasovati, pasivne volilne pravice, torej pravice kandidirati in biti izvoljeni, pa nimajo. Ta je na lokalni ravni priznana državljanom Republike Slovenije in državljanom drugih držav članic EU.</p>

            <p>Volilna pravica na lokalnih volitvah za državljane tretjih držav ni izjema. Različne oblike takšne pravice priznava večina držav članic Evropske unije. Na Švedskem, Danskem, Portugalskem in v Litvi jo lahko tujci uveljavljajo po treh letih zakonitega prebivanja, na Finskem po štirih letih, v Belgiji, na Nizozemskem in na Madžarskem pa po petih letih. Ne gre za obrobno posebnost, temveč za uveljavljeno prakso.</p>

            <p>V Luksemburgu, kjer je udeležba na volitvah obvezna, časovnih pogojev ni – tujci ob predhodni registraciji pridobijo volilno pravico z vpisom v volilni imenik. Podobno ureditev poznajo na Irskem, kjer imajo pravico glasovati na lokalnih volitvah vsi prebivalci, ne glede na državljanstvo. Za udeležbo na volitvah ni potrebno niti stalno prebivališče niti večletno bivanje v državi, temveč zadoščajo prebivanje v lokalni skupnosti, starost najmanj 18 let in vpis v volilni imenik.</p>

            <p>Slovenska ureditev je tako v primerjavi z drugimi evropskimi državami že doslej precej restriktivna, a hkrati velja za primer dobre prakse na področju politik integracije.</p>

            <p>V obdobju zaključevanja pristopnih pogajanj za vstop v Evropsko unijo je Slovenija kot mlada država želela dokazati, da je demokratična, solidarna in zavezana evropskim vrednotam. Maja 2002 je vlada Janeza Drnovška v okviru širših demokratičnih reform razširila lokalno volilno pravico tudi na tujce s stalnim prebivališčem. Istega leta sta podobne rešitve uvedli tudi Estonija in Litva. Predlagatelji razširitve so jo takrat predstavljali kot civilizacijsko normo in kot del približevanja evropskim političnim standardom.</p>

            <p className="font-semibold italic">Kakšni pa so ti standardi danes, ko vlada ad hoc odvzema volilno pravico manjšinskemu delu prebivalstva?</p>

            <p>Države, ki državljanom tretjih držav (še) ne priznavajo volilne pravice ali jo omejujejo, razvijajo druge mehanizme političnega vključevanja. V Avstriji, Nemčiji, Italiji in Grčiji, kjer tujci nimajo volilne pravice, delujejo migrantski sveti, integracijske komisije in druga posvetovalna telesa, ki omogočajo institucionalizirano zastopanje migrantskih skupnosti ter dialog z lokalnimi oblastmi.</p>

            <p>Takšni mehanizmi sicer ne nadomeščajo volilne pravice, vendar predstavljajo pomemben kanal za sodelovanje migrantov pri oblikovanju lokalnih politik in odločitev, ki vplivajo na njihovo vsakdanje življenje. Posvetovalna telesa poznajo tudi v Luksemburgu, Belgiji, Španiji in na Nizozemskem, čeprav te države pod določenimi pogoji tujcem omogočajo tudi uresničevanje volilne pravice na lokalni ravni.</p>

            <p>Nemčija, ki državljanom tretjih držav ne priznava volilne pravice, hkrati pa beleži visok delež prebivalcev migrantskega porekla, je junija 2024 poenostavila dostop do nemškega državljanstva. Namesto krčenja političnih pravic je izbrala vključujoč pristop: olajšala je pridobitev državljanstva in s tem dostop do polne politične participacije, vključno s splošno volilno pravico.</p>

            <p className="font-bold">Spremembam Zakona o lokalnih volitvah, ki državljanom tretjih držav odvzemajo volilno pravico na lokalni ravni, ostro nasprotujemo. Zahtevamo, da se predlagane spremembe presodijo z vidika njihove skladnosti z Ustavo Republike Slovenije.</p>

            <p>Vlado pozivamo, naj prepozna razvojne priložnosti za krepitev vključevanja in politične participacije vseh prebivalcev Republike Slovenije. Obenem opozarjamo, da je treba poleg volilne pravice okrepiti tudi druge oblike vključevanja tujcev v demokratične procese. Med drugim je treba poenostaviti postopke za pridobitev državljanstva ter na občinski ravni vzpostaviti svete za vključevanje priseljencev.</p>

            <p>Politične pravice imajo tudi ljudje, ki v skupnosti trajno živijo, čeprav niso njeni državljani. Sodobne demokracije ne temeljijo zgolj na načelu večine, temveč tudi na varstvu manjšin, človekovih pravicah, ustavnih omejitvah oblasti in vključevanju skupin, ki nimajo politične moči. V demokratičnih ureditvah vprašanje ni le, kdo zmaga na volitvah, temveč tudi, kdo je v politično skupnost sploh vključen. Gre za temeljno vprašanje, ali Republika Slovenija tujce s stalnim prebivališčem razume kot enakovreden del lokalnih skupnosti, v katerih živijo.</p>

            <blockquote className="border-l-8 border-[#A52BA7] pl-6 py-3 text-lg md:text-xl font-medium italic text-black mt-6">
              Vprašanje zato ni le, komu je bil danes odvzet glas. Ključno vprašanje je, kakšno demokracijo želimo graditi: takšno, ki ljudi vključuje in spodbuja njihovo sodelovanje pri javnih zadevah, ali takšno, ki delu prebivalstva odreka politični glas, čeprav je del skupnosti, v njej živi, dela in prispeva k njenemu razvoju.
            </blockquote>
          </div>
        </section>

        {/* Podpisniki */}
        <section>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 border-b-4 border-black pb-3">Podpisniki</h2>
          <ul className="columns-1 md:columns-2 gap-8 text-base md:text-lg font-medium space-y-1">
            {[
              "Kulturno društvo Gmajna",
              "Kulturni center Danilo Kiš",
              "Slovenska filantropija",
              "PIC - Pravni center za varstvo človekovih pravic in okolja",
              "Infokolpa",
              "Inštitut Časopis za kritiko znanosti",
              "Inštitut za multikulturne raziskave - IMR",
              "Albansko kulturno društvo - AKD LIRIA",
              "Bošnjaška kulturna zveza Slovenije",
              "Bošnjaško mladinsko kulturno društvo Velenje",
              "Zveza albanskih kulturnih društev v Sloveniji",
              "Zveza zvez kulturnih društev narodnih skupnosti konstitutivnih narodov nekdanje SFRJ v Republiki Sloveniji",
              "Kulturno društvo albancev Migjeni - KDA Migjeni",
              "Kulturno društvo albancev Besa Celje",
              "Društvo albanskih žensk Teuta",
              "Društvo Ymer Elshani Slovenija",
              "Kulturno društvo Albancev Slovenske Istre Iliria-Koper",
              "Kulturno in športno društvo »Sandžak« v Sloveniji",
              "Kulturno izobraževalno društvo Bashkimi Maribor",
              "Društvo za kulturno kontaminacijo AnKlaB",
              "Društvo Ljiljan",
              "Kulturno umetniško in športno društvo Behar",
              "Bošnjačko kulturno društvo RUH Domžale",
              "Sangai d.o.o. - Sangai - Skupaj",
              "Zavod Afriška Vas",
            ].map((org) => (
              <li key={org} className="flex items-start gap-2 break-inside-avoid">
                <span className="text-[#A52BA7] font-black mt-0.5">—</span>
                {org}
              </li>
            ))}
          </ul>
        </section>

        {/* Viri */}
        <section>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 border-b-4 border-black pb-3">Viri</h2>
          <ol className="space-y-4 text-sm md:text-base font-medium text-black/70 list-decimal list-outside ml-5">
            <li>An Coimisiún Toghcháin - The Electoral Commission of Ireland (2026). <em>Voter Eligibility.</em> Dostopno na: <a href="https://www.electoralcommission.ie/voter-eligibility/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A52BA7] break-all">https://www.electoralcommission.ie/voter-eligibility/</a> (Pridobljeno 11. 6. 2026).</li>
            <li>EMVI - Empowering Migrant Voices on Integration and Inclusion Policies (2022). <em>National Reports.</em> Dostopno na: <a href="https://diaspora-participation.eu/wp-content/uploads/2022/10/DEF_EMVI_AT_DE_IT_GR_SI_NationalReports.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A52BA7] break-all">https://diaspora-participation.eu/…</a> (Pridobljeno 10. 6. 2026).</li>
            <li>EMVI – Krepitev migrantskih glasov v politikah vključevanja (2022). <em>Povzetek vodnika dobre prakse.</em> Dostopno na: <a href="https://www.mirovni-institut.si/wp-content/uploads/2022/02/Povzetek-vodnika-dobre-prakse-za-politicno-participacijo-migrantov-slovenscina.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A52BA7] break-all">https://www.mirovni-institut.si/…</a> (Pridobljeno 10. 6. 2026).</li>
            <li>EMVI-LII - Empowering Migrant Voices for Local Integration and Inclusion (2025). <em>Baseline Assessment of Local Integration Strategies And Migrant Participation.</em> Dostopno na: <a href="https://www.mirovni-institut.si/wp-content/uploads/2025/03/BaselineAssessment_EMV-LII.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A52BA7] break-all">https://www.mirovni-institut.si/…</a> (Pridobljeno 10. 6. 2026).</li>
            <li>Groenendijk, Kees (2014). <em>Voting Rights for Nationals of Non-EU States.</em> Bonn: Bundeszentrale für politische Bildung. Dostopno na: <a href="https://www.bpb.de/themen/migration-integration/kurzdossiers/184711/voting-rights-for-nationals-of-non-eu-states/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A52BA7] break-all">https://www.bpb.de/…</a> (Pridobljeno 10. 6. 2026).</li>
            <li>Luxembourg Government, Ministry of Family Affairs, Solidarity, Living Together and Reception of Refugees (2026). <em>Living Together.</em> Dostopno na: <a href="https://mfsva.gouvernement.lu/en/le-ministere/attributions/zesummeliewen.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A52BA7] break-all">https://mfsva.gouvernement.lu/…</a> (Pridobljeno 11. 6. 2026).</li>
            <li>Medved, Felicita (2002). Volilna pravica tujcev s stalnim prebivališčem kot prispevek integraciji in lokalni samoupravi. <em>Razprave in gradivo - Inštitut za narodnostna vprašanja (1990),</em> številka 40, str. 22–39.</li>
            <li>MIPEX - Migrant Integration Policy Index (2025). Dostopno na: <a href="https://mipex.eu/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A52BA7]">https://mipex.eu/</a> (Pridobljeno 10. 6. 2026).</li>
            <li>Rozumek, Martin (2015). <em>Participation and Policy Involvement of Third Country Nationals in Public Life of 9 Central and Eastern EU Member States.</em> Organizace pro pomoc uprchlíkům.</li>
          </ol>
        </section>

      </div>

    </div>
  );
}
