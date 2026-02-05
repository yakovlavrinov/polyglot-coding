import re

def validate_email(email: str) - bool
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None

def validate_name(name: str) -> bool:
    def has_numbers(value:str) -> bool:
        return any(char.isdigit() for char in value)

    if len(name) < 2:
        return False

    if has_numbers(name):
        return False

    return True