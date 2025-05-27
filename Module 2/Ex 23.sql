SELECT DATE_FORMAT(registration_date, '%Y-%m') AS month,
       COUNT(registration_id) AS registrations
FROM Registrations
WHERE registration_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY month
ORDER BY month;