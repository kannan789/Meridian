export type ProjectStatus = 'planning' | 'in_progress' | 'client_review' | 'qa_testing' | 'shipped';
export type ProjectPriority = 'urgent' | 'high' | 'normal';
export type FeedbackCategory = 'design' | 'copy' | 'functionality' | 'scope_question';
export type FeedbackStatus = 'open' | 'in_progress' | 'resolved';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  timezone: string;
  utcOffset: number; // e.g. -7, 0, +1, +8
  status: 'active' | 'in_call' | 'away' | 'focus';
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface ProjectDeliverable {
  id: string;
  title: string;
  type: 'design_mockup' | 'staging_url' | 'component_library' | 'api_docs';
  previewUrl?: string;
  version: string;
  lastUpdated: string;
}

export interface FeedbackComment {
  id: string;
  authorName: string;
  authorRole: 'client' | 'agency_lead' | 'designer' | 'engineer';
  authorAvatar: string;
  timestamp: string;
  content: string;
}

export interface FeedbackPin {
  id: string;
  projectId: string;
  xPercent: number; // 0-100% position on deliverable canvas
  yPercent: number; // 0-100% position
  title: string;
  category: FeedbackCategory;
  priority: 'low' | 'medium' | 'high';
  status: FeedbackStatus;
  authorName: string;
  authorRole: 'client' | 'agency';
  createdAt: string;
  comments: FeedbackComment[];
}

export interface Project {
  id: string;
  title: string;
  clientName: string;
  clientCountry: string;
  clientCountryCode: string;
  clientLogoText: string;
  industry: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progressPercent: number;
  startDate: string;
  targetLaunchDate: string;
  budgetFormatted: string;
  spentFormatted: string;
  assignedTeam: TeamMember[];
  milestones: Milestone[];
  deliverables: ProjectDeliverable[];
  feedbackCount: {
    total: number;
    open: number;
    resolved: number;
  };
  summary: string;
  stackTags: string[];
}

export interface GlobalHub {
  city: string;
  country: string;
  timezoneName: string;
  utcOffset: number;
  activeCount: number;
  focalDiscipline: string;
}

export interface QuoteInquiry {
  id: string;
  createdAt: string;
  clientName: string;
  companyName: string;
  email: string;
  projectType: string;
  timeline: string;
  estimatedBudget: string;
  selectedAddons: string[];
  description: string;
  preferredTimezone: string;
}
