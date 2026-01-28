import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: number;
  child_name: string;
  age: number;
  parent_phone: string;
  email: string;
  comment: string;
  created_at: string;
}

const Admin = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/4130ddb3-3e53-491a-90dc-b8da5a47f1d8');
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.data);
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить заявки",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить заявки",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold tracking-tight">ELITE KIDS</h1>
              <Badge variant="secondary">Админ-панель</Badge>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Icon name="Home" size={20} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Заявки на обучение</h2>
              <p className="text-muted-foreground mt-2">
                Управление заявками от родителей
              </p>
            </div>
            <Button onClick={fetchApplications} disabled={isLoading}>
              <Icon name="RefreshCw" size={20} className="mr-2" />
              Обновить
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Всего заявок
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{applications.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Младшая группа (7-10)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {applications.filter(app => app.age >= 7 && app.age <= 10).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Средняя группа (11-12)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {applications.filter(app => app.age >= 11 && app.age <= 12).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Старшая группа (13-14)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {applications.filter(app => app.age >= 13 && app.age <= 14).length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список заявок</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Icon name="Loader2" size={40} className="animate-spin text-accent" />
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Inbox" size={60} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Пока нет заявок</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Имя ребёнка</TableHead>
                        <TableHead>Возраст</TableHead>
                        <TableHead>Телефон</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Комментарий</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.id}</TableCell>
                          <TableCell className="font-semibold">{app.child_name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{app.age} лет</Badge>
                          </TableCell>
                          <TableCell>{app.parent_phone}</TableCell>
                          <TableCell>{app.email}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {app.comment || '—'}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(app.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
