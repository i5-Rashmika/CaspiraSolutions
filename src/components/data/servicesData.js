import { AI, Design, Software, Stack, MessageIcon } from "../common/Icons.jsx";

export const servicesData = {
    title: "OUR SERVICES",
    description: "A structured range of digital services focused on systems, design, and operational support.",
};

// 5 major services: name + icon for tabs; content for each tab
export const servicesList = [
    {
        name: "Customer Support & User Operations",
        icon: <MessageIcon />,
        description: "Build and manage scalable, multi-channel customer support systems that enhance user experience and service efficiency.",
        features: [
            { title: "Multi-channel support solutions (live chat, email, messaging platforms)" },
            { title: "Customer support workflows, SOPs, and escalation processes" },
            { title: "Service quality monitoring and performance reporting" },
            { title: "Shift scheduling, handover processes, and operational coordination" },
        ],
    },
    {
        name: "UI / UX Design",
        icon: <Design />,
        description: "Design intuitive and user-centered digital experiences that simplify complex systems.",
        features: [
            { title: "User journey mapping and behavior analysis" },
            { title: "Information architecture and product structure design" },
            { title: "UI design systems and component libraries" },
            { title: "Figma-based design delivery with developer-ready specifications" },
        ],
    },
    {
        name: "AI Knowledge Base & Intelligent Assistant Training",
        icon: <AI />,
        description: "Transform company knowledge into intelligent AI-powered assistants for customer support and internal operations.",
        features: [
            { title: "Enterprise knowledge base setup (FAQs, workflows, documentation)" },
            { title: "AI answer training and intent classification" },
            { title: "Response boundary design and safety control" },
            { title: "Deployment of AI assistants on websites and internal platforms" },
        ],
    },
    {
        name: "Web & Internal System Development",
        icon: <Software />,
        description: "Develop secure, scalable websites and internal systems tailored to business needs.",
        features: [
            { title: "Corporate websites and multi-language platforms" },
            { title: "Internal management systems and role-based access control" },
            { title: "Data management, logs, and reporting systems" },
            { title: "Secure cloud deployment and system maintenance" },
        ],
    },
    {
        name: "Business Operations & Workflow Optimization",
        icon: <Stack />,
        description: "Improve operational stability and efficiency through structured workflows and automation.",
        features: [
            { title: "Business process analysis and SOP design" },
            { title: "Team collaboration and task management systems" },
            { title: "Operational data analysis and visualization" },
            { title: "Automation tools to reduce manual workload" },
        ],
    },
];

export const categories = [
    // Final categories (approved)
    "All Work",
    "UI / UX Design",
    "Websites",
    "AI",
    "Customer Support",
    "Brand Design",
];

/** All Work 筛选意图说明（默认视图下分类栏下方一行） */
export const allWorkDescription = "A curated selection of our most impactful design and system work.";

/** 单分类视图时，显示在分类下方、卡片上方的极简说明（灰字） */
export const categoryDescriptions = {
    "UI / UX Design": "Selected interface projects focusing on usability, structure, and clarity.",
    Websites: "Selected corporate website interfaces designed for structure, performance, and scalability.",
    AI: "Selected AI interface and tool design projects for workflow support.",
    "Customer Support": "Selected customer support interfaces and operational tools designed for efficient user assistance.",
    "Brand Design": "Selected brand and visual design assets created for consistency and recognition.",
};

export const portfolioItems = [
    {
        id: 1,
        title: "Corporate Website Interfaces",
        shortDesc: "High-performance websites for fintech & enterprise products",
        img: "/images/png/ui.png",
        category: "Websites",
    },
    {
        id: 2,
        title: "Product Interface Design",
        shortDesc: "Mobile & web interfaces focused on usability and conversion",
        img: "/images/png/2.png",
        category: "UI / UX Design",
    },
    {
        id: 4,
        title: "AI Interface & Tool Design",
        shortDesc: "Operational dashboards and AI-driven workflow tools",
        img: "/images/png/4.png",
        category: "AI",
    },
    {
        id: 6,
        title: "Customer Support Interfaces",
        shortDesc: "Support systems and interfaces focused on efficiency, response speed, and user trust",
        img: "/images/png/6.png",
        category: "Customer Support",
    },
    {
        id: 5,
        title: "Brand & Visual Design Assets",
        shortDesc: "Visual systems and brand assets created for consistency, recognition, and long-term identity.",
        img: "/images/png/5.png",
        category: "Brand Design",
    },
];

export const products = [
    {
        title: "Caspira Enterprise Platform",
        img: "/images/png/caspira-nav1.webp",
        shortDesc: "Internal management platform for communication, task coordination, and operational visibility.",
        ctas: [
            { label: "View Overview", href: "#" },
            { label: "Request Demo", href: "#" },
        ],
    },
    {
        title: "Operations Dashboard",
        img: "/images/png/caspira-nav2.webp",
        shortDesc: "System dashboards designed for monitoring workflows, performance, and team activities.",
        ctas: [
            { label: "View Overview", href: "#" },
        ],
    },
    {
        title: "Customer Support Platform",
        img: "/images/png/caspira-nav 3.webp",
        shortDesc: "Integrated support interfaces for managing user communication and service workflows.",
        ctas: [
            { label: "Learn More", href: "#" },
        ],
    },
];
