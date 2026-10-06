from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from database import engine
from schemas.customer import CustomerCreate, CustomerUpdate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/customers")
def create_customer(customer: CustomerCreate):
    with engine.begin() as connection:
        result = connection.execute(
            text("""
                INSERT INTO customers (name, email)
                VALUES (:name, :email)
                RETURNING id, name, email
            """),
            {
                "name": customer.name,
                "email": customer.email
            }
        )

        row = result.fetchone()

        return {
            "id": row.id,
            "name": row.name,
            "email": row.email
        }

@app.put("/customers/{customer_id}")
def update_customer(customer_id: int, customer: CustomerUpdate):
    with engine.begin() as connection:
        result = connection.execute(
            text("""
                UPDATE customers
                SET name = :name,
                    email = :email
                WHERE id = :id
                RETURNING id, name, email
            """),
            {
                "id": customer_id,
                "name": customer.name,
                "email": customer.email
            }
        )

        row = result.fetchone()

        if row is None:
            return {"error": "Customer not found"}

        return {
            "id": row.id,
            "name": row.name,
            "email": row.email
        }

@app.delete("/customers/{customer_id}")
def delete_customer(customer_id: int):
    with engine.begin() as connection:
        result = connection.execute(
            text("""
                DELETE FROM customers
                WHERE id = :id
                RETURNING id, name, email
            """),
            {
                "id": customer_id
            }
        )

        row = result.fetchone()

        if row is None:
            return {"error": "Customer not found"}

        return {
            "message": "Customer deleted successfully",
            "customer": {
                "id": row.id,
                "name": row.name,
                "email": row.email
            }
        }

@app.get("/db-test")
def database_test():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        return {"database": result.scalar()}


@app.get("/")
def root():
    return {"message": "Customer API is running!"}


@app.get("/customers")
def get_customers():
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT id, name, email FROM customers ORDER BY id")
        )

        customers = []

        for row in result:
            customers.append({
                "id": row.id,
                "name": row.name,
                "email": row.email
            })

        return customers