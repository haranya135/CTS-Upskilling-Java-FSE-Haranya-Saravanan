import java.util.Arrays;
import java.util.List;
import java.util.Collections;

public class LambdaExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("John", "Alice", "Bob", "Charlie");
        
        System.out.println("Original list: " + names);
        
        Collections.sort(names, (a, b) -> a.compareTo(b));
        System.out.println("Sorted list: " + names);
    }
}