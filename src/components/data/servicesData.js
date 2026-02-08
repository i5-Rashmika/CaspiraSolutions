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
        description: "Tailored corporate websites built for fintech and enterprise clients, emphasizing speed, clarity, and trust. Each interface is designed to communicate brand authority while delivering seamless navigation and conversion-focused layouts across all devices.",
        features: [
            "Responsive Multi-page Layouts",
            "SEO-optimized Structure",
            "Performance-first Architecture",
            "Multi-language Support",
        ],
        ctas: [
            { label: "View Overview", href: "#" },
            { label: "Request Demo", href: "#" },
        ],
        img: "/images/png/ui.png",
        category: "Websites",
    },
    {
        id: 2,
        title: "Product Interface Design",
        shortDesc: "Mobile & web interfaces focused on usability and conversion",
        description: "End-to-end product interface design for mobile and web applications, prioritizing intuitive user flows, accessible patterns, and high conversion rates. Every screen is crafted with a user-centered approach backed by research and iterative testing.",
        features: [
            "User Journey Mapping",
            "Component-based Design Systems",
            "Interactive Prototyping",
            "Accessibility Compliance",
        ],
        ctas: [
            { label: "View Overview", href: "#" },
        ],
        img: "/images/png/2.png",
        category: "UI / UX Design",
    },
    {
        id: 4,
        title: "AI Interface & Tool Design",
        shortDesc: "Operational dashboards and AI-driven workflow tools",
        description: "Intelligent interfaces that bring AI capabilities to the forefront of daily operations. From knowledge-base assistants to automated workflow dashboards, these tools are designed to reduce complexity and surface actionable insights in real time.",
        features: [
            "AI-powered Dashboard Layouts",
            "Natural Language Query Interfaces",
            "Real-time Data Visualization",
            "Workflow Automation Controls",
        ],
        ctas: [
            { label: "View Overview", href: "#" },
            { label: "Request Demo", href: "#" },
        ],
        img: "/images/png/4.png",
        category: "AI",
    },
    {
        id: 6,
        title: "Customer Support Interfaces",
        shortDesc: "Support systems and interfaces focused on efficiency, response speed, and user trust",
        description: "Purpose-built support interfaces that streamline agent workflows and elevate the end-user experience. Designed for speed and clarity, these systems handle multi-channel communication, ticket routing, and performance tracking under one unified view.",
        features: [
            "Multi-channel Inbox Design",
            "Ticket Lifecycle Management",
            "Agent Performance Dashboards",
            "Automated Escalation Flows",
        ],
        ctas: [
            { label: "Learn More", href: "#" },
        ],
        img: "/images/png/6.png",
        category: "Customer Support",
    },
    {
        id: 5,
        title: "Brand & Visual Design Assets",
        shortDesc: "Visual systems and brand assets created for consistency, recognition, and long-term identity.",
        description: "Comprehensive brand identity systems and visual design assets crafted for long-term consistency and market recognition. From logo systems to color palettes and typography guides, every element is built to scale across digital and print touchpoints.",
        features: [
            "Logo & Identity Systems",
            "Brand Style Guidelines",
            "Marketing Collateral Design",
            "Digital Asset Libraries",
        ],
        ctas: [
            { label: "View Overview", href: "#" },
        ],
        img: "/images/png/5.png",
        category: "Brand Design",
    },
];

export const products = [
    {
        title: "Caspira Enterprise Platform",
        img: "/images/png/caspira-nav1.webp",
        shortDesc: "Internal management platform for communication, task coordination, and operational visibility.",
        description: "A centralized hub designed to unify team communication, task tracking, and operational oversight into one seamless interface. Built for organizations that need structured workflows without the overhead of fragmented tools, Caspira brings clarity to daily operations and enables teams to collaborate effectively across departments.",
        features: [
            "Task Management & Assignment",
            "Team Communication Hub",
            "Real-time Operational Dashboards",
            "Role-based Access Control",
        ],
        ctas: [
            { label: "View Overview", href: "#" },
            { label: "Request Demo", href: "#" },
        ],
    },
    {
        title: "Operations Dashboard",
        img: "/images/png/caspira-nav2.webp",
        shortDesc: "System dashboards designed for monitoring workflows, performance, and team activities.",
        description: "A comprehensive monitoring interface that gives managers and team leads a real-time view of system health, team performance, and workflow progress. Designed for data-driven decision making, the dashboard consolidates key metrics into clear, actionable visualizations that reduce response time and improve operational efficiency.",
        features: [
            "Real-time Performance Metrics",
            "Workflow Progress Tracking",
            "Team Activity Monitoring",
            "Custom Report Generation",
        ],
        ctas: [
            { label: "View Overview", href: "#" },
        ],
    },
    {
        title: "Customer Support Platform",
        img: "/images/png/caspira-nav3.webp",
        shortDesc: "Integrated support interfaces for managing user communication and service workflows.",
        description: "An integrated support system that streamlines multi-channel user communication and service management. From ticket creation to resolution tracking, this platform equips support teams with the tools they need to deliver fast, consistent, and personalized assistance at scale.",
        features: [
            "Multi-channel Ticket Management",
            "Automated Routing & Escalation",
            "Customer Interaction History",
            "Service Analytics & Reporting",
        ],
        ctas: [
            { label: "Learn More", href: "#" },
        ],
    },
];
