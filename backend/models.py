import uuid
import enum
from datetime import date, time, datetime
from sqlalchemy import Column, String, Boolean, Date, Time, ForeignKey, Enum, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base

class PriorityEnum(enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"

class RepeatEnum(enum.Enum):
    none = "none"
    daily = "daily"
    weekly = "weekly"
    monthly = "monthly"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    todos = relationship("ToDo", back_populates="user")
    categories = relationship("Category", back_populates="user")

class Category(Base):
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)
    color = Column(String, nullable=False, default="#0ea5e9")
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)

    user = relationship("User", back_populates="categories")
    todos = relationship("ToDo", back_populates="category")

class ToDo(Base):
    __tablename__ = "todos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False)
    is_important = Column(Boolean, default=False)
    due_date = Column(Date, nullable=True)
    due_time = Column(Time, nullable=True)
    priority = Column(Enum(PriorityEnum), nullable=True)
    repeat = Column(Enum(RepeatEnum), nullable=True)
    reminder = Column(Boolean, default=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=True)

    user = relationship("User", back_populates="todos")
    category = relationship("Category", back_populates="todos")