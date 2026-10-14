// Client-side API integration for SYNAPSE India Backend
import { INITIAL_CREATORS, INITIAL_BRIEFS, INITIAL_DELIVERY_PROJECTS } from '../data/mockData';

const API_BASE = '/api';

export const checkBackendHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Backend health check failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, operating in offline fallback mode:', err);
    return null;
  }
};

export const fetchCreators = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/creators?${query}`);
    if (!res.ok) throw new Error('Failed to fetch creators');
    const json = await res.json();
    return json.data || INITIAL_CREATORS;
  } catch (err) {
    return INITIAL_CREATORS;
  }
};

export const registerCreatorAPI = async (creatorData) => {
  try {
    const res = await fetch(`${API_BASE}/creators`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creatorData)
    });
    if (!res.ok) throw new Error('Failed to register creator on server');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Server registration fallback to local state:', err);
    return creatorData;
  }
};

export const fetchBriefs = async () => {
  try {
    const res = await fetch(`${API_BASE}/briefs`);
    if (!res.ok) throw new Error('Failed to fetch briefs');
    const json = await res.json();
    return json.data || INITIAL_BRIEFS;
  } catch (err) {
    return INITIAL_BRIEFS;
  }
};

export const createBrief = async (briefData) => {
  try {
    const res = await fetch(`${API_BASE}/briefs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(briefData)
    });
    if (!res.ok) throw new Error('Failed to create brief on server');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Server save failed, using local brief fallback:', err);
    return briefData;
  }
};

export const submitPitch = async (briefId, pitchData) => {
  try {
    const res = await fetch(`${API_BASE}/briefs/${briefId}/pitch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pitchData)
    });
    return await res.json();
  } catch (err) {
    return { success: true, localOnly: true };
  }
};

export const fetchDeliveryProjects = async () => {
  try {
    const res = await fetch(`${API_BASE}/delivery-projects`);
    if (!res.ok) throw new Error('Failed to fetch delivery projects');
    const json = await res.json();
    return json.data || INITIAL_DELIVERY_PROJECTS;
  } catch (err) {
    return INITIAL_DELIVERY_PROJECTS;
  }
};

export const addFeedbackPin = async (projectId, pinData) => {
  try {
    const res = await fetch(`${API_BASE}/delivery-projects/${projectId}/pins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pinData)
    });
    return await res.json();
  } catch (err) {
    return { data: pinData };
  }
};

export const approveMilestoneAPI = async (projectId) => {
  try {
    const res = await fetch(`${API_BASE}/delivery-projects/${projectId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return await res.json();
  } catch (err) {
    return { success: true };
  }
};

export const deconstructBriefAI = async (concept, brand) => {
  try {
    const res = await fetch(`${API_BASE}/ai/deconstruct-brief`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concept, brand })
    });
    if (!res.ok) throw new Error('Deconstruct API failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend deconstruct failed, falling back to local generator:', err);
    return null;
  }
};

export const getApiKeysStatus = async () => {
  try {
    const res = await fetch(`${API_BASE}/settings/keys`);
    if (!res.ok) throw new Error('Keys status fetch failed');
    return await res.json();
  } catch (err) {
    return { hasGeminiKey: false, hasOpenaiKey: false };
  }
};

export const saveApiKeys = async ({ geminiKey, openaiKey }) => {
  try {
    const res = await fetch(`${API_BASE}/settings/keys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ geminiKey, openaiKey })
    });
    return await res.json();
  } catch (err) {
    return { error: 'Failed to update keys' };
  }
};
