import { List } from "../Entity/list";

export const LISTS_ADATA_MOCK: List[] = [
    {
        id: 'list1',
        name: 'Compras Semanales',
        color: '#8FD4AF',
        tasks: [],
        user_id: 'user123',
        updated_at: new Date('2024-11-14T18:30:00Z'),
        created_at: new Date('2024-11-12T09:00:00Z')
    },
    {
        id: 'list2',
        name: 'Proyecto Rediseño Web',
        color: '#918FD4',
        tasks: [],
        user_id: 'user456',
        updated_at: new Date('2024-11-13T12:45:00Z'),
        created_at: new Date('2024-11-11T10:20:00Z')
    },
    {
        id: 'list3',
        name: 'Tareas del Hogar',
        color: '#D48F8F',
        tasks: [],
        user_id: 'user789',
        updated_at: new Date('2024-11-12T08:15:00Z'),
        created_at: new Date('2024-11-10T14:00:00Z')
    },
    {
        id: 'list4',
        name: 'Planificación Financiera',
        color: '#DA4662',
        tasks: [],
        user_id: 'user123',
        updated_at: new Date('2024-11-15T09:30:00Z'),
        created_at: new Date('2024-11-12T13:00:00Z')
    },
    {
        id: 'list5',
        name: 'Estudio y Aprendizaje',
        color: '#6472EF',
        tasks: [],
        user_id: 'user456',
        updated_at: new Date('2024-11-14T17:00:00Z'),
        created_at: new Date('2024-11-13T16:00:00Z')
    }
];