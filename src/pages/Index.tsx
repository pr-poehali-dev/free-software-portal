import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type OS = 'Windows' | 'Mac' | 'Linux' | 'All';
type Category = 'Office' | 'Graphics' | 'Security' | 'Utilities' | 'Development' | 'All';
type SortBy = 'popular' | 'new' | 'name';

interface App {
  id: number;
  name: string;
  category: Category;
  description: string;
  icon: string;
  os: OS[];
  downloads: number;
  rating: number;
  size: string;
  isNew: boolean;
}

const apps: App[] = [
  {
    id: 1,
    name: 'LibreOffice',
    category: 'Office',
    description: 'Мощный офисный пакет с текстовым редактором, таблицами и презентациями',
    icon: '📝',
    os: ['Windows', 'Mac', 'Linux'],
    downloads: 50000000,
    rating: 4.8,
    size: '290 MB',
    isNew: false,
  },
  {
    id: 2,
    name: 'GIMP',
    category: 'Graphics',
    description: 'Профессиональный графический редактор для создания и обработки изображений',
    icon: '🎨',
    os: ['Windows', 'Mac', 'Linux'],
    downloads: 30000000,
    rating: 4.6,
    size: '180 MB',
    isNew: false,
  },
  {
    id: 3,
    name: 'ProtonVPN',
    category: 'Security',
    description: 'Безопасный VPN для защиты вашей конфиденциальности в интернете',
    icon: '🔒',
    os: ['Windows', 'Mac', 'Linux'],
    downloads: 15000000,
    rating: 4.9,
    size: '45 MB',
    isNew: true,
  },
  {
    id: 4,
    name: 'Visual Studio Code',
    category: 'Development',
    description: 'Современный редактор кода с поддержкой множества языков программирования',
    icon: '💻',
    os: ['Windows', 'Mac', 'Linux'],
    downloads: 80000000,
    rating: 4.9,
    size: '95 MB',
    isNew: false,
  },
  {
    id: 5,
    name: '7-Zip',
    category: 'Utilities',
    description: 'Мощный архиватор с высокой степенью сжатия файлов',
    icon: '📦',
    os: ['Windows'],
    downloads: 70000000,
    rating: 4.7,
    size: '1.5 MB',
    isNew: false,
  },
  {
    id: 6,
    name: 'Inkscape',
    category: 'Graphics',
    description: 'Векторный графический редактор для создания иллюстраций и логотипов',
    icon: '✏️',
    os: ['Windows', 'Mac', 'Linux'],
    downloads: 12000000,
    rating: 4.5,
    size: '125 MB',
    isNew: false,
  },
  {
    id: 7,
    name: 'Audacity',
    category: 'Utilities',
    description: 'Аудиоредактор для записи и обработки звука',
    icon: '🎵',
    os: ['Windows', 'Mac', 'Linux'],
    downloads: 40000000,
    rating: 4.6,
    size: '28 MB',
    isNew: false,
  },
  {
    id: 8,
    name: 'Bitwarden',
    category: 'Security',
    description: 'Менеджер паролей с открытым исходным кодом и шифрованием',
    icon: '🔐',
    os: ['Windows', 'Mac', 'Linux'],
    downloads: 8000000,
    rating: 4.8,
    size: '82 MB',
    isNew: true,
  },
];

const categories: Category[] = ['All', 'Office', 'Graphics', 'Security', 'Utilities', 'Development'];
const operatingSystems: OS[] = ['All', 'Windows', 'Mac', 'Linux'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedOS, setSelectedOS] = useState<OS>('All');
  const [sortBy, setSortBy] = useState<SortBy>('popular');

  const filteredApps = apps
    .filter((app) => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
      const matchesOS = selectedOS === 'All' || app.os.includes(selectedOS);
      return matchesSearch && matchesCategory && matchesOS;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.downloads - a.downloads;
      if (sortBy === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative">
        <header className="border-b border-border/40 backdrop-blur-xl bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl shadow-lg shadow-primary/20">
                  🚀
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    FreeApps
                  </h1>
                  <p className="text-sm text-muted-foreground">Бесплатное ПО для всех</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="hover-scale">
                  <Icon name="Heart" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="hover-scale">
                  <Icon name="User" size={20} />
                </Button>
              </div>
            </div>

            <div className="relative max-w-2xl">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Найти программу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card/50 border-border/60 focus:border-primary/60 transition-all"
              />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground/80 mb-3 flex items-center gap-2">
                <Icon name="Grid3x3" size={16} />
                Категории
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`hover-scale transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/20'
                        : 'hover:border-primary/40'
                    }`}
                  >
                    {category === 'All' ? 'Все' : category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/80 mb-3 flex items-center gap-2">
                <Icon name="Monitor" size={16} />
                Операционная система
              </h3>
              <div className="flex flex-wrap gap-2">
                {operatingSystems.map((os) => (
                  <Button
                    key={os}
                    variant={selectedOS === os ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedOS(os)}
                    className={`hover-scale transition-all ${
                      selectedOS === os
                        ? 'bg-gradient-to-r from-secondary to-primary shadow-lg shadow-secondary/20'
                        : 'hover:border-secondary/40'
                    }`}
                  >
                    {os === 'All' ? 'Все' : os}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Package" size={16} />
                Найдено программ: <span className="font-semibold text-foreground">{filteredApps.length}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'popular' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('popular')}
                  className="hover-scale"
                >
                  <Icon name="TrendingUp" size={16} className="mr-1" />
                  Популярные
                </Button>
                <Button
                  variant={sortBy === 'new' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('new')}
                  className="hover-scale"
                >
                  <Icon name="Sparkles" size={16} className="mr-1" />
                  Новые
                </Button>
                <Button
                  variant={sortBy === 'name' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('name')}
                  className="hover-scale"
                >
                  <Icon name="ArrowDownAZ" size={16} className="mr-1" />
                  По алфавиту
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <Card
                key={app.id}
                className="group relative overflow-hidden bg-card/80 backdrop-blur border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl shadow-lg">
                        {app.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {app.name}
                        </h3>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {app.category}
                        </Badge>
                      </div>
                    </div>
                    {app.isNew && (
                      <Badge className="bg-gradient-to-r from-accent to-secondary">
                        NEW
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {app.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{app.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Download" size={14} />
                      <span>{(app.downloads / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="HardDrive" size={14} />
                      <span>{app.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {app.os.map((os) => (
                      <Badge key={os} variant="outline" className="text-xs">
                        {os}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Icon name="SearchX" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </main>

        <footer className="border-t border-border/40 mt-16 py-8 bg-card/30 backdrop-blur">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© 2024 FreeApps. Бесплатное программное обеспечение для всех платформ.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}