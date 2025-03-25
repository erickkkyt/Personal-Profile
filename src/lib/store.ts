import { create } from 'zustand';

// 主题状态管理
interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  },
}));

// 工具栈过滤状态管理
interface ToolsFilterState {
  category: string;
  proficiency: number;
  setCategory: (category: string) => void;
  setProficiency: (proficiency: number) => void;
  resetFilters: () => void;
}

export const useToolsFilterStore = create<ToolsFilterState>((set) => ({
  category: '',
  proficiency: 0,
  setCategory: (category) => {
    console.log('Store: setting category to:', category); // 添加调试日志
    set({ category });
  },
  setProficiency: (proficiency) => set({ proficiency }),
  resetFilters: () => set({ category: '', proficiency: 0 }),
}));

// 博客状态管理
interface BlogState {
  currentPage: number;
  searchQuery: string;
  selectedTags: string[];
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  currentPage: 1,
  searchQuery: '',
  selectedTags: [],
  setCurrentPage: (page) => set({ currentPage: page }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addTag: (tag) => set((state) => ({ 
    selectedTags: state.selectedTags.includes(tag) 
      ? state.selectedTags 
      : [...state.selectedTags, tag] 
  })),
  removeTag: (tag) => set((state) => ({
    selectedTags: state.selectedTags.filter((t) => t !== tag)
  })),
  clearTags: () => set({ selectedTags: [] }),
})); 