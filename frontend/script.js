const API = "http://localhost:5000/api";
const statusSelect = document.getElementById("status") || {};
let editLeadId = null;


if (location.pathname.includes("leads") && !localStorage.token) {
  window.location = "login.html";
}

async function login() {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  window.location = "leads.html";
}


function logout() {
  localStorage.removeItem("token");
  window.location = "login.html";
}


async function loadLeads() {
  const res = await fetch(`${API}/leads`, {
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });

  const leads = await res.json();
  leadTable.innerHTML = "";

  leads.forEach(l => {
    leadTable.innerHTML += `
      <tr>
        <td>${l.name}</td>
        <td>${l.email}</td>
        <td>${l.phone}</td>
        <td>${l.status}</td>
        <td>
          <button onclick="editLead('${l._id}','${l.name}','${l.email}','${l.phone}','${l.status}')">Edit</button>
          <button onclick="deleteLead('${l._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

//ADD
async function addLead() {
      if (!leadName || !leadEmail || !leadPhone || !statusSelect) {
    return;
  }
  if (
    !leadName.value.trim() ||
    !leadEmail.value.trim() ||
    !leadPhone.value.trim() ||
    !statusSelect.value
  ) {
    alert("All fields are required");
    return;
  }
  const method = editLeadId ? "PUT" : "POST";
  const url = editLeadId
    ? `${API}/leads/${editLeadId}`
    : `${API}/leads`;

  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({
      name: leadName.value,
      email: leadEmail.value,
      phone: leadPhone.value,
      status: statusSelect.value
    })
  });

  editLeadId = null;
  leadName.value = "";
  leadEmail.value = "";
  leadPhone.value = "";
  statusSelect.value = "New";

  loadLeads();
}

// EDIT 
function editLead(id, name, email, phone, st) {
  editLeadId = id;
  leadName.value = name;
  leadEmail.value = email;
  leadPhone.value = phone;
  statusSelect.value = st;
}

// DELETE 
async function deleteLead(id) {
  await fetch(`${API}/leads/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });
  loadLeads();
}

if (location.pathname.includes("leads")) loadLeads();
