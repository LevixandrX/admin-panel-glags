export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    users: "Users",
    warehouse: "Warehouse",
    adminManagement: "Admin Management",
    modules: "Modules",
    templates: "Templates",
    products: "Products",
    orders: "Orders",
    analytics: "Analytics",
    messages: "Messages",
    calendar: "Calendar",
    reports: "Reports",
    security: "Security",
    settings: "Settings",

    // Common
    search: "Search",
    filter: "Filter",
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    actions: "Actions",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    loading: "Loading...",
    welcome: "Welcome back!",

    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "Welcome back! Here's what's happening with your business today.",
    totalUsers: "Total Users",
    revenue: "Revenue",
    orders: "Orders",
    growth: "Growth",
    recentActivity: "Recent Activity",
    quickActions: "Quick Actions",

    // Users
    usersTitle: "Users",
    usersSubtitle: "Manage your users and their permissions",
    addUser: "Add User",
    userManagement: "User Management",

    // Warehouse
    warehouseTitle: "Warehouse Management",
    warehouseSubtitle: "Track and manage your inventory items",
    addItem: "Add Item",
    totalItems: "Total Items",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",
    categories: "Categories",

    // Login
    loginTitle: "Admin Panel Pro",
    loginSubtitle: "Sign in to access your dashboard",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    signingIn: "Signing in...",

    // Profile
    profile: "Profile",
    logout: "Log out",

    // Buttons
    createNew: "Create New",
    viewAll: "View All",
    exportData: "Export Data",
    importData: "Import Data",
    refresh: "Refresh",
  },
  ru: {
    // Navigation
    dashboard: "Панель управления",
    users: "Пользователи",
    warehouse: "Склад",
    adminManagement: "Управление админами",
    modules: "Модули",
    templates: "Шаблоны",
    products: "Товары",
    orders: "Заказы",
    analytics: "Аналитика",
    messages: "Сообщения",
    calendar: "Календарь",
    reports: "Отчеты",
    security: "Безопасность",
    settings: "Настройки",

    // Common
    search: "Поиск",
    filter: "Фильтр",
    add: "Добавить",
    edit: "Редактировать",
    delete: "Удалить",
    save: "Сохранить",
    cancel: "Отмена",
    actions: "Действия",
    status: "Статус",
    active: "Активный",
    inactive: "Неактивный",
    loading: "Загрузка...",
    welcome: "Добро пожаловать!",

    // Dashboard
    dashboardTitle: "Панель управления",
    dashboardSubtitle: "Добро пожаловать! Вот что происходит с вашим бизнесом сегодня.",
    totalUsers: "Всего пользователей",
    revenue: "Доход",
    orders: "Заказы",
    growth: "Рост",
    recentActivity: "Последняя активность",
    quickActions: "Быстрые действия",

    // Users
    usersTitle: "Пользователи",
    usersSubtitle: "Управляйте пользователями и их разрешениями",
    addUser: "Добавить пользователя",
    userManagement: "Управление пользователями",

    // Warehouse
    warehouseTitle: "Управление складом",
    warehouseSubtitle: "Отслеживайте и управляйте товарами на складе",
    addItem: "Добавить товар",
    totalItems: "Всего товаров",
    lowStock: "Мало на складе",
    outOfStock: "Нет в наличии",
    categories: "Категории",

    // Login
    loginTitle: "Glags Админ Панель",
    loginSubtitle: "Войдите для доступа к панели управления",
    email: "Электронная почта",
    password: "Пароль",
    signIn: "Войти",
    signingIn: "Вход...",

    // Profile
    profile: "Профиль",
    logout: "Выйти",

    // Buttons
    createNew: "Создать новый",
    viewAll: "Показать все",
    exportData: "Экспорт данных",
    importData: "Импорт данных",
    refresh: "Обновить",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
