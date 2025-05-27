import java.util.HashMap;
import java.util.Scanner;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>();
        Scanner scanner = new Scanner(System.in);
        
        while(true) {
            System.out.print("Enter student ID (or -1 to stop): ");
            int id = scanner.nextInt();
            if(id == -1) break;
            
            scanner.nextLine(); // consume newline
            System.out.print("Enter student name: ");
            String name = scanner.nextLine();
            
            studentMap.put(id, name);
        }
        
        System.out.print("\nEnter ID to lookup: ");
        int lookupId = scanner.nextInt();
        System.out.println("Student name: " + studentMap.get(lookupId));
    }
}