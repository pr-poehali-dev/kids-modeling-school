import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    child_name: '',
    age: '',
    parent_phone: '',
    email: '',
    comment: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/4130ddb3-3e53-491a-90dc-b8da5a47f1d8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время",
        });
        setFormData({
          child_name: '',
          age: '',
          parent_phone: '',
          email: '',
          comment: ''
        });
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось отправить заявку",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const courses = [
    {
      title: "Основы подиумной походки",
      duration: "3 месяца",
      age: "7-10 лет",
      description: "Базовые навыки дефиле, осанка, координация движений"
    },
    {
      title: "Профессиональная модель",
      duration: "6 месяцев",
      age: "11-14 лет",
      description: "Работа с камерой, позирование, участие в показах"
    },
    {
      title: "Актёрское мастерство",
      duration: "4 месяца",
      age: "8-14 лет",
      description: "Развитие артистизма, работа с эмоциями, сценическая речь"
    }
  ];

  const portfolio = [
    { name: "Анна Смирнова", age: 12, category: "runway", image: "https://cdn.poehali.dev/projects/df2360e3-d94c-4eac-866c-9f9fb4bb4e95/files/6cab6ddd-03b1-4027-9396-7d9b08c85f0f.jpg" },
    { name: "Мария Петрова", age: 10, category: "photo", image: "https://cdn.poehali.dev/projects/df2360e3-d94c-4eac-866c-9f9fb4bb4e95/files/6cab6ddd-03b1-4027-9396-7d9b08c85f0f.jpg" },
    { name: "София Иванова", age: 13, category: "runway", image: "https://cdn.poehali.dev/projects/df2360e3-d94c-4eac-866c-9f9fb4bb4e95/files/6cab6ddd-03b1-4027-9396-7d9b08c85f0f.jpg" },
    { name: "Алиса Козлова", age: 11, category: "photo", image: "https://cdn.poehali.dev/projects/df2360e3-d94c-4eac-866c-9f9fb4bb4e95/files/6cab6ddd-03b1-4027-9396-7d9b08c85f0f.jpg" }
  ];

  const teachers = [
    { name: "Елена Волкова", position: "Основатель школы", experience: "15 лет в модельном бизнесе" },
    { name: "Ирина Соколова", position: "Хореограф", experience: "10 лет преподавания" },
    { name: "Дмитрий Орлов", position: "Фотограф", experience: "12 лет в fashion-индустрии" }
  ];

  const achievements = [
    { title: "Fashion Week Junior 2024", description: "Гран-при" },
    { title: "Лучшая школа моделей", description: "Москва 2023" },
    { title: "Международный конкурс", description: "1-е место" }
  ];

  const partners = [
    "Fashion House Kids", "Elite Model Look Junior", "Vogue Bambini", "Kids Fashion Magazine"
  ];

  const filteredPortfolio = selectedCategory === "all" 
    ? portfolio 
    : portfolio.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">ELITE KIDS</h1>
            <div className="hidden md:flex gap-8 items-center">
              <a href="#about" className="text-sm hover:text-accent transition-colors">О школе</a>
              <a href="#courses" className="text-sm hover:text-accent transition-colors">Курсы</a>
              <a href="#portfolio" className="text-sm hover:text-accent transition-colors">Портфолио</a>
              <a href="#teachers" className="text-sm hover:text-accent transition-colors">Педагоги</a>
              <a href="#gallery" className="text-sm hover:text-accent transition-colors">Галерея</a>
              <a href="#contact" className="text-sm hover:text-accent transition-colors">Контакты</a>
              <Button className="bg-accent hover:bg-accent/90 text-primary">Записаться</Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
                Профессиональная школа моделей
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Раскрываем талант вашего ребёнка
              </h2>
              <p className="text-lg text-muted-foreground">
                Более 10 лет готовим юных моделей к профессиональной карьере. 
                Наши выпускники работают с ведущими модельными агентствами мира.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Записаться на пробное занятие
                </Button>
                <Button size="lg" variant="outline">
                  Узнать больше
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-accent">500+</div>
                  <div className="text-sm text-muted-foreground">Выпускников</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">10</div>
                  <div className="text-sm text-muted-foreground">Лет опыта</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">15+</div>
                  <div className="text-sm text-muted-foreground">Наград</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-accent/5 rounded-2xl transform rotate-3"></div>
              <img 
                src="https://cdn.poehali.dev/projects/df2360e3-d94c-4eac-866c-9f9fb4bb4e95/files/6cab6ddd-03b1-4027-9396-7d9b08c85f0f.jpg"
                alt="Модель"
                className="relative rounded-2xl w-full h-[600px] object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">О школе</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ELITE KIDS — это профессиональная школа моделей для детей и подростков от 7 до 14 лет. 
              Мы развиваем не только внешние данные, но и внутренние качества: уверенность, артистизм, 
              коммуникабельность. Наша программа основана на международных стандартах модельного бизнеса.
            </p>
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 pb-6 text-center space-y-3">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Award" className="text-accent" size={32} />
                  </div>
                  <h3 className="font-semibold text-lg">Профессионализм</h3>
                  <p className="text-sm text-muted-foreground">
                    Преподаватели с опытом работы в топовых модельных агентствах
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 pb-6 text-center space-y-3">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Users" className="text-accent" size={32} />
                  </div>
                  <h3 className="font-semibold text-lg">Индивидуальный подход</h3>
                  <p className="text-sm text-muted-foreground">
                    Группы до 8 человек для максимального внимания каждому ученику
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 pb-6 text-center space-y-3">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Star" className="text-accent" size={32} />
                  </div>
                  <h3 className="font-semibold text-lg">Практика</h3>
                  <p className="text-sm text-muted-foreground">
                    Регулярные фотосессии, показы и участие в реальных проектах
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Наши курсы</h2>
            <p className="text-muted-foreground">Профессиональные программы для разных возрастов</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="pt-8 pb-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">{course.title}</h3>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{course.duration}</Badge>
                      <Badge variant="secondary">{course.age}</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{course.description}</p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">Портфолио учеников</h2>
            <p className="text-muted-foreground">Наши звёзды</p>
          </div>
          <div className="flex justify-center gap-4 mb-12">
            <Button 
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-primary" : ""}
            >
              Все
            </Button>
            <Button 
              variant={selectedCategory === "runway" ? "default" : "outline"}
              onClick={() => setSelectedCategory("runway")}
              className={selectedCategory === "runway" ? "bg-primary" : ""}
            >
              Подиум
            </Button>
            <Button 
              variant={selectedCategory === "photo" ? "default" : "outline"}
              onClick={() => setSelectedCategory("photo")}
              className={selectedCategory === "photo" ? "bg-primary" : ""}
            >
              Фотосессии
            </Button>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {filteredPortfolio.map((item, index) => (
              <Card key={index} className="border-none shadow-lg overflow-hidden group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm">{item.age} лет</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Достижения</h2>
            <p className="text-muted-foreground">Наши победы и награды</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-2 border-accent/20 shadow-lg text-center">
                <CardContent className="pt-8 pb-6 space-y-2">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Trophy" className="text-accent" size={40} />
                  </div>
                  <h3 className="text-xl font-semibold">{achievement.title}</h3>
                  <p className="text-accent font-medium">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">Наши партнёры</h2>
            <p className="text-white/80">Работаем с ведущими брендами индустрии</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex items-center justify-center text-center hover:bg-white/20 transition-colors">
                <p className="font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="teachers" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Наши педагоги</h2>
            <p className="text-muted-foreground">Профессионалы с международным опытом</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 pb-6 text-center space-y-4">
                  <div className="w-32 h-32 bg-accent/10 rounded-full mx-auto flex items-center justify-center">
                    <Icon name="User" className="text-accent" size={60} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{teacher.name}</h3>
                    <p className="text-accent text-sm font-medium">{teacher.position}</p>
                    <p className="text-muted-foreground text-sm mt-2">{teacher.experience}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Галерея</h2>
            <p className="text-muted-foreground">Моменты с наших показов и мероприятий</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/projects/df2360e3-d94c-4eac-866c-9f9fb4bb4e95/files/8faf6597-db2e-4d68-bde9-9f6a02961d51.jpg"
                alt="Fashion show"
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Icon name="ZoomIn" className="text-white" size={48} />
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/projects/df2360e3-d94c-4eac-866c-9f9fb4bb4e95/files/f88dc363-e53d-4c28-bdf8-e30643287bd3.jpg"
                alt="Training"
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Icon name="ZoomIn" className="text-white" size={48} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-accent/5 rounded-3xl p-12">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-4xl font-bold">Расписание</h2>
              <p className="text-muted-foreground">Занятия проходят 3 раза в неделю</p>
              <div className="bg-white rounded-2xl p-8 shadow-lg space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="text-left">
                    <p className="font-semibold">Младшая группа (7-10 лет)</p>
                    <p className="text-sm text-muted-foreground">Понедельник, Среда, Пятница</p>
                  </div>
                  <p className="text-accent font-semibold">15:00 - 17:00</p>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="text-left">
                    <p className="font-semibold">Средняя группа (11-12 лет)</p>
                    <p className="text-sm text-muted-foreground">Вторник, Четверг, Суббота</p>
                  </div>
                  <p className="text-accent font-semibold">16:00 - 18:30</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="font-semibold">Старшая группа (13-14 лет)</p>
                    <p className="text-sm text-muted-foreground">Понедельник, Среда, Суббота</p>
                  </div>
                  <p className="text-accent font-semibold">17:00 - 19:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Запишитесь на пробное занятие</h2>
              <p className="text-white/80 text-lg">
                Оставьте заявку, и мы свяжемся с вами в ближайшее время
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Icon name="Phone" className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-white/80">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Icon name="Mail" className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-white/80">info@elitekids.ru</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Icon name="MapPin" className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Адрес</p>
                    <p className="text-white/80">Москва, ул. Тверская, д. 1</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="border-none shadow-2xl">
              <CardContent className="pt-8 pb-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Имя ребёнка</label>
                    <Input 
                      name="child_name"
                      value={formData.child_name}
                      onChange={handleInputChange}
                      placeholder="Введите имя" 
                      className="bg-secondary/30" 
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Возраст</label>
                    <Input 
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      type="number" 
                      placeholder="Возраст" 
                      className="bg-secondary/30" 
                      min="7"
                      max="14"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон родителя</label>
                    <Input 
                      name="parent_phone"
                      value={formData.parent_phone}
                      onChange={handleInputChange}
                      placeholder="+7 (___) ___-__-__" 
                      className="bg-secondary/30" 
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email" 
                      placeholder="email@example.com" 
                      className="bg-secondary/30" 
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Комментарий</label>
                    <Textarea 
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Расскажите о вашем ребёнке" 
                      className="bg-secondary/30" 
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-primary" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/30 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">ELITE KIDS</h3>
              <p className="text-sm text-muted-foreground">
                Профессиональная школа моделей для детей и подростков
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="hover:text-accent transition-colors cursor-pointer">О школе</p>
                <p className="hover:text-accent transition-colors cursor-pointer">Курсы</p>
                <p className="hover:text-accent transition-colors cursor-pointer">Портфолио</p>
                <p className="hover:text-accent transition-colors cursor-pointer">Педагоги</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+7 (495) 123-45-67</p>
                <p>info@elitekids.ru</p>
                <p>Москва, ул. Тверская, д. 1</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/20 transition-colors">
                  <Icon name="Instagram" className="text-accent" size={20} />
                </div>
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/20 transition-colors">
                  <Icon name="Facebook" className="text-accent" size={20} />
                </div>
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/20 transition-colors">
                  <Icon name="Youtube" className="text-accent" size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 ELITE KIDS. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;