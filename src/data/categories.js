export const navCategories = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Shop',
    to: '/products',
    dropdown: [
      { label: 'All Products', to: '/products' },
      { label: 'New Arrivals', to: '/products?sort=new' },
      { label: 'Best Sellers', to: '/products?sort=bestseller' },
      { label: 'Sale', to: '/products?sort=sale' },
    ],
  },
  {
    label: 'Categories',
    to: '/products',
    megaMenu: [
      {
        title: 'Electronics',
        icon: '💻',
        items: [
          { label: 'Smartphones', to: '/products?cat=smartphones' },
          { label: 'Laptops & PCs', to: '/products?cat=laptops' },
          { label: 'Cameras', to: '/products?cat=cameras' },
          { label: 'Audio & Headphones', to: '/products?cat=audio' },
          { label: 'Smart Watches', to: '/products?cat=watches' },
          { label: 'Tablets', to: '/products?cat=tablets' },
        ],
      },
      {
        title: 'Clothing',
        icon: '👕',
        items: [
          { label: "Men's Wear", to: '/products?cat=mens' },
          { label: "Women's Wear", to: '/products?cat=womens' },
          { label: 'Sportswear', to: '/products?cat=sportswear' },
          { label: 'Outerwear', to: '/products?cat=outerwear' },
          { label: 'Accessories', to: '/products?cat=accessories' },
          { label: 'Shoes', to: '/products?cat=shoes' },
        ],
      },
      {
        title: 'Home & Interior',
        icon: '🛋️',
        items: [
          { label: 'Furniture', to: '/products?cat=furniture' },
          { label: 'Lighting', to: '/products?cat=lighting' },
          { label: 'Bedding', to: '/products?cat=bedding' },
          { label: 'Kitchen', to: '/products?cat=kitchen' },
          { label: 'Decor', to: '/products?cat=decor' },
          { label: 'Storage', to: '/products?cat=storage' },
        ],
      },
      {
        title: 'Sports & Outdoor',
        icon: '⚽',
        items: [
          { label: 'Exercise Equipment', to: '/products?cat=exercise' },
          { label: 'Outdoor Gear', to: '/products?cat=outdoor' },
          { label: 'Cycling', to: '/products?cat=cycling' },
          { label: 'Swimming', to: '/products?cat=swimming' },
        ],
      },
      {
        title: 'Tools & Garden',
        icon: '🔧',
        items: [
          { label: 'Power Tools', to: '/products?cat=powertools' },
          { label: 'Hand Tools', to: '/products?cat=handtools' },
          { label: 'Garden', to: '/products?cat=garden' },
          { label: 'Safety', to: '/products?cat=safety' },
        ],
      },
      {
        title: 'Health & Beauty',
        icon: '💄',
        items: [
          { label: 'Skincare', to: '/products?cat=skincare' },
          { label: 'Hair Care', to: '/products?cat=haircare' },
          { label: 'Vitamins', to: '/products?cat=vitamins' },
          { label: 'Fragrances', to: '/products?cat=fragrances' },
        ],
      },
    ],
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
];
