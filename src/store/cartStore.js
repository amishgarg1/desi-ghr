import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find(i => i.name === item.name);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map(i => 
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    }
    // Give item a random price for demo purposes (e.g. 50 - 250 rs)
    const price = Math.floor(Math.random() * 200) + 50;
    return {
      cartItems: [...state.cartItems, { ...item, quantity: 1, price }]
    };
  }),
  removeFromCart: (name) => set((state) => ({
    cartItems: state.cartItems.filter(i => i.name !== name)
  })),
  updateQuantity: (name, amount) => set((state) => ({
    cartItems: state.cartItems.map(i => {
      if (i.name === name) {
        const newQuantity = Math.max(1, i.quantity + amount);
        return { ...i, quantity: newQuantity };
      }
      return i;
    })
  })),
  clearCart: () => set({ cartItems: [] }),
  getCartTotal: () => {
    let total = 0;
    set((state) => {
      total = state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return state;
    });
    return total;
  }
}));
