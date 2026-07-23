import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Droplets, Heart, Leaf, MapPin, Phone, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-massage.jpg";
import detailImg from "@/assets/detail-massage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURA — массажный салон в центре города" },
      {
        name: "description",
        content:
          "Запишитесь на классический, расслабляющий или СПА-массаж в салоне AURA. Уютная атмосфера, натуральные масла и индивидуальный подход.",
      },
      { property: "og:title", content: "AURA — массажный салон в центре города" },
      {
        property: "og:description",
        content:
          "Запишитесь на классический, расслабляющий или СПА-массаж в салоне AURA. Уютная атмосфера, натуральные масла и индивидуальный подход.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-heading text-2xl font-bold tracking-tight text-foreground">
          AURA
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#services" className="transition-colors hover:text-foreground">
            Услуги
          </a>
          <a href="#about" className="transition-colors hover:text-foreground">
            О нас
          </a>
          <a href="#contacts" className="transition-colors hover:text-foreground">
            Контакты
          </a>
        </nav>

        <Button asChild size="sm">
          <a href="#booking">Записаться</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <img
        src={heroImg}
        alt="Уютный массажный кабинет с мягким светом и свечами"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl min-h-[85vh] items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Массажный салон AURA
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Верните себе ощущение лёгкости
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Расслабляющие и лечебные программы, натуральные масла и тёплая атмосфера, в которой
            тело и разум отдыхают по-настоящему.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button asChild size="lg">
              <a href="#booking">
                Записаться онлайн
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#services">Смотреть услуги</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Heart,
      title: "Классический массаж",
      description: "Глубокая проработка мышц, снятие напряжения и улучшение кровообращения.",
      price: "от 3 500 ₽",
    },
    {
      icon: Droplets,
      title: "СПА-ритуалы",
      description: "Арома-массаж, горячие камни и уход за кожей в одной восстанавливающей программе.",
      price: "от 5 900 ₽",
    },
    {
      icon: Leaf,
      title: "Антистресс-программы",
      description: "Мягкие техники, дышащие масла и расслабляющая атмосфера для полного сброса стресса.",
      price: "от 4 200 ₽",
    },
  ];

  return (
    <section id="services" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Услуги</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Выберите программу для себя
          </h2>
          <p className="mt-4 text-muted-foreground">
            Каждая программа адаптируется под ваш запрос, самочувствие и уровень напряжения.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg sm:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold text-card-foreground">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <span className="font-heading text-lg font-semibold text-foreground">
                  {service.price}
                </span>
                <Button variant="ghost" size="sm" asChild>
                  <a href="#booking" className="gap-1">
                    Подробнее <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const features = [
    {
      icon: Star,
      title: "Индивидуальный подход",
      description: "Перед сеансом уточняем ваши ожидания и особенности, чтобы результат превзошёл ожидания.",
    },
    {
      icon: Droplets,
      title: "Натуральные масла",
      description: "Работаем с органическими композициями без синтетических добавок.",
    },
    {
      icon: Heart,
      title: "Уютная атмосфера",
      description: "Тёплый свет, мягкие текстуры и тишина, в которой расслабляется каждая клетка.",
    },
    {
      icon: Clock,
      title: "Удобное расписание",
      description: "Сеансы доступны с утра до позднего вечера, включая выходные.",
    },
  ];

  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Почему AURA</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Забота о вас в каждой детали
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Мы создали пространство, где забота о теле и покое идёт рука об руку. Без суеты, без
              шаблонных процедур — только внимание к вашему состоянию.
            </p>
            <Button className="mt-8" asChild size="lg">
              <a href="#booking">Записаться на массаж</a>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="booking" className="bg-sage-dark py-20 text-primary-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src={detailImg}
                alt="Массажное масло и камни для релаксации"
                width={1200}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-sage-light">
              Запись на сеанс
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-primary-foreground sm:text-4xl">
              Готовы отдохнуть?
            </h2>
            <p className="mt-4 max-w-md text-primary-foreground/80">
              Выберите удобное время и услугу — мы подтвердим запись в течение 15 минут. Первый
              визит с бесплатной консультацией.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <a href="tel:+79990000000">
                  <Phone className="h-4 w-4" />
                  Позвонить
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="#contacts">Узнать адрес</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contacts" className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-heading text-2xl font-bold text-foreground">AURA</p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Массажный салон, где ваше тело и настроение становятся легче.
            </p>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold text-foreground">Контакты</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+79990000000" className="hover:text-foreground">
                  +7 999 000-00-00
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>г. Москва, ул. Примерная, 12</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold text-foreground">Режим работы</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between sm:max-w-[16rem]">
                <span>Пн–Пт</span>
                <span>10:00 — 22:00</span>
              </li>
              <li className="flex justify-between sm:max-w-[16rem]">
                <span>Сб–Вс</span>
                <span>11:00 — 21:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AURA. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
