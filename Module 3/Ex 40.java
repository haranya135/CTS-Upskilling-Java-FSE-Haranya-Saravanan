public class VirtualThreads {
    public static void main(String[] args) throws InterruptedException {
        long start = System.currentTimeMillis();
        
        for(int i = 0; i < 100_000; i++) {
            int taskId = i;
            Thread.startVirtualThread(() -> {
                System.out.println("Task " + taskId + " running in virtual thread");
            });
        }
        
        long end = System.currentTimeMillis();
        System.out.println("Time taken: " + (end - start) + "ms");
    }
}