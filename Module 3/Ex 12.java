public class MethodOverloading {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static double add(double a, double b) {
        return a + b;
    }
    
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public static void main(String[] args) {
        System.out.println("Sum of 2 and 3: " + add(2, 3));
        System.out.println("Sum of 2.5 and 3.5: " + add(2.5, 3.5));
        System.out.println("Sum of 2, 3 and 4: " + add(2, 3, 4));
    }
}