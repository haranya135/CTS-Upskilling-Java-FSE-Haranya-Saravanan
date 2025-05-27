import java.util.concurrent.*;
import java.util.*;

public class ExecutorServiceExample {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        List<Future<Integer>> futures = new ArrayList<>();
        
        for(int i = 0; i < 5; i++) {
            int taskId = i;
            Callable<Integer> task = () -> {
                System.out.println("Task " + taskId + " executing");
                return taskId * taskId;
            };
            futures.add(executor.submit(task));
        }
        
        for(Future<Integer> future : futures) {
            System.out.println("Result: " + future.get());
        }
        
        executor.shutdown();
    }
}