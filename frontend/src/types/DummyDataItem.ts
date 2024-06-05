export interface CategoryItem {
    category: string;
    child: string[];
}

export interface Tags {
    id: string;
    who: CategoryItem[];
    where: CategoryItem[];
    activities: CategoryItem[];
    product :CategoryItem[]
}