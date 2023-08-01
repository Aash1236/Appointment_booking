// Function to fetch all user details from the server and populate the user list
async function fetchUsers() {
    try {
      const response = await fetch('https://example-api.com/users');
      const users = await response.json();
  
      const userList = document.getElementById('user-list');
      userList.innerHTML = '';
  
      users.forEach((user) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${user.name} (${user.email}) <span class="edit-icon" onclick="editUser(${user.id})">&#9998;</span>`;
        userList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
  
  // Function to populate the registration form with user details
  function populateForm(userData) {
    const registrationForm = document.getElementById('registration-form');
    registrationForm.elements['name'].value = userData.name;
    registrationForm.elements['email'].value = userData.email;
    // Populate other form fields with user details
    registrationForm.elements['user-id'].value = userData.id;
  }
  
  // Function to handle edit user functionality
  async function editUser(userId) {
    try {
      const response = await fetch(`https://example-api.com/users/${userId}`);
      const userData = await response.json();
  
      populateForm(userData);
    } catch (error) {
      console.error('Error fetching user details for editing:', error);
    }
  }
  
  // Function to handle form submission
  async function submitForm(event) {
    event.preventDefault();
    
    const registrationForm = document.getElementById('registration-form');
    const formData = new FormData(registrationForm);
    const userId = formData.get('user-id');
  
    try {
      await fetch(`https://example-api.com/users/${userId}`, {
        method: 'PUT', // Use 'PUT' for updating existing user or 'POST' to create a new user
        body: formData
      });
  
      // Update user list with new user details
      fetchUsers();
  
      // Clear the form fields
      registrationForm.reset();
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  }
  
  // Add event listener for form submission
  const registrationForm = document.getElementById('registration-form');
  registrationForm.addEventListener('submit', submitForm);
  
  // Fetch users and populate the user list on page load
  fetchUsers();
  