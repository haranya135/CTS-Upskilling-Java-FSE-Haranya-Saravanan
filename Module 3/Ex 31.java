import java.sql.*;

public class JdbcExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/studentdb";
        String username = "root";
        String password = "password";
        
        try(Connection connection = DriverManager.getConnection(url, username, password)) {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM students");
            
            while(resultSet.next()) {
                System.out.println("ID: " + resultSet.getInt("id") + 
                                 ", Name: " + resultSet.getString("name"));
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
    }
}