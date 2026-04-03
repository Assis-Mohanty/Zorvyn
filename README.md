
# Zorvyn

This is a backend project on a finance application 

Setup in your machine

Clone this repository
``` 
git clone https://github.com/Assis-Mohanty/Zorvyn.git ./

```
install dependencies

npm i

Edit your .env file 

```
PORT=3000 
DB_HOST=localhost 
DB_PORT=db_port 
DB_NAME=your_database 
DB_USER=your_user 
DB_PASSWORD=your_password 
JWT_SECRET=your_jwt_secret
```
Using MySql

migrate to your current db 
npx sequelize-cli db:migrate


npm run dev


Base URL:

/api/v1

Routes:

/auth  public
/user  requires auth
/records  requires auth
/dashboard  analyst/admin only

Layered architecture (clean separation of concerns)
JWT-based auth + RBAC
Input validation using Zod
Designed to be extendable 

User & Role Management: Users can be created, assigned roles (admin, analyst, viewer), and managed with proper status control. Role-based permissions are enforced across the system.

Financial Records Management: Supports full CRUD operations for financial records, including filtering by type, category, and date.
Dashboard APIs: Provides aggregated data such as total income, expenses, net balance, category-wise breakdowns, and recent activity.

Access Control: Role-based access control is implemented using middleware, ensuring each role can only perform permitted actions.

Validation & Error Handling: Input validation is handled using Zod, with consistent error responses and proper HTTP status codes.

Data Persistence: Uses a relational database (MySQL) with Sequelize ORM for structured and reliable data storage.

Enhancements:
JWT-based authentication
Rate limiting for API protection
Structured logging with correlation IDs
Clean modular architecture for scalability


