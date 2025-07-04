import java.util.ArrayList;
import java.util.Scanner;

public class ArrayListExample {
    public static void main(String[] args) {
        ArrayList<String> studentNames = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        
        while(true) {
            System.out.print("Enter student name (or 'quit' to stop): ");
            String name = scanner.nextLine();
            
            if(name.equalsIgnoreCase("quit")) {
                break;
            }
            studentNames.add(name);
        }
        
        System.out.println("\nStudent Names:");
        for(String name : studentNames) {
            System.out.println(name);
        }
    }
}