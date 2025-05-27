import java.sql.*;

public class BankTransaction {
    private static final String URL = "jdbc:mysql://localhost:3306/bankdb";
    private static final String USER = "root";
    private static final String PASS = "password";
    
    public static void transfer(int fromAccount, int toAccount, double amount) {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(URL, USER, PASS);
            conn.setAutoCommit(false);
            
            // Debit from account
            PreparedStatement debit = conn.prepareStatement(
                "UPDATE accounts SET balance = balance - ? WHERE id = ?");
            debit.setDouble(1, amount);
            debit.setInt(2, fromAccount);
            debit.executeUpdate();
            
            // Credit to account
            PreparedStatement credit = conn.prepareStatement(
                "UPDATE accounts SET balance = balance + ? WHERE id = ?");
            credit.setDouble(1, amount);
            credit.setInt(2, toAccount);
            credit.executeUpdate();
            
            conn.commit();
            System.out.println("Transfer successful");
        } catch(SQLException e) {
            try {
                if(conn != null) conn.rollback();
            } catch(SQLException ex) {
                ex.printStackTrace();
            }
            e.printStackTrace();
        } finally {
            try {
                if(conn != null) conn.close();
            } catch(SQLException e) {
                e.printStackTrace();
            }
        }
    }
}