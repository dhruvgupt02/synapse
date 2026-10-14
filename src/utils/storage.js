// LocalStorage management for BRIVIO
import { INITIAL_BRIEFS, INITIAL_DELIVERY_PROJECTS } from '../data/mockData';

const STORAGE_KEYS = {
  BRIEFS: 'synapse_briefs_v1',
  DELIVERY_PROJECTS: 'synapse_delivery_projects_v1',
  USER_ROLE: 'synapse_user_role_v1',
  SAVED_CREATORS: 'synapse_saved_creators_v1',
  PROPOSALS: 'synapse_proposals_v1',
  CUSTOM_RECIPES: 'synapse_custom_recipes_v1',
  LOGGED_IN_CREATOR: 'synapse_logged_in_creator_v1'
};

export const getStoredLoggedInCreator = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGGED_IN_CREATOR);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const saveLoggedInCreatorToStorage = (creator) => {
  try {
    if (!creator) {
      localStorage.removeItem(STORAGE_KEYS.LOGGED_IN_CREATOR);
    } else {
      localStorage.setItem(STORAGE_KEYS.LOGGED_IN_CREATOR, JSON.stringify(creator));
    }
  } catch (e) {
    console.error('Failed to save logged-in creator', e);
  }
};

export const getStoredBriefs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BRIEFS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BRIEFS, JSON.stringify(INITIAL_BRIEFS));
      return INITIAL_BRIEFS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse briefs from storage', e);
    return INITIAL_BRIEFS;
  }
};

export const saveBriefToStorage = (newBrief) => {
  try {
    const current = getStoredBriefs();
    const updated = [newBrief, ...current];
    localStorage.setItem(STORAGE_KEYS.BRIEFS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save brief to storage', e);
    return null;
  }
};

export const getStoredDeliveryProjects = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DELIVERY_PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DELIVERY_PROJECTS, JSON.stringify(INITIAL_DELIVERY_PROJECTS));
      return INITIAL_DELIVERY_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < INITIAL_DELIVERY_PROJECTS.length) {
      localStorage.setItem(STORAGE_KEYS.DELIVERY_PROJECTS, JSON.stringify(INITIAL_DELIVERY_PROJECTS));
      return INITIAL_DELIVERY_PROJECTS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to parse delivery projects from storage', e);
    return INITIAL_DELIVERY_PROJECTS;
  }
};

export const saveDeliveryProjectsToStorage = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DELIVERY_PROJECTS, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save delivery projects', e);
  }
};

export const getStoredUserRole = () => {
  try {
    const role = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return role || 'brand'; // 'brand' | 'creator'
  } catch (e) {
    return 'brand';
  }
};

export const saveUserRoleToStorage = (role) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  } catch (e) {
    console.error('Failed to save role', e);
  }
};

export const getSavedCreators = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_CREATORS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const toggleSaveCreator = (creatorId) => {
  try {
    const current = getSavedCreators();
    let updated;
    if (current.includes(creatorId)) {
      updated = current.filter(id => id !== creatorId);
    } else {
      updated = [...current, creatorId];
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_CREATORS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};
