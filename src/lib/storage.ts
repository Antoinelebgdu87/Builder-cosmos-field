export interface PortfolioItem {
  id: string;
  title: string;
  link: string;
  description: string;
  type: "montage" | "motion-design" | "autre";
  createdAt: string;
  thumbnail?: string;
}

const STORAGE_KEY = "lino_portfolio_items";

export const portfolioStorage = {
  getItems(): PortfolioItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  addItem(item: Omit<PortfolioItem, "id" | "createdAt">): PortfolioItem {
    const newItem: PortfolioItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const items = this.getItems();
    items.unshift(newItem); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    return newItem;
  },

  deleteItem(id: string): void {
    const items = this.getItems().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  updateItem(
    id: string,
    updates: Partial<PortfolioItem>,
  ): PortfolioItem | null {
    const items = this.getItems();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) return null;

    items[index] = { ...items[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    return items[index];
  },
};
