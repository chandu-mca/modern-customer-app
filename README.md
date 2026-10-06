\# Customer Management Application



A modern full-stack customer management application built as a hands-on learning and portfolio project.



\## Technology Stack



\### Frontend



\* React

\* TypeScript

\* Vite



\### Backend



\* Python

\* FastAPI

\* SQLAlchemy

\* Pydantic



\### Database



\* PostgreSQL



\## Features



\* View customers

\* Search customers

\* Add customers

\* Edit customers

\* Delete customers

\* REST API

\* PostgreSQL database persistence

\* API validation

\* Error handling

\* Environment-based database configuration

\* CORS configuration



\## Architecture



```text

React + TypeScript

&#x20;       |

&#x20;       | HTTP / JSON

&#x20;       v

FastAPI + Python

&#x20;       |

&#x20;       | SQLAlchemy

&#x20;       v

PostgreSQL

```



\## API Endpoints



| Method | Endpoint          | Description       |

| ------ | ----------------- | ----------------- |

| GET    | `/customers`      | Get all customers |

| POST   | `/customers`      | Create a customer |

| PUT    | `/customers/{id}` | Update a customer |

| DELETE | `/customers/{id}` | Delete a customer |



\## Project Structure



```text

modern-customer-app/

|

├── backend/

│   ├── main.py

│   ├── database.py

│   ├── models/

│   │   └── customer.py

│   └── schemas/

│       └── customer.py

|

├── frontend/

│   ├── src/

│   └── package.json

|

├── .gitignore

└── README.md

```



\## Running the Application



\### Backend



Navigate to the backend directory:



```powershell

cd backend

```



Activate the Python virtual environment and start FastAPI:



```powershell

fastapi dev main.py

```



The API will be available at:



```text

http://127.0.0.1:8000

```



Interactive API documentation:



```text

http://127.0.0.1:8000/docs

```



\### Frontend



Open another terminal and navigate to the frontend:



```powershell

cd frontend

npm run dev

```



The React application will be available at:



```text

http://localhost:5173

```



\## Security



Database credentials are stored in environment variables and are not committed to GitHub.



The `.env` file is excluded through `.gitignore`.



\## Learning Goals



This project demonstrates the transition from traditional web development experience to a modern full-stack development stack using React, TypeScript, Python/FastAPI, SQLAlchemy, PostgreSQL, Git, and GitHub.



\## Future Improvements



Planned improvements include:



\* Improved UI/UX

\* Loading indicators

\* Centralized API service

\* Automated tests

\* Docker

\* AWS RDS

\* AWS EC2

\* CI/CD

\* Authentication and authorization

\* AI-assisted application features



