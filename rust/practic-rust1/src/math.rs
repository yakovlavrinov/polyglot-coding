pub fn is_even(n: i32) -> bool {
    n % 2 == 0
}

pub fn sum_slice(numbers: &[i32]) -> i32 {
    let mut sum = 0;

    for n in numbers {
        sum += n;
    }
    sum
}