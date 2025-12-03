// Navigation handling
const navLinks = document.querySelectorAll(".nav-link");
const contentSection = document.getElementById("content");
const sidebar = document.getElementById("sidebar");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");

// Sample data
const hotelOwners = [
  {
    id: 1,
    name: "David Wagner",
    email: "david_wagner@example.com",
    role: "Super Admin",
    date: "24 Jun, 2023",
    status: "active",
  },
  {
    id: 2,
    name: "Ina Hogan",
    email: "windler.warren@runte.net",
    role: "Owner",
    date: "24 Aug, 2023",
    status: "active",
  },
  {
    id: 3,
    name: "Devin Harmon",
    email: "wintheiser_enos@yahoo.com",
    role: "Owner",
    date: "18 Dec, 2023",
    status: "active",
  },
  {
    id: 4,
    name: "Lena Page",
    email: "camila_ledner@gmail.com",
    role: "Owner",
    date: "8 Oct, 2023",
    status: "pending",
  },
  {
    id: 5,
    name: "Eula Horton",
    email: "edula_dorton1221@gmail.com",
    role: "Owner",
    date: "15 Jun, 2023",
    status: "active",
  },
  {
    id: 6,
    name: "Victoria Perez",
    email: "terfill.wiza@hotmail.com",
    role: "Owner",
    date: "12 July, 2023",
    status: "active",
  },
  {
    id: 7,
    name: "Cora Medina",
    email: "hagenes.isai@hotmail.com",
    role: "Owner",
    date: "21 July, 2023",
    status: "pending",
  },
];

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234 567 8900",
    joined: "15 Jan, 2024",
    bookings: 5,
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 234 567 8901",
    joined: "20 Jan, 2024",
    bookings: 3,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 234 567 8902",
    joined: "22 Jan, 2024",
    bookings: 7,
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    phone: "+1 234 567 8903",
    joined: "25 Jan, 2024",
    bookings: 2,
  },
  {
    id: 5,
    name: "James Johnson",
    email: "james.johnson@example.com",
    phone: "+1 234 567 8904",
    joined: "28 Jan, 2024",
    bookings: 4,
  },
];

const bookings = [
  {
    id: "BK001",
    guest: "John Smith",
    hotel: "Grand Hotel",
    checkIn: "15 Feb, 2024",
    checkOut: "18 Feb, 2024",
    amount: "$450",
    status: "confirmed",
  },
  {
    id: "BK002",
    guest: "Emma Wilson",
    hotel: "Beach Resort",
    checkIn: "20 Feb, 2024",
    checkOut: "25 Feb, 2024",
    amount: "$890",
    status: "confirmed",
  },
  {
    id: "BK003",
    guest: "Michael Brown",
    hotel: "City Inn",
    checkIn: "10 Feb, 2024",
    checkOut: "12 Feb, 2024",
    amount: "$320",
    status: "completed",
  },
  {
    id: "BK004",
    guest: "Sarah Davis",
    hotel: "Mountain Lodge",
    checkIn: "25 Feb, 2024",
    checkOut: "28 Feb, 2024",
    amount: "$560",
    status: "pending",
  },
  {
    id: "BK005",
    guest: "James Johnson",
    hotel: "Lake View Hotel",
    checkIn: "05 Mar, 2024",
    checkOut: "08 Mar, 2024",
    amount: "$670",
    status: "confirmed",
  },
];

const refunds = [
  {
    id: "RF001",
    booking: "BK010",
    guest: "Alice Cooper",
    amount: "$450",
    reason: "Cancelled by guest",
    date: "10 Jan, 2024",
    status: "approved",
  },
  {
    id: "RF002",
    booking: "BK015",
    guest: "Bob Martin",
    amount: "$320",
    reason: "Hotel unavailable",
    date: "12 Jan, 2024",
    status: "pending",
  },
  {
    id: "RF003",
    booking: "BK020",
    guest: "Carol White",
    amount: "$890",
    reason: "Emergency cancellation",
    date: "15 Jan, 2024",
    status: "approved",
  },
  {
    id: "RF004",
    booking: "BK025",
    guest: "David Lee",
    amount: "$560",
    reason: "Double booking",
    date: "18 Jan, 2024",
    status: "rejected",
  },
];

const messages = [
  {
    id: 1,
    from: "John Smith",
    subject: "Booking inquiry",
    preview: "I would like to know about...",
    date: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    from: "Emma Wilson",
    subject: "Refund request",
    preview: "Please process my refund for...",
    date: "5 hours ago",
    unread: true,
  },
  {
    id: 3,
    from: "Michael Brown",
    subject: "Thank you",
    preview: "Great service! I really enjoyed...",
    date: "1 day ago",
    unread: false,
  },
  {
    id: 4,
    from: "Sarah Davis",
    subject: "Question about amenities",
    preview: "Does the hotel have a pool...",
    date: "2 days ago",
    unread: false,
  },
];

// Page templates
const pages = {
  dashboard: () => `
    <div class="fade-in">
      <div class="mb-8">
        <h2 class="text-3xl font-semibold text-gray-800 mb-2">Admin Dashboard</h2>
        <p class="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <span class="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-1">1,234</h3>
          <p class="text-sm text-gray-600">Total Users</p>
        </div>

        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <span class="text-sm text-green-600 font-medium">+8%</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-1">87</h3>
          <p class="text-sm text-gray-600">Hotel Owners</p>
        </div>

        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <span class="text-sm text-green-600 font-medium">+23%</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-1">456</h3>
          <p class="text-sm text-gray-600">Total Bookings</p>
        </div>

        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span class="text-sm text-green-600 font-medium">+15%</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-1">$45,678</h3>
          <p class="text-sm text-gray-600">Total Revenue</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Recent Bookings</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              ${bookings
                .slice(0, 4)
                .map(
                  (booking) => `
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span class="text-blue-600 font-semibold text-sm">${booking.guest
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">${booking.guest}</p>
                      <p class="text-sm text-gray-500">${booking.hotel}</p>
                    </div>
                  </div>
                  <span class="badge badge-${booking.status === "confirmed" ? "primary" : booking.status === "completed" ? "secondary" : "pending"}">${booking.status}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Recent Messages</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              ${messages
                .slice(0, 4)
                .map(
                  (msg) => `
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-gray-600 font-semibold text-sm">${msg.from
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-1">
                      <p class="font-medium text-gray-800">${msg.from}</p>
                      <span class="text-xs text-gray-500">${msg.date}</span>
                    </div>
                    <p class="text-sm text-gray-600 truncate">${msg.subject}</p>
                  </div>
                  ${msg.unread ? '<span class="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>' : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  users: () => `
    <div class="fade-in">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h2 class="text-3xl font-semibold text-gray-800 mb-2">Users</h2>
          <p class="text-gray-600">Manage all registered users</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="search" placeholder="Search users..." class="search-input" style="width: 300px;" />
          </div>
          <button class="btn btn-primary" onclick="openAddUserModal()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add User
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined Date</th>
                <th>Bookings</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${users
                .map(
                  (user) => `
                <tr>
                  <td>
                    <div class="flex items-center gap-3">
                      <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=128" alt="${user.name}" class="w-10 h-10 rounded-full" />
                      <span class="font-medium text-gray-800">${user.name}</span>
                    </div>
                  </td>
                  <td>${user.email}</td>
                  <td>${user.phone}</td>
                  <td>${user.joined}</td>
                  <td><span class="badge badge-primary">${user.bookings} bookings</span></td>
                  <td>
                    <div class="flex items-center gap-2">
                      <button class="icon-btn" title="View" onclick="openViewModal('User', {name: '${user.name}', email: '${user.email}', phone: '${user.phone}', joined: '${user.joined}', bookings: '${user.bookings}'})">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      <button class="icon-btn" title="Edit" onclick='openEditUserModal(${JSON.stringify(user)})'>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button class="icon-btn delete" title="Delete" onclick="openDeleteModal('User', '${user.name}')">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-700">Items per page:</label>
            <select class="select-input">
              <option>6</option>
              <option selected>10</option>
              <option>20</option>
            </select>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-700">1-5 of 5</span>
            <div class="flex items-center gap-1">
              <button class="pagination-btn" disabled>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button class="pagination-btn" disabled>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  "hotel-owners": () => `
    <div class="fade-in">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h2 class="text-3xl font-semibold text-gray-800 mb-2">List Hotel Owners</h2>
          <p class="text-gray-600">Manage and monitor all hotel owner accounts</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="search" placeholder="Search..." class="search-input" style="width: 300px;" />
          </div>
          <button class="btn btn-secondary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            Sort by
          </button>
          <button class="btn btn-secondary">Saved search</button>
          <button class="btn btn-primary" onclick="openAddOwnerModal()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Owner
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Create Date</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${hotelOwners
                .map(
                  (owner) => `
                <tr>
                  <td>
                    <div class="flex flex-col">
                      <span class="font-medium text-gray-800 mb-1">${owner.name}</span>
                      <span class="text-sm text-gray-500">${owner.email}</span>
                      <span class="badge badge-${owner.status === "active" ? (owner.role === "Super Admin" ? "primary" : "secondary") : "pending"} mt-2" style="width: fit-content;">${owner.role}</span>
                    </div>
                  </td>
                  <td>${owner.date}</td>
                  <td>Lorem Ipsum</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <button class="icon-btn" title="Edit" onclick='openEditOwnerModal(${JSON.stringify(owner)})'>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button class="icon-btn delete" title="Delete" onclick="openDeleteModal('Hotel Owner', '${owner.name}')">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-700">Items per page:</label>
            <select class="select-input">
              <option selected>6</option>
              <option>10</option>
              <option>20</option>
            </select>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-700">1-4 of 10</span>
            <div class="flex items-center gap-1">
              <button class="pagination-btn" disabled>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button class="pagination-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  "booking-details": () => `
    <div class="fade-in">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h2 class="text-3xl font-semibold text-gray-800 mb-2">Booking Details</h2>
          <p class="text-gray-600">View and manage all hotel bookings</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="search" placeholder="Search bookings..." class="search-input" style="width: 300px;" />
          </div>
          <button class="btn btn-secondary" onclick="openFilterModal()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            Filter
          </button>
          <button class="btn btn-secondary" onclick="openExportModal()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Export
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Hotel</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${bookings
                .map(
                  (booking) => `
                <tr>
                  <td><span class="font-medium text-gray-800">${booking.id}</span></td>
                  <td>
                    <div class="flex items-center gap-3">
                      <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(booking.guest)}&background=random&size=128" alt="${booking.guest}" class="w-10 h-10 rounded-full" />
                      <span class="font-medium text-gray-800">${booking.guest}</span>
                    </div>
                  </td>
                  <td>${booking.hotel}</td>
                  <td>${booking.checkIn}</td>
                  <td>${booking.checkOut}</td>
                  <td><span class="font-semibold text-gray-800">${booking.amount}</span></td>
                  <td><span class="badge badge-${booking.status === "confirmed" ? "primary" : booking.status === "completed" ? "secondary" : "pending"}">${booking.status}</span></td>
                  <td>
                    <div class="flex items-center gap-2">
                      <button class="icon-btn" title="View" onclick='openViewModal("Booking", {id: "${booking.id}", guest: "${booking.guest}", hotel: "${booking.hotel}", checkIn: "${booking.checkIn}", checkOut: "${booking.checkOut}", amount: "${booking.amount}", status: "${booking.status}"})'>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      <button class="icon-btn" title="Edit" onclick='openEditBookingModal(${JSON.stringify(booking)})'>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button class="icon-btn delete" title="Cancel" onclick="openDeleteModal('Booking', '${booking.id}')">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-700">Items per page:</label>
            <select class="select-input">
              <option>6</option>
              <option selected>10</option>
              <option>20</option>
            </select>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-700">1-5 of 5</span>
            <div class="flex items-center gap-1">
              <button class="pagination-btn" disabled>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button class="pagination-btn" disabled>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  refund: () => `
    <div class="fade-in">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h2 class="text-3xl font-semibold text-gray-800 mb-2">Refund Requests</h2>
          <p class="text-gray-600">Manage refund requests from customers</p>
        </div>
        <div class="flex items-center gap-4">
          <select class="select-input">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Refund ID</th>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${refunds
                .map(
                  (refund) => `
                <tr>
                  <td><span class="font-medium text-gray-800">${refund.id}</span></td>
                  <td>${refund.booking}</td>
                  <td>
                    <div class="flex items-center gap-3">
                      <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(refund.guest)}&background=random&size=128" alt="${refund.guest}" class="w-10 h-10 rounded-full" />
                      <span class="font-medium text-gray-800">${refund.guest}</span>
                    </div>
                  </td>
                  <td><span class="font-semibold text-gray-800">${refund.amount}</span></td>
                  <td><span class="text-sm text-gray-600">${refund.reason}</span></td>
                  <td>${refund.date}</td>
                  <td><span class="badge badge-${refund.status === "approved" ? "secondary" : refund.status === "pending" ? "warning" : "danger"}">${refund.status}</span></td>
                  <td>
                    <div class="flex items-center gap-2">
                      ${
                        refund.status === "pending"
                          ? `
                        <button class="btn btn-primary" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" onclick="handleApproveRefund('${refund.id}')">Approve</button>
                        <button class="btn btn-secondary" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" onclick="handleRejectRefund('${refund.id}')">Reject</button>
                      `
                          : `
                        <button class="icon-btn" title="View" onclick='openViewModal("Refund", {id: "${refund.id}", booking: "${refund.booking}", guest: "${refund.guest}", amount: "${refund.amount}", reason: "${refund.reason}", date: "${refund.date}", status: "${refund.status}"})'>
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                      `
                      }
                    </div>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-700">Items per page:</label>
            <select class="select-input">
              <option>6</option>
              <option selected>10</option>
              <option>20</option>
            </select>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-700">1-4 of 4</span>
            <div class="flex items-center gap-1">
              <button class="pagination-btn" disabled>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button class="pagination-btn" disabled>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  message: () => `
    <div class="fade-in">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h2 class="text-3xl font-semibold text-gray-800 mb-2">Messages</h2>
          <p class="text-gray-600">View and respond to customer messages</p>
        </div>
        <div class="flex items-center gap-4">
          <button class="btn btn-primary" onclick="openNewMessageModal()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Message
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1">
          <div class="card">
            <div class="p-4 border-b border-gray-200">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input type="search" placeholder="Search messages..." class="search-input" />
              </div>
            </div>
            <div class="divide-y divide-gray-200">
              ${messages
                .map(
                  (msg, index) => `
                <div class="p-4 hover:bg-gray-50 cursor-pointer transition-all ${index === 0 ? "bg-blue-50" : ""}">
                  <div class="flex items-start gap-3">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(msg.from)}&background=random&size=128" alt="${msg.from}" class="w-12 h-12 rounded-full flex-shrink-0" />
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between mb-1">
                        <p class="font-medium text-gray-800 truncate">${msg.from}</p>
                        ${msg.unread ? '<span class="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>' : ""}
                      </div>
                      <p class="text-sm font-medium text-gray-700 truncate mb-1">${msg.subject}</p>
                      <p class="text-sm text-gray-500 truncate">${msg.preview}</p>
                      <p class="text-xs text-gray-400 mt-1">${msg.date}</p>
                    </div>
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="card">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-start gap-4">
                <img src="https://ui-avatars.com/api/?name=John+Smith&background=random&size=128" alt="John Smith" class="w-12 h-12 rounded-full" />
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-800 mb-1">John Smith</h3>
                  <p class="text-sm text-gray-600">john.smith@example.com</p>
                </div>
                <span class="text-sm text-gray-500">2 hours ago</span>
              </div>
            </div>
            <div class="p-6">
              <h4 class="text-xl font-semibold text-gray-800 mb-4">Booking inquiry</h4>
              <div class="prose max-w-none">
                <p class="text-gray-700 mb-4">Hello,</p>
                <p class="text-gray-700 mb-4">I would like to know about the availability of rooms for the upcoming weekend. I'm planning to book a deluxe room for 2 nights starting from February 25th.</p>
                <p class="text-gray-700 mb-4">Could you please let me know if there are any rooms available and what would be the total cost including all taxes and fees?</p>
                <p class="text-gray-700 mb-4">Also, I would like to know about the cancellation policy and if breakfast is included in the room rate.</p>
                <p class="text-gray-700 mb-4">Thank you for your assistance.</p>
                <p class="text-gray-700">Best regards,<br>John Smith</p>
              </div>
            </div>
            <div class="p-6 border-t border-gray-200">
              <textarea class="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" rows="4" placeholder="Type your reply..."></textarea>
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center gap-2">
                  <button class="icon-btn" title="Attach file">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                    </svg>
                  </button>
                  <button class="icon-btn" title="Add emoji">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>
                <button class="btn btn-primary">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  help: () => `
    <div class="fade-in">
      <div class="mb-8">
        <h2 class="text-3xl font-semibold text-gray-800 mb-2">Help & Support</h2>
        <p class="text-gray-600">Find answers to common questions and get support</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="card p-6 text-center hover:shadow-lg transition-all cursor-pointer">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Documentation</h3>
          <p class="text-sm text-gray-600">Browse our comprehensive guides and tutorials</p>
        </div>

        <div class="card p-6 text-center hover:shadow-lg transition-all cursor-pointer">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Live Chat</h3>
          <p class="text-sm text-gray-600">Chat with our support team in real-time</p>
        </div>

        <div class="card p-6 text-center hover:shadow-lg transition-all cursor-pointer">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Email Support</h3>
          <p class="text-sm text-gray-600">Send us an email and we'll respond within 24 hours</p>
        </div>
      </div>

      <div class="card mb-8">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800">Frequently Asked Questions</h3>
        </div>
        <div class="divide-y divide-gray-200">
          <details class="p-6 cursor-pointer hover:bg-gray-50">
            <summary class="font-medium text-gray-800 flex items-center justify-between">
              How do I add a new hotel owner?
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">To add a new hotel owner, navigate to the Hotel Owners page and click the "Add Owner" button. Fill in the required information including name, email, and role, then click Save.</p>
          </details>

          <details class="p-6 cursor-pointer hover:bg-gray-50">
            <summary class="font-medium text-gray-800 flex items-center justify-between">
              How do I process a refund?
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">Go to the Refund page, find the refund request you want to process, and click either "Approve" or "Reject". The customer will be notified automatically via email.</p>
          </details>

          <details class="p-6 cursor-pointer hover:bg-gray-50">
            <summary class="font-medium text-gray-800 flex items-center justify-between">
              Can I export booking data?
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">Yes, you can export booking data to CSV or Excel format. Go to the Booking Details page and click the "Export" button in the top right corner.</p>
          </details>

          <details class="p-6 cursor-pointer hover:bg-gray-50">
            <summary class="font-medium text-gray-800 flex items-center justify-between">
              How do I change my admin password?
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">Navigate to Settings, then click on "Security". You'll find the option to change your password there. Make sure to use a strong password with at least 8 characters.</p>
          </details>
        </div>
      </div>

      <div class="card">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800">Contact Support</h3>
        </div>
        <div class="p-6">
          <form class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Your name" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="your.email@example.com" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="How can we help?" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Describe your issue..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  `,

  setting: () => `
    <div class="fade-in">
      <div class="mb-8">
        <h2 class="text-3xl font-semibold text-gray-800 mb-2">Settings</h2>
        <p class="text-gray-600">Manage your account and application preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-1">
          <div class="card">
            <nav class="p-2">
              <a href="#profile" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium mb-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Profile
              </a>
              <a href="#security" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 mb-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Security
              </a>
              <a href="#notifications" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 mb-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                Notifications
              </a>
              <a href="#appearance" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
                Appearance
              </a>
            </nav>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div class="card mb-6">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-xl font-semibold text-gray-800">Profile Information</h3>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-6 mb-6">
                <img src="https://ui-avatars.com/api/?name=Salman+Faris&background=3b82f6&color=fff&size=128" alt="Profile" class="w-24 h-24 rounded-full" />
                <div>
                  <button class="btn btn-primary mb-2">Change Photo</button>
                  <p class="text-sm text-gray-600">JPG, GIF or PNG. Max size of 2MB</p>
                </div>
              </div>
              <form class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" value="Salman" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" value="Faris" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" value="salman.faris@lankastay.com" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" value="+94 77 123 4567" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Tell us about yourself...">Admin at LankaStay hotel management system</textarea>
                </div>
                <div class="flex items-center gap-4">
                  <button type="submit" class="btn btn-primary">Save Changes</button>
                  <button type="button" class="btn btn-secondary">Cancel</button>
                </div>
              </form>
            </div>
          </div>

          <div class="card">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-xl font-semibold text-gray-800">Preferences</h3>
            </div>
            <div class="p-6 space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-800">Email Notifications</p>
                  <p class="text-sm text-gray-600">Receive email updates about your account</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked class="sr-only peer" />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-800">Push Notifications</p>
                  <p class="text-sm text-gray-600">Receive push notifications on your device</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked class="sr-only peer" />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-800">Marketing Emails</p>
                  <p class="text-sm text-gray-600">Receive emails about new features and updates</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

function loadPage(pageName) {
  if (pages[pageName]) {
    contentSection.innerHTML = pages[pageName]();

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.page === pageName) {
        link.classList.add("active");
      }
    });

    if (window.innerWidth < 1024) {
      sidebar.classList.remove("open");
    }
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    loadPage(page);
    window.location.hash = page;
  });
});

mobileMenuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (window.innerWidth < 1024) {
    if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  }
});

const currentPage = window.location.hash.slice(1) || "dashboard";
loadPage(currentPage);
