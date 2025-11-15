import { MenuItem, ContentItem, MenuContent } from './types';

// Main menu items arranged in circle formation
export const MAIN_MENU_ITEMS: MenuItem[] = [
  {
    id: 'emergency',
    title: 'Emergency',
    icon: 'AlertCircle',
    color: '#ff4757',
    borderColor: '#c0392b',
    angle: 0, // 12 o'clock
  },
  {
    id: 'connect',
    title: 'Connect',
    icon: 'Users',
    color: '#3742fa',
    borderColor: '#2c2c54',
    angle: 45, // 1:30 position
  },
  {
    id: 'services',
    title: 'Services',
    icon: 'Wrench',
    color: '#a55eea',
    borderColor: '#8854d0',
    angle: 90, // 3 o'clock
  },
  {
    id: 'activities',
    title: 'Activities',
    icon: 'Calendar',
    color: '#26de81',
    borderColor: '#20bf6b',
    angle: 135, // 4:30 position
  },
  {
    id: 'jobs',
    title: 'Jobs',
    icon: 'Briefcase',
    color: '#fd9644',
    borderColor: '#e17055',
    angle: 180, // 6 o'clock
  },
  {
    id: 'schedule',
    title: 'Schedule',
    icon: 'Clock',
    color: '#f368e0',
    borderColor: '#e84393',
    angle: 225, // 7:30 position
  },
  {
    id: 'messages',
    title: 'Messages',
    icon: 'MessageCircle',
    color: '#45b7d1',
    borderColor: '#0984e3',
    angle: 270, // 9 o'clock
  },
  {
    id: 'more',
    title: 'More',
    icon: 'MoreHorizontal',
    color: '#778ca3',
    borderColor: '#57606f',
    angle: 315, // 10:30 position
  },
];

// More submenu items
export const MORE_MENU_ITEMS: MenuItem[] = [
  {
    id: 'onboarding',
    title: 'Onboarding',
    icon: 'Plane',
    color: '#95e1d3',
    borderColor: '#26a69a',
    angle: 0,
    isSubmenu: true,
  },
  {
    id: 'market',
    title: 'Market',
    icon: 'ShoppingBag',
    color: '#ff6b6b',
    borderColor: '#ee5a52',
    angle: 60,
    isSubmenu: true,
  },
  {
    id: 'learn',
    title: 'Learn',
    icon: 'GraduationCap',
    color: '#4ecdc4',
    borderColor: '#26a69a',
    angle: 120,
    isSubmenu: true,
  },
  {
    id: 'finance',
    title: 'Finance',
    icon: 'DollarSign',
    color: '#45b7d1',
    borderColor: '#3498db',
    angle: 180,
    isSubmenu: true,
  },
  {
    id: 'media',
    title: 'Media',
    icon: 'PlayCircle',
    color: '#f9ca24',
    borderColor: '#f39c12',
    angle: 240,
    isSubmenu: true,
  },
  {
    id: 'apps',
    title: 'Apps',
    icon: 'Grid3x3',
    color: '#6c5ce7',
    borderColor: '#5f3dc4',
    angle: 300,
    isSubmenu: true,
  },
];

// Content data for each menu item
export const MENU_CONTENT: MenuContent = {
  emergency: [
    {
      icon: 'Phone',
      title: 'Call 911',
      description: 'Emergency services',
    },
    {
      icon: 'Heart',
      title: 'Urgent Care',
      description: 'Immediate medical attention',
    },
    {
      icon: 'AlertTriangle',
      title: 'Poison Control',
      description: '1-800-222-1222',
    },
    {
      icon: 'Stethoscope',
      title: 'Nurse Line',
      description: '24/7 medical advice',
    },
  ],
  connect: [
    {
      icon: 'MessageCircle',
      title: 'Chat Support',
      description: 'Get help and support',
    },
    {
      icon: 'Users',
      title: 'Neighbors',
      description: '12 online',
    },
    {
      icon: 'Users2',
      title: 'Groups',
      description: 'Join community groups',
    },
    {
      icon: 'Baby',
      title: 'Playdates',
      description: 'Schedule playdates',
    },
    {
      icon: 'Coffee',
      title: 'Meetups',
      description: 'Local parent meetups',
    },
  ],
  services: [
    {
      icon: 'Sparkles',
      title: 'Cleaning',
      description: 'House cleaning services',
    },
    {
      icon: 'Car',
      title: 'Transport',
      description: 'Rides and delivery',
    },
    {
      icon: 'UtensilsCrossed',
      title: 'Meals',
      description: 'Meal preparation',
    },
    {
      icon: 'BookOpen',
      title: 'Tutoring',
      description: 'Educational support',
    },
  ],
  activities: [
    {
      icon: 'Palette',
      title: 'Art',
      description: 'Creative activities',
      time: 'Today 3PM',
    },
    {
      icon: 'Trees',
      title: 'Park',
      description: 'Outdoor play',
      time: 'Sat 10AM',
    },
    {
      icon: 'Book',
      title: 'Story',
      description: 'Story time',
      time: 'Wed 11AM',
    },
    {
      icon: 'Music',
      title: 'Music',
      description: 'Music class',
      time: 'Fri 2PM',
    },
  ],
  jobs: [
    {
      icon: 'Plus',
      title: 'Post Job',
      description: 'Create a new job posting',
    },
    {
      icon: 'Search',
      title: 'Browse',
      description: '28 available',
    },
    {
      icon: 'Shield',
      title: 'Verify',
      description: 'Background checks',
    },
    {
      icon: 'FileText',
      title: 'Contracts',
      description: 'Manage agreements',
    },
  ],
  schedule: [
    {
      icon: 'GraduationCap',
      title: '9AM School',
      description: 'Drop-off at Elementary',
      time: '9:00 AM',
    },
    {
      icon: 'Stethoscope',
      title: '2PM Doctor',
      description: 'Pediatrician appointment',
      time: '2:00 PM',
    },
    {
      icon: 'Zap',
      title: '3:30PM Soccer',
      description: 'Practice at field #2',
      time: '3:30 PM',
    },
    {
      icon: 'UtensilsCrossed',
      title: '6PM Dinner',
      description: 'Family dinner time',
      time: '6:00 PM',
    },
  ],
  messages: [
    {
      icon: 'User',
      title: 'Emma',
      description: 'On my way',
    },
    {
      icon: 'Users',
      title: 'Group',
      description: 'New message',
    },
    {
      icon: 'Building',
      title: 'Agency',
      description: 'Confirmed',
    },
    {
      icon: 'PenTool',
      title: 'Compose',
      description: 'New message',
    },
  ],
  // More submenu items - all show "Coming Soon"
  onboarding: [
    {
      icon: 'User',
      title: 'Welcome Tour',
      description: 'Take a guided tour',
    },
    {
      icon: 'BookOpen',
      title: 'Getting Started',
      description: 'Basic setup guide',
    },
    {
      icon: 'Users',
      title: 'Connect Neighbors',
      description: 'Find your community',
    },
    {
      icon: 'Shield',
      title: 'Safety Tips',
      description: 'Stay safe online',
    },
  ],
  market: [
    {
      icon: 'ShoppingBag',
      title: 'Coming Soon',
      description: 'Marketplace features',
    },
  ],
  learn: [
    {
      icon: 'GraduationCap',
      title: 'Coming Soon',
      description: 'Learning resources',
    },
  ],
  finance: [
    {
      icon: 'DollarSign',
      title: 'Coming Soon',
      description: 'Financial tools',
    },
  ],
  media: [
    {
      icon: 'PlayCircle',
      title: 'Coming Soon',
      description: 'Media library',
    },
  ],
  apps: [
    {
      icon: 'Grid3x3',
      title: 'Coming Soon',
      description: 'Third-party apps',
    },
  ],
};

// Animation constants
export const ANIMATION_DURATION = 0.3;
export const STAGGER_DELAY = 0.05;
export const MENU_RADIUS = 140; // Menu buttons positioned at 280px diameter circle
export const CENTER_BUTTON_SIZE = 100; // Base size - CSS will handle responsiveness
export const MENU_BUTTON_SIZE = 75; // Larger menu buttons (75px diameter)