SELECT u.full_name AS organizer,
       COUNT(e.event_id) AS total_events,
       SUM(CASE WHEN e.status = 'upcoming' THEN 1 ELSE 0 END) AS upcoming_events,
       SUM(CASE WHEN e.status = 'completed' THEN 1 ELSE 0 END) AS completed_events,
       SUM(CASE WHEN e.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_events
FROM Events e
JOIN Users u ON e.organizer_id = u.user_id
GROUP BY e.organizer_id;