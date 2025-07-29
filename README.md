# Trends by Didi

Welcome to **Trends by Didi**, an e-commerce web application featuring a curated selection of clothing and fashion items for Men, Women, and Kids. This project is built with React and powered by [Vite](https://vitejs.dev/) for fast development and Hot Module Replacement (HMR).

## Features

- 🛍️ **Product Catalog:** Browse a wide range of fashion products including topwear, bottomwear, winterwear, accessories, and more.
- 🛒 **Shopping Cart:** Add items to your cart, select sizes, and easily track your cart count.
- 🕵️ **Search & Filter:** Search for products and filter by category, subcategory, or popularity.
- 💳 **Pricing in NGN:** All prices are shown in Nigerian Naira (₦).
- ⚡ **Fast & Modern UI:** Built with React + Vite for a smooth shopping experience.
- 🔒 **Authentication Ready:** Context setup for user token management.

## Tech Stack

- **Frontend:** React, Vite, React Router, React Toastify
- **Linting:** ESLint (with recommended React and Vite configs)
- **State Management:** React Context API

## Getting Started

To run the project locally:

```bash
git clone https://github.com/Themydee/Alli-trends-by-didi.git
cd Alli-trends-by-didi
npm install
npm run dev
```
Then visit [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
Alli-trends-by-didi/
├── src/
│   ├── assets/       # Product images & data.js (product catalog)
│   ├── contexts/     # ShopContext (shopping cart, user, search)
│   ├── components/   # React components (UI)
│   └── main.jsx      # Entry point
├── public/
├── index.html
├── package.json
├── eslint.config.js
└── README.md
```

## Adding Products

Product data is managed in [`src/assets/data.js`](src/assets/data.js). Each product has attributes like `name`, `description`, `price`, `image`, `category`, `subCategory`, `sizes`, and `popular`.

## Customization

- **ESLint:** Expand the ESLint configuration as needed. For TypeScript support, see the [Vite React TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts).
- **Styling:** Add your preferred CSS or preprocessor to further enhance the look and feel.

## Credits

- Built by [Themydee](https://github.com/Themydee)
- Logo: `/didi.png`

## License

This project is licensed under the MIT License.

---

Happy shopping and coding! 🎉