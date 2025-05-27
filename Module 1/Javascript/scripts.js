// 1. JavaScript Basics & Setup
console.log("Welcome to the Community Portal");

// Alert when page is fully loaded
window.addEventListener('load', () => {
    alert("Community Portal loaded successfully! Ready to explore events.");
});

// 2. Syntax, Data Types, and Operators
// Using const for event name and date, let for seats
const eventName = "Summer Music Festival";
const eventDate = "2025-07-15";
let availableSeats = 100;

// Template literals for concatenation
const eventInfo = `Event: ${eventName} on ${eventDate} - Seats available: ${availableSeats}`;
console.log(eventInfo);

// Seat management with ++ and --
function registerForEvent() {
    if (availableSeats > 0) {
        availableSeats--;
        console.log(`Registration successful! Seats remaining: ${availableSeats}`);
    }
}

function cancelRegistration() {
    availableSeats++;
    console.log(`Registration cancelled. Seats available: ${availableSeats}`);
}

// 5. Objects and Prototypes
// Event constructor with prototype methods
function Event(name, date, location, category, seats = 50) {
    this.name = name;
    this.date = new Date(date);
    this.location = location;
    this.category = category;
    this.seats = seats;
    this.registrations = [];
    this.id = Math.random().toString(36).substr(2, 9);
}

// Add method to prototype
Event.prototype.checkAvailability = function() {
    return this.seats > 0 && this.date > new Date();
};

Event.prototype.register = function(user) {
    if (this.checkAvailability()) {
        this.seats--;
        this.registrations.push(user);
        return true;
    }
    return false;
};

Event.prototype.getFormattedDate = function() {
    return this.date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// 6. Arrays and Methods - Sample events array
let communityEvents = [
    new Event("Jazz Night", "2025-06-15T19:00", "Downtown Theater", "music", 80),
    new Event("Coding Workshop", "2025-06-20T14:00", "Tech Hub", "workshop", 25),
    new Event("Food Festival", "2025-06-25T11:00", "Central Park", "food", 200),
    new Event("Soccer Tournament", "2025-07-01T09:00", "Sports Complex", "sports", 64),
    new Event("AI Conference", "2025-07-10T10:00", "Convention Center", "tech", 150),
    new Event("Rock Concert", "2025-07-20T20:00", "Stadium", "music", 5000),
    new Event("Baking Workshop", "2025-08-05T13:00", "Community Kitchen", "workshop", 15)
];

// 4. Functions, Scope, Closures, Higher-Order Functions
function addEvent(name, date, location, category, seats) {
    const newEvent = new Event(name, date, location, category, seats);
    communityEvents.push(newEvent);
    updateEventDisplay();
    updateStats();
    return newEvent;
}

function registerUser(eventId, userData) {
    const event = communityEvents.find(e => e.id === eventId);
    if (event && event.register(userData)) {
        console.log(`User ${userData.name} registered for ${event.name}`);
        updateEventDisplay();
        updateStats();
        return true;
    }
    return false;
}

// Closure to track registrations by category
function createCategoryTracker() {
    const categoryStats = {};
    
    return function(category) {
        if (!categoryStats[category]) {
            categoryStats[category] = 0;
        }
        categoryStats[category]++;
        console.log(`Total registrations for ${category}: ${categoryStats[category]}`);
        return categoryStats[category];
    };
}

const trackCategoryRegistration = createCategoryTracker();

// Higher-order function for filtering
function filterEventsByCategory(category, callback = null) {
    let filtered;
    if (category === 'all') {
        filtered = [...communityEvents];
    } else {
        filtered = communityEvents.filter(event => event.category === category);
    }
    
    if (callback) {
        callback(filtered);
    }
    return filtered;
}

// 3. Conditionals, Loops, and Error Handling
function displayValidEvents() {
    try {
        const validEvents = communityEvents.filter(event => {
            // Only show upcoming events with seats
            return event.date > new Date() && event.seats > 0;
        });

        const container = document.getElementById('eventsContainer');
        container.innerHTML = '';

        validEvents.forEach(event => {
            const eventCard = createEventCard(event);
            container.appendChild(eventCard);
        });

        if (validEvents.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: white; font-size: 1.2rem;">No upcoming events available.</p>';
        }
    } catch (error) {
        console.error("Error displaying events:", error);
        showMessage("Error loading events. Please try again.", "error");
    }
}

// 7. DOM Manipulation
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    const isAvailable = event.checkAvailability();
    const seatStatus = event.seats > 10 ? 'Available' : event.seats > 0 ? 'Limited' : 'Full';
    const statusColor = event.seats > 10 ? '#28a745' : event.seats > 0 ? '#ffc107' : '#dc3545';
    
    card.innerHTML = `
        <h3 class="event-title">${event.name}</h3>
        <div class="event-meta">
            <div class="meta-item">📅 ${event.getFormattedDate()}</div>
            <div class="meta-item">📍 ${event.location}</div>
        </div>
        <div class="category-badge">${event.category}</div>
        <div class="seats-info" style="border-left-color: ${statusColor}">
            <strong>Seats: ${event.seats} (${seatStatus})</strong>
            <br>Registrations: ${event.registrations.length}
        </div>
        <button class="btn ${isAvailable ? 'btn-primary' : 'btn-secondary'}" 
                onclick="handleEventRegistration('${event.id}')"
                ${!isAvailable ? 'disabled' : ''}>
            ${isAvailable ? '🎟️ Register' : '❌ Unavailable'}
        </button>
    `;
    
    return card;
}

// 8. Event Handling
function setupEventHandlers() {
    // Search functionality with keydown event
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Real-time search
    searchBox.addEventListener('input', performSearch);
    
    // Category filter with onchange
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.addEventListener('change', (e) => {
        filterAndDisplayEvents(e.target.value);
    });
    
    // Button click handlers
    document.getElementById('refreshEvents').addEventListener('click', refreshEventsFromAPI);
    document.getElementById('showForm').addEventListener('click', () => {
        document.getElementById('addEventForm').classList.remove('hidden');
    });
    
    // Registration form handlers
    document.getElementById('regForm').addEventListener('submit', handleRegistrationSubmit);
    document.getElementById('cancelReg').addEventListener('click', () => {
        document.getElementById('registrationForm').classList.add('hidden');
    });
    
    // Add event form handlers
    document.getElementById('newEventForm').addEventListener('submit', handleAddEventSubmit);
    document.getElementById('cancelAdd').addEventListener('click', () => {
        document.getElementById('addEventForm').classList.add('hidden');
    });
}

function handleEventRegistration(eventId) {
    const event = communityEvents.find(e => e.id === eventId);
    if (event && event.checkAvailability()) {
        showRegistrationForm(eventId);
    }
}

function showRegistrationForm(eventId) {
    const form = document.getElementById('registrationForm');
    const select = document.getElementById('selectedEvent');
    
    // Populate event dropdown
    select.innerHTML = '<option value="">Choose an event...</option>';
    communityEvents.filter(e => e.checkAvailability()).forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = `${event.name} - ${event.getFormattedDate()}`;
        if (event.id === eventId) option.selected = true;
        select.appendChild(option);
    });
    
    form.classList.remove('hidden');
}

function performSearch() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    let filteredEvents = filterEventsByCategory(category);
    
    if (searchTerm) {
        filteredEvents = filteredEvents.filter(event =>
            event.name.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm)
        );
    }
    
    displayFilteredEvents(filteredEvents);
}

function filterAndDisplayEvents(category) {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    let filteredEvents = filterEventsByCategory(category);
    
    if (searchTerm) {
        filteredEvents = filteredEvents.filter(event =>
            event.name.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm)
        );
    }
    
    displayFilteredEvents(filteredEvents);
}

function displayFilteredEvents(events) {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = '';
    
    // Filter only valid events (upcoming with seats)
    const validEvents = events.filter(event => event.checkAvailability());
    
    validEvents.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });
    
    if (validEvents.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: white; font-size: 1.2rem;">No events match your criteria.</p>';
    }
}

// 11. Working with Forms
function handleRegistrationSubmit(e) {
    e.preventDefault(); // Prevent default form behavior
    
    const formData = new FormData(e.target);
    const userData = {
        name: formData.get('userName').trim(),
        email: formData.get('userEmail').trim(),
        eventId: formData.get('selectedEvent')
    };
    
    // Validate inputs
    if (validateRegistrationForm(userData)) {
        submitRegistration(userData);
    }
}

function validateRegistrationForm(userData) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error').forEach(error => error.style.display = 'none');
    
    if (!userData.name || userData.name.length < 2) {
        document.getElementById('userNameError').style.display = 'block';
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        document.getElementById('userEmailError').style.display = 'block';
        isValid = false;
    }
    
    if (!userData.eventId) {
        document.getElementById('selectedEventError').style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}

function handleAddEventSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const eventData = {
        name: formData.get('eventName').trim(),
        date: formData.get('eventDate'),
        location: formData.get('eventLocation').trim(),
        category: formData.get('eventCategory'),
        seats: parseInt(formData.get('eventSeats'))
    };
    
    if (eventData.name && eventData.date && eventData.location && eventData.category && eventData.seats > 0) {
        addEvent(eventData.name, eventData.date, eventData.location, eventData.category, eventData.seats);
        showMessage("Event created successfully!", "success", "addEventMessage");
        e.target.reset();
        setTimeout(() => {
            document.getElementById('addEventForm').classList.add('hidden');
        }, 2000);
    } else {
        showMessage("Please fill in all required fields correctly.", "error", "addEventMessage");
    }
}

// 12. AJAX & Fetch API
async function submitRegistration(userData) {
    try {
        showMessage("Processing registration...", "success", "regMessage");
        
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock fetch request
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userData.name,
                userEmail: userData.email,
                eventId: userData.eventId,
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Registration API Response:', result);
            
            // Update local data
            if (registerUser(userData.eventId, userData)) {
                trackCategoryRegistration(communityEvents.find(e => e.id === userData.eventId).category);
                showMessage(`Registration successful! Welcome ${userData.name}!`, "success", "regMessage");
                
                // Clear form after success
                setTimeout(() => {
                    document.getElementById('regForm').reset();
                    document.getElementById('registrationForm').classList.add('hidden');
                }, 3000);
            } else {
                showMessage("Registration failed. Event may be full.", "error", "regMessage");
            }
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage("Registration failed. Please try again.", "error", "regMessage");
    }
}

// 9. Async JS, Promises, Async/Await
function fetchEventsWithPromises() {
    document.getElementById('loadingSpinner').style.display = 'block';
    
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data with promises:', data.slice(0, 3));
            // Transform API data to events
            const newEvents = data.slice(0, 5).map((post, index) => {
                const categories = ['music', 'workshop', 'sports', 'food', 'tech'];
                const locations = ['Downtown', 'Central Park', 'Community Center', 'Library', 'Stadium'];
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + (index + 1) * 7);
                
                return new Event(
                    post.title.substring(0, 30) + '...',
                    futureDate.toISOString(),
                    locations[index % locations.length],
                    categories[index % categories.length],
                    Math.floor(Math.random() * 100) + 20
                );
            });
            
            communityEvents.push(...newEvents);
            updateEventDisplay();
            updateStats();
            showMessage("Events refreshed successfully!", "success");
        })
        .catch(error => {
            console.error('Fetch error:', error);
            showMessage("Failed to refresh events. Please try again.", "error");
        })
        .finally(() => {
            document.getElementById('loadingSpinner').style.display = 'none';
        });
}

// Async/await version
async function refreshEventsFromAPI() {
    try {
        document.getElementById('loadingSpinner').style.display = 'block';
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        console.log('Fetched users with async/await:', users.slice(0, 3));
        
        // Generate events based on user data
        const eventTypes = [
            { name: 'Networking Meetup', category: 'tech' },
            { name: 'Community Workshop', category: 'workshop' },
            { name: 'Music Jam Session', category: 'music' },
            { name: 'Sports Tournament', category: 'sports' },
            { name: 'Food Tasting', category: 'food' }
        ];
        
        const newEvents = users.slice(0, 5).map((user, index) => {
            const eventType = eventTypes[index % eventTypes.length];
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + (index + 10));
            
            return new Event(
                `${eventType.name} with ${user.name}`,
                futureDate.toISOString(),
                user.address.city,
                eventType.category,
                Math.floor(Math.random() * 80) + 15
            );
        });
        
        // Replace some old events with new ones
        communityEvents = [...communityEvents.slice(0, 7), ...newEvents];
        updateEventDisplay();
        updateStats();
        showMessage("Events successfully refreshed from server!", "success");
        
    } catch (error) {
        console.error('Async fetch error:', error);
        showMessage("Failed to refresh events. Please check your connection.", "error");
    } finally {
        document.getElementById('loadingSpinner').style.display = 'none';
    }
}

// 10. Modern JavaScript Features
// Using let, const, default parameters
function createEventSummary(events, maxEvents = 5, includeDetails = true) {
    // Destructuring assignment
    const [firstEvent, secondEvent, ...remainingEvents] = events;
    
    if (firstEvent) {
        // Destructuring object properties
        const { name, date, location, category, seats } = firstEvent;
        console.log(`Featured Event: ${name} in ${location}`);
    }
    
    // Spread operator to clone and filter
    const upcomingEvents = [...events]
        .filter(event => event.checkAvailability())
        .slice(0, maxEvents);
    
    return upcomingEvents.map(event => {
        if (includeDetails) {
            return {
                ...event, // Spread operator
                summary: `${event.name} - ${event.category} event`,
                isUpcoming: event.date > new Date()
            };
        }
        return { name: event.name, category: event.category };
    });
}

// Arrow functions and array methods
const getEventsByCategory = (category) => 
    communityEvents.filter(event => event.category === category);

const formatEventCards = () => 
    communityEvents
        .filter(event => event.checkAvailability())
        .map(event => `"${event.name}" - ${event.category} event`);

// Template literals with expressions
const generateEventReport = () => {
    const totalEvents = communityEvents.length;
    const upcomingEvents = communityEvents.filter(e => e.checkAvailability()).length;
    const categories = [...new Set(communityEvents.map(e => e.category))];
    
    return `
Event Report:
Total Events: ${totalEvents}
Upcoming Events: ${upcomingEvents}
Categories: ${categories.join(', ')}
Generated: ${new Date().toLocaleString()}
    `.trim();
};

// Utility functions
function updateEventDisplay() {
    displayValidEvents();
    populateEventDropdown();
}

function populateEventDropdown() {
    const select = document.getElementById('selectedEvent');
    const currentValue = select.value;
    
    select.innerHTML = '<option value="">Choose an event...</option>';
    
    communityEvents
        .filter(event => event.checkAvailability())
        .forEach(event => {
            const option = document.createElement('option');
            option.value = event.id;
            option.textContent = `${event.name} - ${event.getFormattedDate()}`;
            select.appendChild(option);
        });
    
    // Restore previous selection if still valid
    if (currentValue) {
        select.value = currentValue;
    }
}

function updateStats() {
    const totalEvents = communityEvents.length;
    const upcomingEvents = communityEvents.filter(e => e.checkAvailability()).length;
    const totalRegistrations = communityEvents.reduce((sum, event) => sum + event.registrations.length, 0);
    
    document.getElementById('totalEvents').textContent = totalEvents;
    document.getElementById('upcomingEvents').textContent = upcomingEvents;
    document.getElementById('totalRegistrations').textContent = totalRegistrations;
}

function showMessage(message, type, elementId = null) {
    const messageElement = document.getElementById(elementId || 'regMessage');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;
        messageElement.style.display = 'block';
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }
}

// 13. Debugging and Testing
function debugEventSystem() {
    console.group("🔍 Event System Debug Information");
    
    console.log("Total events:", communityEvents.length);
    console.log("Events array:", communityEvents);
    
    // Check for events with issues
    const problemEvents = communityEvents.filter(event => {
        return !event.name || !event.date || event.seats < 0;
    });
    
    if (problemEvents.length > 0) {
        console.warn("Events with issues:", problemEvents);
    }
    
    // Log event statistics
    const categoryStats = communityEvents.reduce((stats, event) => {
        stats[event.category] = (stats[event.category] || 0) + 1;
        return stats;
    }, {});
    
    console.table(categoryStats);
    
    // Test form validation
    console.log("Testing form validation...");
    const testData = { name: "", email: "invalid-email", eventId: "" };
    console.log("Validation result:", validateRegistrationForm(testData));
    
    console.groupEnd();
}

// Add debugging to window for console access
window.debugEventSystem = debugEventSystem;
window.communityEvents = communityEvents;

// 14. jQuery and JS Frameworks
function setupJQueryFeatures() {
    $(document).ready(function() {
        console.log("jQuery loaded and ready!");
        
        // jQuery click handler for register buttons
        $(document).on('click', '.btn-primary:contains("Register")', function() {
            $(this).parent().fadeOut(300).fadeIn(300);
        });
        
        // Smooth animations for form show/hide
        $('#showForm').click(function() {
            $('#addEventForm').fadeIn(500);
        });
        
        $('#cancelAdd, #cancelReg').click(function() {
            $(this).closest('.registration-form').fadeOut(500);
        });
        
        // jQuery-style hover effects
        $('.event-card').hover(
            function() {
                $(this).addClass('shadow-lg').css('transform', 'translateY(-5px)');
            },
            function() {
                $(this).removeClass('shadow-lg').css('transform', 'translateY(0)');
            }
        );
        
        // Animate stats on page load
        $('.stat-number').each(function() {
            const $this = $(this);
            const finalValue = parseInt($this.text());
            $this.text('0');
            
            $({ counter: 0 }).animate({ counter: finalValue }, {
                duration: 2000,
                step: function() {
                    $this.text(Math.ceil(this.counter));
                }
            });
        });
    });
}

// Framework mention: Benefits of React/Vue
/*
Benefits of moving to frameworks like React or Vue:
1. Component-based architecture for better code organization
2. Virtual DOM for improved performance
3. State management solutions (Redux, Vuex)
4. Better developer tools and debugging
5. Large ecosystem and community support
6. Built-in routing solutions
7. Server-side rendering capabilities
8. TypeScript support for better type safety
*/

// Initialize application
function initializeApp() {
    console.log("🚀 Initializing Community Event Portal...");
    
    // Set up all event handlers
    setupEventHandlers();
    
    // Initialize jQuery features
    setupJQueryFeatures();
    
    // Display initial events
    updateEventDisplay();
    updateStats();
    
    // Log sample data for debugging
    console.log("Sample events created:", communityEvents.slice(0, 3));
    console.log("Event report:", generateEventReport());
    
    // Test modern JS features
    const eventSummary = createEventSummary(communityEvents, 3);
    console.log("Event summary:", eventSummary);
    
    console.log("✅ Application initialized successfully!");
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Event,
        addEvent,
        registerUser,
        filterEventsByCategory,
        validateRegistrationForm,
        createEventSummary
    };
}