import java.lang.reflect.Method;

public class ReflectionExample {
    public static void main(String[] args) throws Exception {
        Class<?> clazz = Class.forName("java.util.ArrayList");
        Method[] methods = clazz.getDeclaredMethods();
        
        System.out.println("Methods of ArrayList:");
        for(Method method : methods) {
            System.out.println(method.getName() + " - Parameters: " + method.getParameterCount());
        }
        
        // Invoke a method
        Object list = clazz.getDeclaredConstructor().newInstance();
        Method addMethod = clazz.getMethod("add", Object.class);
        addMethod.invoke(list, "Hello");
        System.out.println("List: " + list);
    }
}