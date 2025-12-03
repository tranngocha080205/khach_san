// Modal Management System
class ModalManager {
  constructor() {
    this.modals = new Map();
    this.init();
  }

  init() {
    this.createModalContainer();
    this.setupEventListeners();
  }

  createModalContainer() {
    if (!document.getElementById("modal-root")) {
      const modalRoot = document.createElement("div");
      modalRoot.id = "modal-root";
      document.body.appendChild(modalRoot);
    }
  }

  setupEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        this.closeAll();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAll();
      }
    });
  }

  open(modalId, content) {
    const modal = this.createModal(modalId, content);
    this.modals.set(modalId, modal);
    document.getElementById("modal-root").appendChild(modal);
    setTimeout(() => modal.classList.add("active"), 10);
  }

  close(modalId) {
    const modal = this.modals.get(modalId);
    if (modal) {
      modal.classList.remove("active");
      setTimeout(() => {
        modal.remove();
        this.modals.delete(modalId);
      }, 300);
    }
  }

  closeAll() {
    this.modals.forEach((_, modalId) => this.close(modalId));
  }

  createModal(modalId, content) {
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" onclick="modalManager.close('${modalId}')">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        ${content}
      </div>
    `;
    return modal;
  }
}

const modalManager = new ModalManager();

// Modal Templates
const ModalTemplates = {
  addOwner: () => `
    <div class="modal-header">
      <h2 class="text-2xl font-bold text-gray-800">Add New Hotel Owner</h2>
      <p class="text-gray-600 mt-2">Fill in the details to create a new hotel owner account</p>
    </div>
    <form class="modal-body" onsubmit="handleAddOwner(event)">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input type="text" name="firstName" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="John" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input type="text" name="lastName" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Doe" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
        <input type="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="john.doe@example.com" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
        <input type="tel" name="phone" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="+1 234 567 8900" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Hotel Name *</label>
        <input type="text" name="hotelName" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Grand Hotel" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Role *</label>
        <select name="role" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          <option value="">Select Role</option>
          <option value="owner">Owner</option>
          <option value="super-admin">Super Admin</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea name="address" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Enter full address"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="modalManager.close('add-owner')">Cancel</button>
        <button type="submit" class="btn btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Owner
        </button>
      </div>
    </form>
  `,

  addUser: () => `
    <div class="modal-header">
      <h2 class="text-2xl font-bold text-gray-800">Add New User</h2>
      <p class="text-gray-600 mt-2">Create a new user account</p>
    </div>
    <form class="modal-body" onsubmit="handleAddUser(event)">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input type="text" name="firstName" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input type="text" name="lastName" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
        <input type="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
        <input type="tel" name="phone" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Password *</label>
        <input type="password" name="password" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="modalManager.close('add-user')">Cancel</button>
        <button type="submit" class="btn btn-primary">Add User</button>
      </div>
    </form>
  `,

  viewDetails: (type, data) => `
    <div class="modal-header">
      <h2 class="text-2xl font-bold text-gray-800">${type} Details</h2>
    </div>
    <div class="modal-body">
      <div class="space-y-4">
        ${Object.entries(data)
          .map(
            ([key, value]) => `
          <div class="flex justify-between py-3 border-b border-gray-200">
            <span class="font-medium text-gray-700 capitalize">${key.replace(/([A-Z])/g, " $1").trim()}:</span>
            <span class="text-gray-900">${value}</span>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="modalManager.close('view-details')">Close</button>
      </div>
    </div>
  `,

  deleteConfirm: (type, name) => `
    <div class="modal-header">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-800 text-center">Delete ${type}</h2>
      <p class="text-gray-600 mt-2 text-center">Are you sure you want to delete "${name}"? This action cannot be undone.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" onclick="modalManager.close('delete-confirm')">Cancel</button>
      <button type="button" class="btn" style="background-color: #ef4444; color: white;" onclick="handleDelete()">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
        Delete
      </button>
    </div>
  `,

  editOwner: (owner) => `
    <div class="modal-header">
      <h2 class="text-2xl font-bold text-gray-800">Edit Hotel Owner</h2>
    </div>
    <form class="modal-body" onsubmit="handleEditOwner(event)">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
          <input type="text" name="name" value="${owner.name}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input type="email" name="email" value="${owner.email}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Role *</label>
        <select name="role" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          <option value="owner" ${owner.role === "Owner" ? "selected" : ""}>Owner</option>
          <option value="super-admin" ${owner.role === "Super Admin" ? "selected" : ""}>Super Admin</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
        <select name="status" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          <option value="active" ${owner.status === "active" ? "selected" : ""}>Active</option>
          <option value="pending" ${owner.status === "pending" ? "selected" : ""}>Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="modalManager.close('edit-owner')">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  `,

  newMessage: () => `
    <div class="modal-header">
      <h2 class="text-2xl font-bold text-gray-800">New Message</h2>
    </div>
    <form class="modal-body" onsubmit="handleSendMessage(event)">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">To *</label>
        <input type="email" name="to" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="recipient@example.com" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
        <input type="text" name="subject" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Message subject" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
        <textarea name="message" rows="6" required class="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Type your message here..."></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="modalManager.close('new-message')">Cancel</button>
        <button type="submit" class="btn btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
          Send Message
        </button>
      </div>
    </form>
  `,

  filterBookings: () => `
    <div class="modal-header">
      <h2 class="text-2xl font-bold text-gray-800">Filter Bookings</h2>
    </div>
    <form class="modal-body" onsubmit="handleFilterBookings(event)">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select name="status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          <option value="">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Check-in From</label>
          <input type="date" name="checkInFrom" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Check-in To</label>
          <input type="date" name="checkInTo" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Hotel</label>
        <input type="text" name="hotel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Search by hotel name" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Min Amount</label>
          <input type="number" name="minAmount" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="$0" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Max Amount</label>
          <input type="number" name="maxAmount" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="$10000" />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="modalManager.close('filter-bookings')">Cancel</button>
        <button type="submit" class="btn btn-primary">Apply Filters</button>
      </div>
    </form>
  `,

  exportData: () => `
    <div class="modal-header">
      <h2 class="text-2xl font-bold text-gray-800">Export Data</h2>
      <p class="text-gray-600 mt-2">Choose export format and options</p>
    </div>
    <form class="modal-body" onsubmit="handleExportData(event)">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Export Format *</label>
        <select name="format" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          <option value="csv">CSV (Comma Separated Values)</option>
          <option value="excel">Excel (.xlsx)</option>
          <option value="pdf">PDF Document</option>
          <option value="json">JSON</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
        <div class="grid grid-cols-2 gap-4">
          <input type="date" name="startDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          <input type="date" name="endDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Include Fields</label>
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input type="checkbox" name="fields" value="all" checked class="w-4 h-4 text-blue-600 rounded" />
            <span class="text-sm text-gray-700">All Fields</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" name="fields" value="personal" class="w-4 h-4 text-blue-600 rounded" />
            <span class="text-sm text-gray-700">Personal Information Only</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" name="fields" value="financial" class="w-4 h-4 text-blue-600 rounded" />
            <span class="text-sm text-gray-700">Financial Data Only</span>
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="modalManager.close('export-data')">Cancel</button>
        <button type="submit" class="btn btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Export
        </button>
      </div>
    </form>
  `,
};

// Form Handlers
function handleAddOwner(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  showNotification("Success", "Hotel owner added successfully!", "success");
  modalManager.close("add-owner");

  setTimeout(() => {
    loadPage("hotel-owners");
  }, 500);
}

function handleAddUser(event) {
  event.preventDefault();
  showNotification("Success", "User added successfully!", "success");
  modalManager.close("add-user");

  setTimeout(() => {
    loadPage("users");
  }, 500);
}

function handleEditOwner(event) {
  event.preventDefault();
  showNotification("Success", "Owner updated successfully!", "success");
  modalManager.close("edit-owner");

  setTimeout(() => {
    loadPage("hotel-owners");
  }, 500);
}

function handleDelete() {
  showNotification("Success", "Item deleted successfully!", "success");
  modalManager.close("delete-confirm");
}

function handleSendMessage(event) {
  event.preventDefault();
  showNotification("Success", "Message sent successfully!", "success");
  modalManager.close("new-message");
}

function handleFilterBookings(event) {
  event.preventDefault();
  showNotification("Success", "Filters applied!", "success");
  modalManager.close("filter-bookings");
}

function handleExportData(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const format = formData.get("format");

  showNotification(
    "Success",
    `Exporting data as ${format.toUpperCase()}...`,
    "success",
  );
  modalManager.close("export-data");

  setTimeout(() => {
    showNotification(
      "Success",
      "Export completed! Download started.",
      "success",
    );
  }, 2000);
}

// Notification System
function showNotification(title, message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  const icons = {
    success:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
    error:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
    warning:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>',
    info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
  };

  notification.innerHTML = `
    <div class="notification-icon">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${icons[type]}
      </svg>
    </div>
    <div class="notification-content">
      <h4 class="notification-title">${title}</h4>
      <p class="notification-message">${message}</p>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `;

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Global functions for button clicks
window.openAddOwnerModal = () => {
  modalManager.open("add-owner", ModalTemplates.addOwner());
};

window.openAddUserModal = () => {
  modalManager.open("add-user", ModalTemplates.addUser());
};

window.openViewModal = (type, data) => {
  modalManager.open("view-details", ModalTemplates.viewDetails(type, data));
};

window.openEditOwnerModal = (owner) => {
  modalManager.open("edit-owner", ModalTemplates.editOwner(owner));
};

window.openDeleteModal = (type, name) => {
  modalManager.open("delete-confirm", ModalTemplates.deleteConfirm(type, name));
};

window.openNewMessageModal = () => {
  modalManager.open("new-message", ModalTemplates.newMessage());
};

window.openFilterModal = () => {
  modalManager.open("filter-bookings", ModalTemplates.filterBookings());
};

window.openExportModal = () => {
  modalManager.open("export-data", ModalTemplates.exportData());
};

window.openEditUserModal = (user) => {
  const content = `
    <div class="modal-header">
      <h2 class="text-2xl font-bold text-gray-800">Edit User</h2>
    </div>
    <form class="modal-body" onsubmit="handleEditUser(event)">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
          <input type="text" name="name" value="${user.name}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input type="email" name="email" value="${user.email}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
        <input type="tel" name="phone" value="${user.phone}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="modalManager.close('edit-user')">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  `;
  modalManager.open("edit-user", content);
};

window.openEditBookingModal = (booking) => {
  const content = `
    <div class="modal-header">
      <h2 class="text-2xl font-bold text-gray-800">Edit Booking</h2>
    </div>
    <form class="modal-body" onsubmit="handleEditBooking(event)">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Booking ID</label>
        <input type="text" value="${booking.id}" disabled class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Guest Name *</label>
        <input type="text" name="guest" value="${booking.guest}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Hotel *</label>
        <input type="text" name="hotel" value="${booking.hotel}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Check In *</label>
          <input type="date" name="checkIn" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Check Out *</label>
          <input type="date" name="checkOut" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
        <select name="status" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          <option value="confirmed" ${booking.status === "confirmed" ? "selected" : ""}>Confirmed</option>
          <option value="pending" ${booking.status === "pending" ? "selected" : ""}>Pending</option>
          <option value="completed" ${booking.status === "completed" ? "selected" : ""}>Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="modalManager.close('edit-booking')">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  `;
  modalManager.open("edit-booking", content);
};

function handleEditUser(event) {
  event.preventDefault();
  showNotification("Success", "User updated successfully!", "success");
  modalManager.close("edit-user");
  setTimeout(() => loadPage("users"), 500);
}

function handleEditBooking(event) {
  event.preventDefault();
  showNotification("Success", "Booking updated successfully!", "success");
  modalManager.close("edit-booking");
  setTimeout(() => loadPage("booking-details"), 500);
}

function handleApproveRefund(refundId) {
  showNotification(
    "Success",
    `Refund ${refundId} approved successfully!`,
    "success",
  );
  setTimeout(() => loadPage("refund"), 500);
}

function handleRejectRefund(refundId) {
  showNotification(
    "Warning",
    `Refund ${refundId} has been rejected.`,
    "warning",
  );
  setTimeout(() => loadPage("refund"), 500);
}

window.handleApproveRefund = handleApproveRefund;
window.handleRejectRefund = handleRejectRefund;
