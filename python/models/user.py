from datetime import datetime

class User:
    def __init__(self,id:int, name:str, email:str, is_active: bool = True):
        self.id = id
        self.name = name
        self.email = email
        self.is_active = is_active
        self.created_at = datetime.now()
    def greet (self) -> str:
        return f"Hello, my name is {self.name}"

    def deactivation(self) -> str:
        self.is_active = False

    def __str__(self) -> str:
        return f"User(id={self.id}, name={self.name}, email={self.email})"