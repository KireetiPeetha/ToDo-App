import React, { useState, useEffect } from "react";
import { getAllTodos, getAllCategories } from "../api.js";

function Dashboard({ onLogout }) {
    const [todos, setTodos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const [todosData, categoriesData] = await Promise.all([
                    getAllTodos(),
                    getAllCategories(),
                ]);
                setTodos(Array.isArray(todosData) ? todosData : []);
                setCategories(Array.isArray(categoriesData) ? categoriesData : []);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const stats = {
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        pending: todos.filter(t => !t.completed).length,
        important: todos.filter(t => t.is_important).length,
    };

    const filteredTodos = todos.filter(todo => {
        const matchesFilter =
            activeFilter === "all" ? true :
            activeFilter === "completed" ? todo.completed :
            activeFilter === "important" ? todo.is_important :
            activeFilter === "pending" ? !todo.completed :
            todo.category_id === activeFilter;

        const matchesSearch = searchQuery === "" ||
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesFilter && matchesSearch;
    });

    const navItems = [
        { id: "all", label: "Dashboard", icon: "⊞" },
        { id: "pending", label: "My Tasks", icon: "☑" },
        { id: "important", label: "Important", icon: "☆" },
        { id: "completed", label: "Completed", icon: "✓" },
    ];

    const priorityConfig = {
        high: { bg: "#3f1d1d", color: "#f87171", label: "High" },
        medium: { bg: "#3f2d0d", color: "#fb923c", label: "Medium" },
        low: { bg: "#0d2f1a", color: "#4ade80", label: "Low" },
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}>
                    <p style={styles.loadingText}>Loading your tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                {/* Logo */}
                <div style={styles.logoSection}>
                    <div style={styles.logoIcon}>✓</div>
                    <span style={styles.logoText}>Flow</span>
                </div>

                {/* Search */}
                <div style={styles.searchContainer}>
                    <span style={styles.searchIcon}>🔍</span>
                    <input
                        style={styles.searchInput}
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Menu label */}
                <p style={styles.sectionLabel}>MENU</p>

                {/* Nav items */}
                <nav style={styles.nav}>
                    {navItems.map(item => (
                        <div
                            key={item.id}
                            style={{
                                ...styles.navItem,
                                ...(activeFilter === item.id ? styles.navItemActive : {}),
                            }}
                            onClick={() => setActiveFilter(item.id)}
                        >
                            <span style={styles.navIcon}>{item.icon}</span>
                            <span>{item.label}</span>
                            {item.id === "important" && stats.important > 0 && (
                                <span style={styles.badge}>{stats.important}</span>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Projects/Categories */}
                {categories.length > 0 && (
                    <div style={styles.projectsSection}>
                        <p style={styles.sectionLabel}>PROJECTS</p>
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                style={{
                                    ...styles.navItem,
                                    ...(activeFilter === cat.id ? styles.navItemActive : {}),
                                }}
                                onClick={() => setActiveFilter(cat.id)}
                            >
                                <span style={{
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    backgroundColor: cat.color,
                                    display: "inline-block",
                                    flexShrink: 0,
                                }} />
                                <span style={{ flex: 1 }}>{cat.name}</span>
                                <span style={styles.categoryCount}>
                                    {todos.filter(t => t.category_id === cat.id).length}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom section */}
                <div style={styles.sidebarBottom}>
                    <div style={styles.navItem} onClick={onLogout}>
                        <span style={styles.navIcon}>⇦</span>
                        <span>Log out</span>
                    </div>
                    <div style={styles.userCard}>
                        <div style={styles.userAvatar}>K</div>
                        <div>
                            <p style={styles.userName}>Kireeti</p>
                            <p style={styles.userPlan}>Pro plan</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div style={styles.main}>
                {/* Top bar */}
                <div style={styles.topBar}>
                    <div>
                        <h1 style={styles.greeting}>Good morning, Kireeti</h1>
                        <p style={styles.greetingSub}>
                            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                            {stats.pending > 0 && ` · ${stats.pending} tasks pending`}
                        </p>
                    </div>
                </div>

                {/* Stats cards */}
                <div style={styles.statsRow}>
                    {[
    { label: "Total tasks", value: stats.total, color: "#818cf8", iconBg: "#312e81", bg: "#1e1b4b",
      sub: `+${stats.total} this week`,
      subColor: "#34d399",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12l2 2 4-4"/>
        </svg>
      )
    },
    { label: "Completed", value: stats.completed, color: "#34d399", iconBg: "#064e3b", bg: "#022c22",
      sub: stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}% done` : "0% done",
      subColor: "#34d399",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
        </svg>
      )
    },
    { label: "Pending", value: stats.pending, color: "#60a5fa", iconBg: "#1e3a5f", bg: "#0c1a2e",
      sub: stats.pending > 0 ? `${stats.pending} due today` : "All done!",
      subColor: "#60a5fa",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    },
    { label: "Overdue", value: stats.important, color: "#f87171", iconBg: "#4c1d1d", bg: "#1c0404",
      sub: stats.important > 0 ? "Needs attention" : "All clear",
      subColor: "#f87171",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
      )
    },
].map(stat => (
    <div key={stat.label} style={{ ...styles.statCard, backgroundColor: stat.bg }}>
        <div style={styles.statHeader}>
            <div style={{
                width: "36px",
                height: "36px",
                backgroundColor: stat.iconBg,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                {stat.icon}
            </div>
        </div>
        <p style={{ ...styles.statValue, color: stat.color }}>{stat.value}</p>
        <p style={styles.statLabel}>{stat.label}</p>
        {stat.sub && <p style={{ ...styles.statSub, color: stat.subColor }}>{stat.sub}</p>}
    </div>
))}
                </div>

                {/* Filter tabs */}
                <div style={styles.filterTabs}>
                    {["Today", "This week", "This month"].map(tab => (
                        <button key={tab} style={styles.filterTab}>{tab}</button>
                    ))}
                </div>

                {/* Task list */}
                <div style={styles.taskSection}>
                    <div style={styles.taskSectionHeader}>
                        <h2 style={styles.taskSectionTitle}>
                            {activeFilter === "all" ? "All Tasks" :
                             activeFilter === "pending" ? "My Tasks" :
                             activeFilter === "important" ? "Important" :
                             activeFilter === "completed" ? "Completed" :
                             categories.find(c => c.id === activeFilter)?.name || "Tasks"}
                        </h2>
                        <span style={styles.taskCount}>{filteredTodos.length}</span>
                    </div>

                    {filteredTodos.length === 0 ? (
                        <div style={styles.emptyState}>
                            <p style={styles.emptyIcon}>📋</p>
                            <p style={styles.emptyTitle}>You're all caught up!</p>
                            <p style={styles.emptyText}>No tasks in this view</p>
                        </div>
                    ) : (
                        filteredTodos.map(todo => (
                            <div key={todo.id} style={{
                                ...styles.taskCard,
                                opacity: todo.completed ? 0.6 : 1,
                            }}>
                                <div style={styles.taskLeft}>
                                    <div style={{
                                        ...styles.checkbox,
                                        backgroundColor: todo.completed ? "#6366f1" : "transparent",
                                        borderColor: todo.completed ? "#6366f1" : "#475569",
                                    }}>
                                        {todo.completed && <span style={styles.checkmark}>✓</span>}
                                    </div>
                                    <div style={styles.taskInfo}>
                                        <p style={{
                                            ...styles.taskTitle,
                                            textDecoration: todo.completed ? "line-through" : "none",
                                            color: todo.completed ? "#475569" : "#e2e8f0",
                                        }}>{todo.title}</p>
                                        {todo.description && (
                                            <p style={styles.taskDesc}>{todo.description}</p>
                                        )}
                                        <div style={styles.taskMeta}>
                                            {todo.due_date && (
                                                <span style={styles.taskMetaItem}>
                                                    📅 {todo.due_date}
                                                </span>
                                            )}
                                            {todo.reminder && (
                                                <span style={styles.taskMetaItem}>🔔</span>
                                            )}
                                            {todo.is_important && (
                                                <span style={{ ...styles.taskMetaItem, color: "#fbbf24" }}>⭐</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div style={styles.taskRight}>
                                    {todo.priority && priorityConfig[todo.priority] && (
                                        <span style={{
                                            ...styles.priorityBadge,
                                            backgroundColor: priorityConfig[todo.priority].bg,
                                            color: priorityConfig[todo.priority].color,
                                        }}>
                                            {priorityConfig[todo.priority].label}
                                        </span>
                                    )}
                                    {todo.category_id && categories.find(c => c.id === todo.category_id) && (
                                        <span style={{
                                            ...styles.categoryChip,
                                            backgroundColor: categories.find(c => c.id === todo.category_id)?.color + "22",
                                            color: categories.find(c => c.id === todo.category_id)?.color,
                                        }}>
                                            {categories.find(c => c.id === todo.category_id)?.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    loadingContainer: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
    },
    loadingText: {
        color: "#94a3b8",
        fontSize: "16px",
    },
    container: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#111827",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    sidebar: {
        width: "248px",
        backgroundColor: "#111827",
        borderRight: "1px solid #1f2937",
        padding: "20px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        flexShrink: 0,
    },
    logoSection: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 12px",
        marginBottom: "16px",
    },
    logoIcon: {
        width: "28px",
        height: "28px",
        backgroundColor: "#4f46e5",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "700",
        fontSize: "14px",
    },
    logoText: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#f9fafb",
    },
    searchContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#1f2937",
        borderRadius: "8px",
        padding: "8px 12px",
        marginBottom: "20px",
    },
    searchIcon: {
        fontSize: "13px",
        opacity: 0.5,
    },
    searchInput: {
        background: "none",
        border: "none",
        outline: "none",
        color: "#9ca3af",
        fontSize: "13px",
        width: "100%",
    },
    sectionLabel: {
        fontSize: "11px",
        fontWeight: "600",
        color: "#4b5563",
        letterSpacing: "0.08em",
        padding: "0 12px",
        marginBottom: "4px",
        marginTop: "8px",
    },
    nav: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
    },
    navItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "9px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        color: "#6b7280",
        fontSize: "14px",
        position: "relative",
    },
    navItemActive: {
        backgroundColor: "#1f2937",
        color: "#f9fafb",
    },
    navIcon: {
        fontSize: "16px",
        width: "20px",
        textAlign: "center",
    },
    badge: {
        marginLeft: "auto",
        backgroundColor: "#ef4444",
        color: "white",
        fontSize: "11px",
        fontWeight: "600",
        padding: "2px 7px",
        borderRadius: "20px",
    },
    projectsSection: {
        marginTop: "8px",
    },
    categoryCount: {
        marginLeft: "auto",
        color: "#4b5563",
        fontSize: "12px",
    },
    sidebarBottom: {
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    userCard: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        borderRadius: "8px",
        marginTop: "4px",
        borderTop: "1px solid #1f2937",
        paddingTop: "14px",
    },
    userAvatar: {
        width: "32px",
        height: "32px",
        backgroundColor: "#4f46e5",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "700",
        fontSize: "14px",
        flexShrink: 0,
    },
    userName: {
        color: "#f9fafb",
        fontSize: "13px",
        fontWeight: "600",
    },
    userPlan: {
        color: "#6b7280",
        fontSize: "11px",
    },
    main: {
        flex: 1,
        padding: "28px 36px",
        overflowY: "auto",
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "28px",
    },
    greeting: {
        fontSize: "22px",
        fontWeight: "700",
        color: "#f9fafb",
        marginBottom: "4px",
    },
    greetingSub: {
        fontSize: "13px",
        color: "#6b7280",
    },
    statsRow: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginBottom: "28px",
    },
    statCard: {
        borderRadius: "14px",
        padding: "20px",
        border: "1px solid #1f2937",
    },
    statHeader: {
        marginBottom: "12px",
    },
    statIcon: {
        fontSize: "20px",
    },
    statValue: {
        fontSize: "36px",
        fontWeight: "700",
        lineHeight: 1,
        marginBottom: "4px",
    },
    statLabel: {
        fontSize: "13px",
        color: "#9ca3af",
        marginBottom: "4px",
    },
    statSub: {
        fontSize: "12px",
        fontWeight: "500",
    },
    filterTabs: {
        display: "flex",
        gap: "8px",
        marginBottom: "20px",
    },
    filterTab: {
        padding: "7px 16px",
        borderRadius: "8px",
        border: "1px solid #1f2937",
        backgroundColor: "transparent",
        color: "#6b7280",
        fontSize: "13px",
        cursor: "pointer",
    },
    taskSection: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    taskSectionHeader: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "8px",
    },
    taskSectionTitle: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#f9fafb",
    },
    taskCount: {
        backgroundColor: "#1f2937",
        color: "#6b7280",
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "20px",
    },
    emptyState: {
        textAlign: "center",
        padding: "60px 0",
    },
    emptyIcon: {
        fontSize: "40px",
        marginBottom: "12px",
    },
    emptyTitle: {
        color: "#f9fafb",
        fontSize: "16px",
        fontWeight: "600",
        marginBottom: "4px",
    },
    emptyText: {
        color: "#6b7280",
        fontSize: "13px",
    },
    taskCard: {
        backgroundColor: "#1f2937",
        borderRadius: "12px",
        padding: "14px 18px",
        border: "1px solid #374151",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
    },
    taskLeft: {
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        flex: 1,
    },
    checkbox: {
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: "2px solid #4b5563",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2px",
    },
    checkmark: {
        color: "white",
        fontSize: "11px",
        fontWeight: "700",
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        fontSize: "14px",
        fontWeight: "500",
        marginBottom: "3px",
    },
    taskDesc: {
        color: "#6b7280",
        fontSize: "12px",
        marginBottom: "6px",
    },
    taskMeta: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    taskMetaItem: {
        fontSize: "12px",
        color: "#4b5563",
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
    taskRight: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexShrink: 0,
    },
    priorityBadge: {
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "500",
    },
    categoryChip: {
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "500",
    },
};

export default Dashboard;