mod math;

fn main() {
    let numbers = vec![1, 2, 3, 4];

    println!("{}", math::is_even(4));
    println!("{}", math::sum_slice(&numbers));


    println!("Hello, world!");
    run()
}

fn run() {
    say_hello();
}

fn say_hello() {
    println!("Hello");
}
