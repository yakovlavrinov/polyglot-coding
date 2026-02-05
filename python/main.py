from services.user_service import UserService


def main():
    service = UserService()

    # создаём юзеров
    user1 = service.create_user(1, "Yakov", "yakov@mail.com")
    user2 = service.create_user(2, "Anna", "anna@mail.com")

    print(user1.greet())
    print(user2.greet())

    # деактивируем
    service.deactivate_user(1)

    # активные
    active_users = service.get_active_users()

    print("\nActive users:")

    for user in active_users:
        print(user)


if __name__ == "__main__":
    main()
