from sqlalchemy import Column, Integer, String, Boolean
from database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class ToDo(Base):
    __tablename__ = "todos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False)