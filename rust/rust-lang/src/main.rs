fn main() {
    println!("Hello, world!");

    // Переменные

    let x = 10; // эти объявления переменных чем-то похожи на let const в JS
    println!("{}", x);
    let mut y = 20;
    println!("{}", y);
    y = 30;
    println!("{}",y);

    // Типы данных

    // Числа
    let a: i32 = 10; // 32-битное целое число со знаком
    let b = 10; // 32-битное целое число со знаком по умолчанию
    let c = 10u8; // 8-битное целое число без знака
    let d = 10.5f64; // 64-битное число с плавающей запятой
    
    // Boolean и char
    let is_active: bool = true;
    let letter: char = 'A';

    // Строки
    // В Rust две основные строки
    let s = String::from("Hello"); // String - владеет данными

    let s2 = "Hello"; // &str - ссылка

    // Функции 
    fn sum(a: i32, b: i32) -> i32 {
        a + b
    }
    println!("{}", sum(2, 3));
    // return не обязателен, последнее выражение возвращается автоматически

    // Условия
    let n = 10;

    if n > 5 {
        println!("big");
    } else {
        println!("small");
    }

    let size = if n > 5 {"big"} else {"small"}; // в JS так нельзя без тернарника, в Rust if возвращает значение

    // Циклы
    // loop {
    //     println!("infinite")
    // }

    let mut m = 0;

    while m < 5 {
        m += 1
    }

    for i in 0..5 {
        println!("{}",i)
    }

    // Массивы и векторы
    let arr = [1,2,3]; // массив (фиксированная длина)

    let mut v = vec![1,2,3]; // вектор (аналог массивов в JS)
    v.push(4);

    let first = v[0]; // доступ

    if let Some(x) = v.get(0) { // безопасный доступ
        println!("{}",x);
    }

    // Tuple
      let user = ("Yakov", 25);
      
      let name = user.0;
      let age = user.1;

      let (name, age) = user; // деструктуризация

      // Struct (аналог интерфейса)
      struct User {
        name: String,
        age: u8,
      }

      let user = User {
        name: String::from("Yakov"),
        age: 25,
      };

    println!("{}", user.name);

      // Enum
      enum Status {
        Active,
        Inactive,
        Pending,
      }

      let status = Status::Active;

      enum Result<T,E> {
        Ok(T),
        Err(E),
      }

      // Match (switch на стероидах)
      match status {
        Status::Active => println!("active"),
        Status::Inactive => println!("inactive"),
        Status::Pending => println!("pending")
      }
      // exhaustive - все кейсы обязательны

      // Option (вместо null)
      let maybe_number: Option<i32> = Some(10);
      let maybe_number: Option<i32> = None;

      match maybe_number {
        Some(x) => println!("{}", x),
        None => println!("no value")
      }

      // Для запуска cargo run
}
