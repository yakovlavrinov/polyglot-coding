from models.user import User
from utils.validators import validate_email, validate_name

class UserService:
    def __init__(self):
        self.users: list[User] = []

    def create_user(self, id:int, name:str, email:str) -> User:
        if not validate_name(name):
            raise ValueError('Invalid name')

        if not validate_email(email):
            raise ValueError('Invalid email')
        
        user = User(id=id, name=name, email=email)
        self.users.append(user)

        return user

    def get_active_users(self) -> list[User]:
        return [user for user in self.users if user.is_active]

    def deactivate_user(self, user_id: int) -> None:
        for user in self.users:
            if user.id == user_id:
                user.deactivate()
                return

        raise ValueError("User not found")
