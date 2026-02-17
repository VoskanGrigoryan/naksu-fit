import {
  Badge,
  Card,
  Stack,
  Text,
  Title,
  SimpleGrid,
  ScrollArea,
} from "@mantine/core";
import MainLayout from "../../layouts/main/MainLayout";
import { BarChart } from "@mantine/charts";

const classesThisWeekData = [
  { type: "Boxing", count: 5 },
  { type: "Muay Thai", count: 3 },
  { type: "Yoga", count: 4 },
  { type: "Crossfit", count: 2 },
];

const todayClasses = [
  { type: "Boxing", instructor: "John Doe", booked: 10, capacity: 12 },
  { type: "Muay Thai", instructor: "Jane Smith", booked: 12, capacity: 12 },
  { type: "Yoga", instructor: "Anna Lee", booked: 8, capacity: 12 },
  { type: "Crossfit", instructor: "Mike Tyson", booked: 6, capacity: 10 },
  { type: "Pilates", instructor: "Emma Stone", booked: 7, capacity: 10 },
  { type: "Cardio", instructor: "Chris Evans", booked: 8, capacity: 12 },
  // add more to test scroll
];

export const userGrowthData = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <Stack
        style={{
          height: "calc(100vh - 100px)",
          overflowY: "auto",
          padding: 16,
        }}
      >
        {/* Top KPIs */}
        <SimpleGrid cols={3} spacing="md">
          <Card shadow="sm" padding="lg">
            <Title order={4}>Usuarios totales</Title>
            <Text size="xl" fw={700}>
              120
            </Text>
          </Card>
          <Card shadow="sm" padding="lg">
            <Title order={4}>Usuarios activos (Mensual)</Title>
            <Text size="xl" fw={700}>
              85
            </Text>
          </Card>
          <Card shadow="sm" padding="lg">
            <Title order={4}>Nuevos usuarios (Mes actual)</Title>
            <Text size="xl" fw={700}>
              5
            </Text>
          </Card>
        </SimpleGrid>

        {/* Classes This Week */}
        <Card shadow="sm" padding="lg" style={{ height: 350 }}>
          <Title order={5}>Actividades esta semana</Title>
          <BarChart
            h={250}
            data={classesThisWeekData}
            dataKey="type"
            series={[{ name: "Number of Classes", color: "#228be6" }]}
            tickLine="y"
          />
        </Card>

        {/* Today's Classes (scrollable) */}
        <Card shadow="sm" padding="lg">
          <Title order={5}>Clases hoy</Title>
          <ScrollArea style={{ maxHeight: 200, marginTop: 8 }}>
            <Stack>
              {todayClasses.map((cls, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>
                    {cls.type} - {cls.instructor}
                  </Text>
                  <Badge color={cls.booked === cls.capacity ? "green" : "blue"}>
                    {cls.booked}/{cls.capacity}
                  </Badge>
                </div>
              ))}
            </Stack>
          </ScrollArea>
        </Card>

        {/* User Growth */}
        <Card shadow="md" p="lg" style={{ height: 350 }}>
          <Title order={5}>Crecimiento de usuarios</Title>
          <BarChart
            h={250}
            data={userGrowthData}
            dataKey="month"
            series={[
              { name: "Smartphones", color: "#be4bdb" },
              { name: "Laptops", color: "#228be6" },
              { name: "Tablets", color: "#12b886" },
            ]}
            tickLine="y"
          />
        </Card>
      </Stack>
    </MainLayout>
  );
};

export default Dashboard;
