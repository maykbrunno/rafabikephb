import logo from "@/assets/logo-rafabike.png";
import lojaPhoto from "@/assets/loja-rafabike.png";
import servicoRevisao from "@/assets/servico-revisao.jpeg";
import servicoMontagem from "@/assets/servico-montagem.jpeg";
import servicoAluguel from "@/assets/servico-aluguel.jpeg";
import { Phone, MapPin, Instagram, MessageCircle, UserPlus, Wrench, Bike, Truck, Settings } from "lucide-react";

const WHATSAPP_NUMBER = "5586988362710";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_LINK = "https://instagram.com/rafabikeparnaiba_";
const MAPS_LINK = "https://www.google.com/maps/search/Aeroporto+Jo%C3%A3o+Silva+Filho+Quiosque+I-05+Parna%C3%ADba+PI+64206260";

const handleSaveContact = () => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Rafa Bike
ORG:Rafa Bike - Aluguel, Revisão e Montagem
TEL;TYPE=CELL:+5586988362710
ADR;TYPE=WORK:;;Aeroporto João Silva Filho Quiosque I-05;Parnaíba;PI;64206260;Brasil
URL:https://instagram.com/rafabikeparnaiba_
NOTE:Vendas e aluguel de bike, peças e acessórios. Revisões especializadas.
END:VCARD`;
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "RafaBike.vcf";
  a.click();
  URL.revokeObjectURL(url);
};

const services = [
  {
    image: servicoRevisao,
    title: "Revisão Completa",
    price: "A partir de R$ 120,00",
    details: ["Pró — R$ 150", "Master — R$ 120", "Regulagem — R$ 100"],
  },
  {
    image: servicoMontagem,
    title: "Montagem",
    price: "A partir de R$ 80,00",
    details: ["Adulto com câmbio — R$ 100", "Infantil até aro 24 sem câmbio — R$ 80"],
  },
  {
    image: servicoAluguel,
    title: "Aluguel de Bike",
    price: "A partir de R$ 15,00",
    details: ["Aro 29 — 30 min por R$ 15"],
  },
];

const features = [
  { icon: Bike, text: "Vendas e aluguel de bike, peças e acessórios" },
  { icon: Wrench, text: "Revisões especializadas" },
  { icon: Truck, text: "Leva e traz — coleta e entrega" },
  { icon: Settings, text: "Renove e monte sua bike" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        {/* Store photo */}
        <div className="relative h-56 sm:h-72">
          <img
            src={lojaPhoto}
            alt="Loja Rafa Bike"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
        </div>
        {/* Logo + text overlay */}
        <div className="relative -mt-16 z-10 text-center px-4 pb-10">
          <img
            src={logo}
            alt="Rafa Bike Logo"
            className="mx-auto mb-3 h-28 w-28 rounded-2xl object-cover shadow-xl ring-4 ring-background"
          />
          <h1 className="font-heading text-2xl font-black tracking-tight text-foreground">
            Rafa Bike
          </h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Aluguel, Revisão e Montagem
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-10 -mt-1">
        {/* Features */}
        <section className="mb-8 grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-sm"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="text-sm font-medium text-card-foreground">{f.text}</span>
            </div>
          ))}
        </section>

        {/* CTA Buttons */}
        <section className="mb-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-heading text-sm font-bold text-primary-foreground shadow-md transition hover:brightness-110"
          >
            <MessageCircle className="h-5 w-5" />
            Fale pelo WhatsApp
          </a>
          <button
            onClick={handleSaveContact}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-4 font-heading text-sm font-bold text-primary shadow-sm transition hover:bg-primary hover:text-primary-foreground"
          >
            <UserPlus className="h-5 w-5" />
            Salvar Contato
          </button>
        </section>

        {/* Services */}
        <section className="mb-8">
          <h2 className="mb-4 font-heading text-lg font-800 text-foreground">
            Nossos Serviços
          </h2>
          <div className="flex flex-col gap-4">
            {services.map((s, i) => (
              <div key={i} className="overflow-hidden rounded-xl bg-card shadow-md">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-heading text-lg font-bold text-primary-foreground">
                      {s.title}
                    </h3>
                    <p className="text-sm font-semibold text-primary-foreground/90">{s.price}</p>
                  </div>
                </div>
                <div className="p-4">
                  <ul className="space-y-1">
                    {s.details.map((d, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-xs font-bold text-accent-foreground transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Agendar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="mb-8 rounded-xl bg-card p-5 shadow-md">
          <h2 className="mb-3 font-heading text-lg font-800 text-foreground">
            📍 Localização
          </h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Aeroporto João Silva Filho, Quiosque I-05, Parnaíba - PI, CEP 64206-260
          </p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-110"
          >
            <MapPin className="h-4 w-4" />
            Ver no Google Maps
          </a>
        </section>

        {/* Social */}
        <section className="mb-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-card px-5 py-3.5 font-heading text-sm font-bold text-foreground shadow-sm transition hover:shadow-md"
          >
            <Instagram className="h-5 w-5 text-accent" />
            @rafabikeparnaiba_
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-card px-5 py-3.5 font-heading text-sm font-bold text-foreground shadow-sm transition hover:shadow-md"
          >
            <Phone className="h-5 w-5 text-accent" />
            (86) 98836-2710
          </a>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
          <p>Rafa Bike — Todos os Direitos Reservados</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
