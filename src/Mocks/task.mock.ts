import { Task } from "../Entity/task";

export const TASK_DATA_MOCK: Task[] = [
    {
        _id: 'task1',
        name: 'Comprar ingredientes para la cena',
        description: 'Comprar pollo, verduras y especias para preparar la cena de esta noche.',
        done: false,
        user_id: 'user123',
        list_id: 'list1',
        updated_at: new Date('2024-11-14T18:30:00Z'),
        created_at: new Date('2024-11-14T15:00:00Z')
    },
    {
        _id: 'task2',
        name: 'Rediseñar la página de inicio',
        description: 'Actualizar el diseño de la página principal del sitio web para mejorar la usabilidad.',
        done: true,
        user_id: 'user456',
        list_id: 'list2',
        updated_at: new Date('2024-11-10T12:45:00Z'),
        created_at: new Date('2024-11-08T09:20:00Z')
    },
    {
        _id: 'task3',
        name: 'Revisar el informe de ventas',
        description: 'Analizar el informe de ventas del último trimestre para preparar la reunión de mañana.',
        done: false,
        user_id: 'user789',
        list_id: 'list3',
        updated_at: new Date('2024-11-13T08:15:00Z'),
        created_at: new Date('2024-11-12T11:00:00Z')
    },
    {
        _id: 'task4',
        name: 'Limpiar el garaje',
        description: 'Organizar las herramientas y desechar los objetos viejos del garaje.',
        done: true,
        user_id: 'user123',
        list_id: 'list4',
        updated_at: new Date('2024-11-12T14:30:00Z'),
        created_at: new Date('2024-11-10T10:00:00Z')
    },
    {
        _id: 'task5',
        name: 'Estudiar para el examen de inglés',
        description: 'Revisar las lecciones del curso y practicar vocabulario para el examen.',
        done: false,
        user_id: 'user456',
        list_id: 'list2',
        updated_at: new Date('2024-11-14T17:00:00Z'),
        created_at: new Date('2024-11-12T16:00:00Z')
    }
];