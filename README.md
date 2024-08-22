# SeconHandMangaProject
 FinalProject for SoftUni
 ## 1. Initialize Project
- [x] Initialize git repo
- [x] Add softuni practice server
- [x] Add base vite react project as client
- [x] CleanUp client
- [x] Add project resources

## 2. React Router
- [x] Install react-router-dom
- [x] Setup react-router-dom
- [x] Add routes in App.jsx
- [x] Add links in the navigation

## 3. Create Service Layer
- [x] Service layer architecture disccusion
- [x] Abstract requester
- [x] Add manga api
- [x] Add auth api
- [x] Add comments api
- [x] Add favourite api
- [x] Preseed practice server

## 4. Page Implementations
- [x] Manga storeList
- [x] Manga catalogList
- [x] Details (for manga books)
  - [x] Details link for store/catalog manga
  - [x] Details route for store/catalog manga
  - [x] Api function - getOne
- [x] Home 
  - [x] Get latest Manga added to Catalog
  - [x] NavLink to details of latest addions to Catalog
  - [x] Get latest Manga added to Store
  - [x] NavLink to details of latest addions to Store
- [x] Catalog 
  - [x] Details page for manga books
  - [x] Filter manga by genre
  - [x] Add manga to favourites
  - [x] Add a comment(review)
- [x] Store 
  - [x] Details page for manga books
  - [x] Filter manga by genre
  - [x] Buy used manga from Store
  - [x] List your own manga for sale
  - [x] Edit and deleta your own manda
- [x] About us (brief information about us and what we do)
- [x] Contact us (a way to report bugs or offensive comments)
- [x] Profile
  - [x] User's personal information
  - [x] List of manga added to favourite
- [x] Login Page
- [x] Register Page

## 5. Comments
- [x] Create service for nested resource `comments`
- [x] Post comment to server
- [x] Read comments from server
- [x] Add comments in the component
- [x] Clear form
- [x] Validate comment form
- [x] Dynamic update of comment section without need to refresh page

## 6. Favourites
- [x] Create service for nested resource `favourites`
- [x] Post favourite manga to server
- [x] Read favourite manga from server via relation
- [x] Add favourite manga in the component
- [x] Remove favourite manga from server and profile page list
- [x] Clear form

## 7. Buy Manga from store
- [x] Option to buy manga from store
  - [x] Done by using X-admin header
  - [x] Might create some unwated behavior in other components!!!

## 8. API Hooks
- [x] Form Hook
- [x] MangaAPI Hooks
- [x] Comment Hooks
- [x] CreateCatalogManga Hooks
- [x] CreateStoreManga(useCreateManga) Hooks
- [x] Favourite Hooks
- [x] Catalog Manga Hooks
- [x] Store Manga Hooks

## 9. Authentication
- [x] Auth API
  - [x] Login
  - [x] Register
  - [x] Logout
- [x] Auth API hook
  - [x] Login
  - [x] Register
  - [x] Logout
- [x] Auth state & context
  - [x] User context
  - [x] currentManga context
   - [x] Validate if the user trying to edit the current manga is the owner!
- [x] Token management
- [x] Login
  - [x] Add form validation
  - [x] request validation and error handling
- [x] Register
  - [x] Add form validation
  - [x] request validation and error handling
- [x] Logout
- [x] Authorized Requests

## 10. Route Guards
- [x] Route Guard for Guests
 - [x] Only guest users should be able to navigate to login, register page
- [x] Route Guard for User
 - [x] Only logged in users should be able to navigate to edit, createStore, profile, contact us page
- [x] Route Guard for UserEdit
 - [x] Only owner of manga should be able to navigate to edit/mangaId page

## 11. Utils
- [x] Check if favourite already exist
  - [x] Validates if the current (datails page) manga is already added to your favourites list
- [x] Filter manga by genre
 - [x] For catalog and store page
- [x] Validate Inputs and return appropriate error messages
 - [x] Validate Register form input 
 - [x] Validate Login form input
 - [x] Validate Edit form input for catalog and store
 - [x] Validate comment input
 - [x] Validate contact us


## 12. UI Implementation 
- [x] Dynamic navigation
  - [x] Crean and simple navigation
- [x] Consistent design across all pages and elements
- [x] Using visual hierarchy to guide users's attention to the most important part of a page
- [x] Using sizes,colors mad positioning to highlight key elements,parts and content
- [x] Interactive elements
- [x] Use of visuals to some extend
- [x] Color selection (mediocre at best)
- [x] easy to find action buttons
- [x] Readability (decent)
- [x] Create game
  - [x] API function
  - [x] Hook
- [x] Latest games to Catalog
- [x] Latest games to Store
- [x] Dynamic profile page for favourite actions
  - [x] Adding a manga to favourite
  - [x] Removing a manga from favourite
- [x] Dynamic comment section under manga in catalog/details page

## 13. Technologies Used

- [x] React.js
- [x] React Router
- [x] Context API
- [x] Custom Hooks
- [x] CSS for styling

## 14. Folder Structure

- [x] `src/`: Contains all source code
  - [x] `api/`: API request functions
  - [x] `components/`: React components
  - [x] `contexts/`: Context API providers
  - [x] `hooks/`: Custom React hooks
  - [x] `util/`: Utility functions
- [x] `public/`: Public assets
- [x] `README.md`: Project documentation

## 15. Usage

- [x] Catalog -> Browse all available manga. Leave a comment(oprtional).
- [x] Datails -> View detailed infromation about a specific manga.
- [x] Store -> Browse all available manga for sale.
- [x] List Product -> List your own manga for sale.
- [x] Contact us -> Send us an email.
- [x] About us -> Brief information about our team and ideas.
- [x] Login -> Login into your account and be able to expirience some of our features.
- [x] Register -> Create your own account.
- [x] Profile -> information about your account and your favourite manga.