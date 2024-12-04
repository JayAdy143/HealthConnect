// Arrays to store registered patients, doctors, and appointments
const registeredPatients = [];
const registeredDoctors = [];
const registeredAppointments = [];

// Function to handle patient registration
function recordPatient(event) {
    event.preventDefault();

    const patientName = document.getElementById('patient-name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const contact = document.getElementById('contact').value;

    // Check if patient is already registered
    const isDuplicate = registeredPatients.some(patient => 
        patient.name === patientName && patient.contact === contact
    );

    if (isDuplicate) {
        alert("This patient is already registered.");
        return;
    }

    // Store patient data
    const patientData = { name: patientName, age, gender, contact };
    registeredPatients.push(patientData);

    console.log("Patient Registered:", patientData);
    document.getElementById("patientForm").reset();
    alert("Patient information has been recorded.");
}

// Function to handle doctor registration
function recordDoctor(event) {
    event.preventDefault();

    const doctorName = document.getElementById('doctor-name').value;
    const specialization = document.getElementById('specialization').value;
    const email = document.getElementById('doctor-email').value;
    const phone = document.getElementById('doctor-phone').value;

    // Check if doctor is already registered
    const isDuplicate = registeredDoctors.some(doctor => 
        doctor.name === doctorName && doctor.phone === phone
    );

    if (isDuplicate) {
        alert("This doctor is already registered.");
        return;
    }

    // Store doctor data
    const doctorData = { name: doctorName, specialization, email, phone };
    registeredDoctors.push(doctorData);

    console.log("Doctor Registered:", doctorData);
    document.getElementById("doctorForm").reset();
    alert("Doctor information has been recorded.");
}

// Function to handle appointment registration
function recordAppointment(event) {
    event.preventDefault();

    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    const reason = document.getElementById('reason').value;

    // Check if the appointment slot is already booked
    const isDuplicate = registeredAppointments.some(appointment => 
        appointment.date === appointmentDate && appointment.time === appointmentTime
    );

    if (isDuplicate) {
        alert("This appointment slot is already booked.");
        return;
    }

    // Store appointment data
    const appointmentData = { date: appointmentDate, time: appointmentTime, reason };
    registeredAppointments.push(appointmentData);

    console.log("Appointment Registered:", appointmentData);
    document.getElementById("appointmentForm").reset();
    alert("Appointment has been recorded.");
}

    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();
            const formId = event.target.id;
            alert(`Form submitted successfully: ${formId}`);
            event.target.reset();
        });
    });
    
   
    // Send data using Fetch API or AJAX
    fetch('/submit-all-forms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patient: patientData, doctor: doctorData, appointment: appointmentData }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Forms submitted successfully!');
    })
    .catch(error => {
        console.error('Error submitting forms:', error);
    });

    // Sample admin credentials
    const adminCredentials = { username: "admin", password: "1234" };

    // Admin login functionality
    function adminLogin(event) {
        event.preventDefault();
        const username = document.getElementById("admin-username").value;
        const password = document.getElementById("admin-password").value;

        if (username === adminCredentials.username && password === adminCredentials.password) {
            alert("Admin Login Successful");
            document.getElementById("adminLoginForm").classList.add("hidden");
            document.getElementById("adminDashboard").classList.remove("hidden");
        } else {
            alert("Invalid Admin Credentials");
        }
    }

    // View functions for admin
    function viewPatients() {
        document.getElementById("adminRecords").innerHTML = "<p>Displaying registered patients...</p>";
    }

    function viewDoctors() {
        document.getElementById("adminRecords").innerHTML = "<p>Displaying registered doctors...</p>";
    }

    function viewAppointments() {
        document.getElementById("adminRecords").innerHTML = "<p>Displaying appointments...</p>";
    }



  // View functions for admin
  function viewPatients() {
      const patientRecords = registeredPatients.map(patient => `
          <p>${patient.name}, Age: ${patient.age}, Contact: ${patient.contact}</p>
      `).join("");
      document.getElementById("adminRecords").innerHTML = `<h4>Registered Patients</h4>${patientRecords}`;
  }

  function viewDoctors() {
      const doctorRecords = registeredDoctors.map(doctor => `
          <p>${doctor.name}, Specialization: ${doctor.specialization}, Phone: ${doctor.phone}</p>
      `).join("");
      document.getElementById("adminRecords").innerHTML = `<h4>Registered Doctors</h4>${doctorRecords}`;
  }

  function viewAppointments() {
      const appointmentRecords = registeredAppointments.map(appointment => `
          <p>Date: ${appointment.date}, Time: ${appointment.time}, Reason: ${appointment.reason}</p>
      `).join("");
      document.getElementById("adminRecords").innerHTML = `<h4>Appointments</h4>${appointmentRecords}`;
  }
    